from typing import List, Optional

from bson import ObjectId
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from server.database.db import database
from server.models.Image import ImageGetDto
from server.models.base import BaseDBSchema, PyObjectId
from server.routers.pixtral import generate_albums

router = APIRouter()
album_db = database['Albums']


class Album(BaseDBSchema):
    name: str
    imageIds: Optional[List[PyObjectId]] = None
    images: Optional[List[ImageGetDto]] = None

class AlbumCreateDto(BaseModel):
    name: str

class AlbumImageListDto(BaseModel):
    image_ids: Optional[list[str]] = None

def _get_albums() -> List[Album]:
    """
    Retrieves all albums from the database
    :returns:
        A list of albums from the database
    """

    aggregation_pipeline = [
        {
            "$addFields": {
                "imageIds": {
                    "$map": {
                        "input": "$imageIds",
                        "as": "id",
                        "in": {"$toObjectId": "$$id"}
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "Images",
                "localField": "imageIds",
                "foreignField": "_id",
                "as": "images"
            }
        }
    ]

    albums = album_db.aggregate(aggregation_pipeline).to_list()
    albums = [Album(**album) for album in albums]

    return albums


def _get_album_by_id(id: str) -> Album | None:
    """
    Retrieves a single album by its ID
    :param id: The ID of the album to retrieve
    :returns:
        An Album object or None if not found
    """

    aggregation_pipeline = [
        {
            "$match": {
                "_id": ObjectId(id)
            }
        },
        {
            "$addFields": {
                "imageIds": {
                    "$map": {
                        "input": "$imageIds",
                        "as": "id",
                        "in": {"$toObjectId": "$$id"}
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "Images",
                "localField": "imageIds",
                "foreignField": "_id",
                "as": "images"
            }
        }
    ]

    albums = album_db.aggregate(aggregation_pipeline).to_list()
    albums = [Album(**album) for album in albums]

    return albums[0] if albums and len(albums) > 0 else None

not_found = JSONResponse(content={"message": "Album not found"}, status_code=404)


@router.get("/api/albums")
async def get_albums():
    albums = _get_albums()

    if len(albums) <= 0:
        generated_albums = await generate_albums()
        for album in generated_albums.message.parsed.albums:
            album_db.insert_one(album.__dict__)

        albums = _get_albums()

    return albums

@router.get('/api/albums/{id}', response_model=Album)
async def get_album_by_id(id: str) -> Album:
    if not ObjectId.is_valid(id):
        return not_found

    album = _get_album_by_id(id)
    if album is None:
        return
    return album

@router.delete("/api/albums/{id}")
async def delete_album(id: str):
    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return not_found

    album_db.delete_one({ "_id": ObjectId(id) })
    return True

@router.post('/api/albums')
async def create_album(dto: AlbumCreateDto):
    found_album = album_db.find_one({'name': f'/^{dto.name}$/i'})
    if found_album is not None:
        return JSONResponse({'message': 'An album already exists with this name'}, 400)

    inserted_album = album_db.insert_one(dto.__dict__)
    album = Album(**album_db.find_one(inserted_album.inserted_id))

    return album

@router.post("/api/albums/{id}")
async def add_image_to_album(id: str, dto: AlbumImageListDto):

    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    ids_to_insert = [id for id in dto.image_ids if id not in album.imageIds]

    database['albums'].update_one(
        {"_id": id},
        { "$push": { "imageIds": {'$each': ids_to_insert} } }
    )


    return album

@router.delete('/api/albums/{id}/remove-single/{image_id}')
async def remove_image_from_album(id:str, image_id: str):
    if not ObjectId.is_valid(id) or not ObjectId.is_valid(image_id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    update_result = album_db.update_one({'_id': ObjectId(id)}, {
        '$pull':
            {
                'imageIds': { '$in': [image_id] }
            }
    })

    album = _get_album_by_id(id)
    return album

@router.put('/api/albums/{id}/remove')
async def remove_images_from_album(id: str, dto: AlbumImageListDto) -> Album:

    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    update_result = album_db.update_one({'_id': ObjectId(id)}, {
        '$pull':
        {
            'imageIds': { '$in': dto.image_ids }
        }
    })

    album = _get_album_by_id(id)
    return album

@router.post('/api/albums')
async def create_album(dto: AlbumCreateDto):
    found_album = album_db.find_one({'name': f'/^{dto.name}$/i'})
    if found_album is not None:
        return JSONResponse({'message': 'An album already exists with this name'}, 400)

    inserted_album = album_db.insert_one(dto.__dict__)
    album = Album(**album_db.find_one(inserted_album.inserted_id))

    return album

@router.post("/api/albums/{id}")
async def add_image_to_album(id: str, dto: AlbumImageListDto):
    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    ids_to_insert = [id for id in dto.image_ids if id not in album.imageIds]

    # Convert string ID to ObjectId
    album_db.update_one(
        {"_id": ObjectId(id)},  # Convert id to ObjectId
        {"$push": {"imageIds": {'$each': ids_to_insert}}}
    )

    return _get_album_by_id(id)  # Return fresh data after update

@router.delete('/api/albums/{id}/remove-single/{image_id}')
async def remove_image_from_album(id:str, image_id: str):
    if not ObjectId.is_valid(id) or not ObjectId.is_valid(image_id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    update_result = album_db.update_one({'_id': ObjectId(id)}, {
        '$pull':
            {
                'imageIds': { '$in': [image_id] }
            }
    })

    album = _get_album_by_id(id)
    return album

@router.put('/api/albums/{id}/remove')
async def remove_images_from_album(id: str, dto: AlbumImageListDto) -> Album:

    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    if album is None:
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    update_result = album_db.update_one({'_id': ObjectId(id)}, {
        '$pull':
        {
            'imageIds': { '$in': dto.image_ids }
        }
    })

    album = _get_album_by_id(id)
    return album