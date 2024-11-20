from pathlib import Path
from azure.storage.blob.aio import BlobServiceClient, ContainerClient
import aiofiles
from dotenv import dotenv_values

env = dotenv_values(dotenv_path='./server/.env')

connection_string = env['AZURE_CONNECTION_STRING']

container_name = "images"
blob_service_client = BlobServiceClient.from_connection_string(connection_string)


async def create_container() -> ContainerClient:
    container_client = blob_service_client.get_container_client(container=container_name)
    container_exists = await container_client.exists()
    if not container_exists:
        await container_client.create_container()

    return container_client


async def upload_image(image_path: str) -> tuple[str, str]:
    file_name = Path(image_path).name
    async with aiofiles.open(image_path, mode="rb") as image_data:
        container_client = await create_container()
        blob_client = container_client.get_blob_client(blob=file_name)
        await blob_client.upload_blob(data=await image_data.read(), overwrite=True)
        return blob_client.blob_name, blob_client.url


async def remove_image(blob_name: str):
    container_client = await create_container()
    blob_client = container_client.get_blob_client(blob=blob_name)
    await blob_client.delete_blob()
