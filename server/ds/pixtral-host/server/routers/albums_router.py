from typing import List

from bson import ObjectId
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from server.database.db import database
from server.models.Image import Image, ImageGetDto
from server.models.base import BaseDBSchema, PyObjectId

router = APIRouter()
album_db = database['Albums']


class Album(BaseDBSchema):
    name: str
    imageIds: List[PyObjectId]
    images: List[ImageGetDto]


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


@router.get("/api/albums/")
async def get_albums():
    albums = _get_albums()
    return albums

@router.get('/api/albums/{id}', response_model=Album)
async def get_album_by_id(id: str) -> Album:
    if not ObjectId.is_valid(id):
        return JSONResponse(content={"message": "Album not found"}, status_code=404)

    album = _get_album_by_id(id)
    return album
