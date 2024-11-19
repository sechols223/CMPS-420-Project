import base64
import asyncio
import io
import json
import os
from typing import List, Optional

from dotenv import dotenv_values
from mistralai import Mistral
from PIL import Image

from urllib.parse import urlparse

from openai import OpenAI
from openai.types.chat import ParsedChoice
from pydantic import BaseModel

from database.blob_storage import upload_image
from database.db import database

import models.Image as ImageModel

def is_url(path):
  """
  Checks if the given path is a URL.

  Args:
      path (str): The image path to check.

  Returns:
      bool: True if the path is a URL, False otherwise.
  """
  parsed_url = urlparse(path)
  return parsed_url.scheme in ('http', 'https')


def is_local_file(path):
  """
  Checks if the given path is a local file.

  Args:
      path (str): The image path to check.

  Returns:
      bool: True if the path is a local file, False otherwise.
  """
  return os.path.isfile(path)


class ImageResponse(BaseModel):
  name: str
  category: str
  tags: Optional[list[str]] = None
  location: Optional[str] = None
  description: Optional[str] = None
  imageData: str


class Images(BaseModel):
  images: list[ImageResponse]

  class Config:
    arbitrary_types_allowed = True

class AlbumModel(BaseModel):
  name: str
  imageIds: list[str]

class Albums(BaseModel):
  albums: list[AlbumModel]

env_vars = dotenv_values(dotenv_path='./.env')

api_key = env_vars.get('MISTRAL_API_KEY')
openai_api_key = env_vars.get("OPENAI_API_KEY")

model = "pixtral-12b-2409"
openai_model = "gpt-4o"
with_tags: bool = False

predefined_categories: [str] = [
  "Museum",
  "Art Gallery",
  "Pet",
  "Animal",
  "Sport",
  "Special Occasion",
  "People",
  "Movie",
  "Book",
  "Nature",
  "Flower",
  "Plant",
  "Food",
]

category_projection = {
  "_id": 0,
  "category": 1
}

categories_cursor: [str] = database["Categories"].find({}, category_projection).to_list()

category_names = [document['category'] for document in categories_cursor]

predefined_categories = list(set(category_names) & set(predefined_categories))

client: Mistral = Mistral(api_key=api_key)
openai_client = OpenAI(api_key=openai_api_key)

sample_url = "https://i1.wp.com/www.stugon.com/wp-content/uploads/2014/02/unsplash-free-stock-photo.jpg"

async def resize_and_encode_image(image_path: str, max_size=(800, 800)) -> str | None:
  if is_url(image_path):
    return image_path

  if is_local_file(image_path):
    name, url = await upload_image(image_path)
    return url

  try:
    def _resize_and_encode():
      with Image.open(image_path) as img:
        img.thumbnail(max_size)
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        contents  = buffered.getvalue()

        return f"data:image/jpeg;base64,{base64.b64encode(contents).decode('utf-8')}"

    return await asyncio.to_thread(_resize_and_encode)

  except FileNotFoundError as e:
    print(f"Error: The file {image_path} was not found. Error: {e}")
    return None
  except Exception as e:
    print(f"Error processing {image_path}: {e}")
    return None

def encode_image(image_path: str) -> str | None:
  try:
    with open(image_path, "rb") as file:
      contents = file.read()
      base64_path = base64.b64encode(contents).decode("utf-8")
      return f"data:image/jpeg;base64,{base64_path}"
  except FileNotFoundError as e:
    print(f"Error: The file {image_path} was not found. Error: {e}")
    return None
  except Exception as e:
    print(f"Error: {e}")
    return None

content = []

