from dotenv import dotenv_values
from pymongo import MongoClient
from pymongo.server_api import ServerApi

env = dotenv_values(dotenv_path='./server/.env')


username: str = env["DB_USERNAME"]
password: str = env["DB_PASSWORD"]
db_name: str = env["DB_NAME"]
db_uri: str = f"mongodb+srv://{username}:{password}@whatsthat.rm3c2.mongodb.net/?retryWrites=true&w=majority&appName=WhatsThat"

client = MongoClient(db_uri, server_api=ServerApi('1'))
database = client.get_database(db_name)