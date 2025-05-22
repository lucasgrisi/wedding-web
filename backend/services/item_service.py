from models.item import Item
from mongo import get_items_collection
from bson.objectid import ObjectId
from typing import List

collection = get_items_collection()

class ItemService:
    @staticmethod
    def create_item(item_data: dict) -> str:
        item_id = collection.insert_one(item_data).inserted_id
        return str(item_id)
    
    @staticmethod
    def read_item(item_id: str) -> Item:
        item_data = collection.find_one({"_id": ObjectId(item_id)})
        if item_data:
            return Item(id=str(item_data["_id"]), **item_data)
        return None
    
    @staticmethod
    def update_item(item_id: str, item_data: dict) -> None:
        collection.update_one({"_id": ObjectId(item_id)}, {"$set": item_data})
    
    @staticmethod
    def delete_item(item_id: str) -> None:
        collection.delete_one({"_id": ObjectId(item_id)})
    
    @staticmethod
    def list_items() -> List[Item]:
        items_data = collection.find({})
        items = [Item(id=str(item_data["_id"]), **item_data) for item_data in items_data]
        return items
    
item_service = ItemService()

def update_payed_items(items):
    for item in items:
        from_db = item_service.read_item(item['id'])
        if not from_db:
            continue
        sold_qtd = from_db.sold + int(item.get('quantity', '0'))
        to_update = {'sold': sold_qtd}
        if sold_qtd >= from_db.quantity:
            to_update['available'] = False
        item_service.update_item(item['id'], to_update)

    return None