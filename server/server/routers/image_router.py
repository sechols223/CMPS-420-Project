import json
from typing import List, Annotated

from bson import ObjectId
from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response

from server.database.db import database
from server.models.Image import UploadImagesDto, ImageGetDto, Image, UpdateImageDto
from server.models.queries import ImageQuery, PaginatedResponse
from server.routers.pixtral import process_images, generate_tags, generate_albums

router = APIRouter()
image_db = database['Images']

@router.post("/api/images/upload")
async def upload_images(data: UploadImagesDto):
    images = data.images

    results = await process_images(images)
    tags_result = await generate_tags(results.message.parsed.model_dump_json())
    results = []

    for data in tags_result.message.parsed.images:
        image = image_db.find_one({'imageData': data.imageData})
        if image is None:
            new_image = image_db.insert_one(data.__dict__)
            created_image = database["Images"].find_one({"_id": new_image.inserted_id})

            item = ImageGetDto(**created_image)
            update_result = database['Categories'].update_one(
                {"category": item.category},
                {'$set': {'category': item.category}},
                upsert=True
            )
            tags = [{"name": tag } for tag in item.tags]
            for tag in tags:
                update_result = database['Tags'].update_one(
                    {"name": tag['name'] },
                    {'$set': {'name': tag['name']}},
                    upsert=True
                )

            print(update_result.did_upsert)
            results.append(item)

    results = jsonable_encoder(results)

    return results

@router.post("/api/albums")
async def make_albums():
    albums = await generate_albums()
    albums = albums.message.parsed

    for album in albums.albums:
        json_data = album.model_dump_json()
        json_object = json.loads(json_data)

        database['Albums'].insert_one(json_object)

    aggregation_pipeline = [
        {
            "$unwind": "$images"
        },
        {
            "$lookup":
                {
                    "from": "Albums",
                    "localField": "images",
                    "foreignField": "_id",
                    "as": "images"
                }
        }
    ]

    albums = database['Albums'].aggregate(aggregation_pipeline)
    return albums

@router.get("/api/albums")
async def get_albums():
    aggregation_pipeline = [
        {
            "$unwind": "$imageIds"
        },
        {
            "$lookup":
            {
                "from": "Albums",
                "localField": "imageIds",
                "foreignField": "_id",
                "as": "images"
            }
        }
    ]

    albums = database['Albums'].aggregate(aggregation_pipeline)
    print(albums)

    return albums


@router.get("/api/images/{image_id}")
async def get_image_by_id(image_id: str) -> ImageGetDto | None:
    image = image_db.find_one({'_id': ObjectId(image_id)})

    if image is None:
        return Response(content="No image found.", status_code=404)

    return ImageGetDto(**image)


@router.get("/api/images", response_model=PaginatedResponse[ImageGetDto])
async def get_images(query: Annotated[ImageQuery, Query()]) -> PaginatedResponse[ImageGetDto]:

    aggregation_pipeline= []
    match_filter = {}

    if query.name and len(query.name) > 0:
        match_filter["name"] = {"$regex": f"^{query.name}", "$options": "i"}
    if query.tags and len(query.tags) > 0:
        match_filter["tags"] = {"$in": query.tags}
    if query.categories and len(query.categories) > 0:
        match_filter["categories"] = {"$in": query.categories}

    if match_filter:
        aggregation_pipeline.append({"$match": match_filter})

    aggregation_pipeline.append({"$skip": query.page_size * (query.page - 1)})
    aggregation_pipeline.append( {"$limit": query.page_size})

    images = image_db.aggregate(aggregation_pipeline).to_list()
    images = [ImageGetDto(**image) for image in images]

    response = PaginatedResponse[ImageGetDto](items=images, count=len(images))
    return response

@router.put("/api/images/{id}")
async def edit_image(id: str, dto: UpdateImageDto) -> ImageGetDto:
    image = image_db.find_one({"_id": ObjectId(id)})
    if image is None:
        return Response(content={"message": "Image not found"}, status_code=404)

    model = dto.model_dump()
    print(model)

    result = image_db.update_one({ "_id": ObjectId(id)}, { "$set": model})
    return ImageGetDto(**image_db.find_one(result.upserted_id))

@router.post("/images/{image_id}/albums/{album_id}")
async def add_image_to_album(image_id: str, album_id: str):
    database['albums'].update_one(
        {"_id": album_id},
        { "$push": { "imageIds": image_id } }
    )
    return True