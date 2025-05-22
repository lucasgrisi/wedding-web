from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["casamento"]

def get_items_collection():
    return db.get_collection('items')

def get_presenca_collection():
    return db.get_collection('presenca')