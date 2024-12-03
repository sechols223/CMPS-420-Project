from typing import List, Optional

from pydantic import Field

from .base import BaseDBSchema, BaseSchema, PyObjectId

class Image(BaseDBSchema):
    name: str
    category: str
    imageData: str
    location: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

class ImageGetDto(BaseSchema):
    id: Optional[PyObjectId] = Field(alias='_id')
    name: str
    category: str
    imageData: str
    location: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None


class AlbumImage(BaseSchema):
    imageId: Optional[PyObjectId] = Field(alias='_id')

class CreateImageDto(BaseSchema):
    name: str
    category: str
    imageData: str
    location: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

class UploadImagesDto(BaseSchema):
    images: List[str]

class UpdateImageDto(BaseSchema):
    name: str
    category: str
    location: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

