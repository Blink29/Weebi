import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()
class Database:
    def __init__(self):
        self.MONGO_URI = os.getenv("MONGO_URI")
        self.collection = None
        self.counter = 1

        if not self._connect():
            raise Exception("Could not connect to MongoDB")

        print("[+] Connected to MongoDB")

    def _connect(self):
        try:
            conn = MongoClient(self.MONGO_URI, server_api=ServerApi("1"))
            self.collection = conn.anime_list.anime_list
            return True
        except:
            return False

    def insert(self, document):
        self.collection.insert_one(document)
        print(f"[+] One document inserted in database | counter : {self.counter}")
        self.counter += 1
        return True
