from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware


from server.routers.image_router import router as image_router
from server.routers.albums_router import router as album_router
from server.routers.tags_router import router as tag_router

from server.database.db import client

server_origins = ["*"]
server_methods = ["*"]
server_headers = ["*"]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=server_origins,
    allow_methods=server_methods,
    allow_headers=server_headers
)


def startup_db_client():
    client.admin.command('ping')
    print('Connected to Database')


async def lifespan(fastapi_app: FastAPI):
    startup_db_client()
    yield
    client.close()
    print('Disconnected to Database')
    print(f"Closing {fastapi_app.__str__()}")


app.include_router(image_router, tags=["Images"])
app.include_router(album_router, tags=["Albums"])
app.include_router(tag_router, tags=['Tags'])
