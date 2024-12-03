from server.database.db import database

secret_db = database['Secrets']

def get_openai_key() -> str:
    key = secret_db.find_one({'name': 'openai'})
    return key['value']

def get_azure_url() -> str:
    key = secret_db.find_one({'name': 'azure'})
    return key['value']