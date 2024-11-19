from typing import TypeVar, Generic, List


from pydantic import Field

from models.base import BaseSchema

TData = TypeVar('TData')

class PaginatedResponse(BaseSchema, Generic[TData]):
    count: int = Field(description='Number of items returned in the response')
    items: List[TData] = Field(description='List of items returned in the response following given criteria')

class ImageQuery(BaseSchema):
    tags: list[str] | None = None
    categories: list[str] | None = None
    name: str | None = None
    page: int = Field(1, ge=1)
    page_size: int = Field(25, ge=0, le=50)

