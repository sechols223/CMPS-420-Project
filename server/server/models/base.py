from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, Field, BeforeValidator, computed_field
from pydantic.alias_generators import to_camel

PyObjectId = Annotated[str, BeforeValidator(str)]

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class BaseDBSchema(BaseSchema):
    id: Optional[PyObjectId] = Field(alias="_id")
