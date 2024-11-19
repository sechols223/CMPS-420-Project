from typing import List

from fastapi import APIRouter

from server.database.db import database

router = APIRouter()

@router.get("/api/tags")
async def get_tags() -> List[str]:
    tags = database['Tags'].find().to_list()
    tags = [tag['name'] for tag in tags]
    return tags