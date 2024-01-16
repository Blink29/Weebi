import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGO_URI")

try:
    conn = MongoClient(uri, server_api=ServerApi("1"))
    print("Connected successfully!!!")
except:
    print("Could not connect to MongoDB")

# database
db = conn.anime_list

# Created or Switched to collection names: my_gfg_collection
collection = db.anime_list

COUNTER = 0


def insert_document(document):
    global COUNTER
    COUNTER += 1
    collection.insert_one(document)
    print(f"[+] One document inserted in database | counter : {COUNTER}")
    return True