async def process_images(image_paths: List[str]) -> ParsedChoice[Images] | None:
  global content

  system_prompt = f"""
  Do not hallucinate. Do not make up facts.

  You are categorizing images for a website that will allow users to upload an image and create albums based on the categories of the image uploaded. 
  EXAMPLE: For example, a picture of an animal should be classified as pets or the type of animal it is. 
  Your job is to assign these images to their appropriate categories using a maximum of one word.
  Do not categorize individual items in the picture, categorize the image as a whole based on the content of the image. 

  Before trying to create your own category, you will categorize images into one of the pre-defined categories:
  {predefined_categories}

  You are not limited to only picking from the pre-defined categories.

  with_tags value is {str(with_tags)}

  If the image(s) does not fit one of those categories or if you believe there is a category (that is not pre-defined) that more appropriately fits the image, classify it as a category that best matches the image.
  Once you categorize the image, evaluate yourself and analyze the objects in the image and decide if you accurately matched the category. If not, re-categorize the image. Do this until you have a 99% certainty that you've 
  accurately categorized the image.

  If you need to create a category, make the category as specific as possible. For example, if the image is a building then categorize it based on what type of building.

  If the image does fit within a pre-defined category but you think it can be more specified to a different, non-predefined category, then categorize it however you best believe it should be categorized.

  If there is a distinctive object in the image and the image does not fit or the likely hood that it fits in a pre-defined category is low, then you may classify the image based on the object in the picture.

  The number of responses should equal the number of images passed in.

  YOU SHOULD ONLY USE ONE (A SINGULAR) WORD TO CATEGORIZE. The output should contain only alphanumeric characters with the category of the image

  If with_tags is True then rather than categories you'll generate tags that can pertain to each image. No more than 3 tags should be generated per image. In which case, you should output properly generated with the the image name,
  amd tags

  Feel free to use previously-generated tags or categories you come up with.

  You should output properly formatted json
  """

  processed_images = await asyncio.gather(*[resize_and_encode_image(image_path) for image_path in image_paths])

  if len(processed_images) < 1:
    return None

  content = [{"type": "image_url", "image_url": { "url": image_url, "detail": "auto" } } for image_url in processed_images]

  messages = [
    {
      "role": "system",
      "content": system_prompt
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": f"{str(processed_images)}"
        }
      ]
    },
    {
      "role": "user",
      "content": content,
    }
  ]


  openai_response = openai_client.beta.chat.completions.parse(
    model=openai_model,
    messages=messages,
    temperature=0.2,
    response_format=Images
  )

  return openai_response.choices[0]


tags_prompt = """
Do not hallucinate. Do not make up facts.
Your job is to generate tags for each image. There should be a minimum of 1 and a maximum of 5 tags generated per image But an ideal amount of 3 tags.
The tags must consist of 1 word and should relate to a more specific or more generalized categorization of the image based on a given category to the image.

If you are able to pinpoint the location of the planet earth of the image if it is a landmark or monument, include that data too.

If you are able to get the location, then evaluate if the category that the image is assigned is correct.
If you are unable to get the location, then it should be null.

Also provide historical information about the image such as it's origin and the history behind it.

If you are unable to get historical information, then provide a description of the image.

Based on the historical information and location, if you are able to re-categorize the image, do so.
Based on the historical information and location (if available) decide if the assigned tags are appropriate to the image, if not then assign new tags.

Based on the historical information, location, tags, category, and image data, provide a fitting name to the image.

The image(s) url should also be returned with it in the JSON body.

Do not generate anything other than valid JSON with the provided JSON example structure. 

You should output proper JSON. For example:
```json
[
    {
      "name: "New York Apple",
      "category": "Nature",
      "tags": ["vegetables", "healthy"],
      "location": New York City, New York USA,
      "description": "Was produced in New York",
      "imageData": base64stringorimageurl
    }
]
```
The number of images inputted should equal the number of items in the JSON array.
"""

async def generate_tags(json_content: str) -> ParsedChoice[Images] | None:
  global content

  content.append({
    "type": "text",
    "text": json_content
  })

  messages = [
    {
      "role": "system",
      "content": tags_prompt
    },
    {
      "role": "user",
      "content": content
    }
  ]

  openai_response = openai_client.beta.chat.completions.parse(
    model=openai_model,
    messages=messages,
    temperature=0.2,
    response_format=Images
  )
  return openai_response.choices[0]

def get_images() -> list[ImageModel]:
  images = database['Images'].find().to_list()
  images = [ImageModel.AlbumImage(**image).__dict__ for image in images]
  return images

albums_prompt = """
Using the provided json data of images. Create albums for these images based on similar tags, categories, and descriptions. One image is allowed to belong to multiple albums.
The album name should be something related to the images tags, category, and description.
"""

async def generate_albums():
  images = get_images()
  images = json.dumps(images)
  messages = [
    {
      "role": "system",
      "content": albums_prompt
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": images
        }
      ]
    }
  ]

  openai_response = openai_client.beta.chat.completions.parse(
    model=openai_model,
    messages=messages,
    temperature=0.2,
    response_format=Albums
  )

  return openai_response.choices[0]