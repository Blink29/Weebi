from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
  
uri = "mongodb+srv://dusklight:1234qazw0987@cluster0.uhdr1vb.mongodb.net/?retryWrites=true&w=majority"

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