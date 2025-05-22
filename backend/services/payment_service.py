import mercadopago
import os
from mongo import db
from uuid import uuid4
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

sdk = mercadopago.SDK(os.getenv("MP_API_KEY"))

def create_preference(items):
    buy_ref_id = str(uuid4())
    preference_data = {
        "items": items,
        "back_urls": {
            "success": "https://www.grisibruna.com/gratidao",
            "failure": "https://www.grisibruna.com/gratidao",
            "pending": "https://www.grisibruna.com/gratidao"
        },
        "auto_return": "approved",
        "external_reference": buy_ref_id
    }


    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return preference, buy_ref_id

def get_payment_approved_items(data):
    payment = sdk.payment().get(data["id"])
    try:
        items = payment['response']['additional_info']['items']
    except:
        items = []
    if payment['response']['status'] == 'approved':
        return True, items
    return False, items

def insert_user_msg(user_msg: dict, pref_id: str, buy_ref_id: str):
    exists = db.buys.find_one({'preference_id': pref_id, 'buy_ref_id': buy_ref_id})
    if exists:
        return exists["_id"]
    doc = user_msg.copy()
    doc['preference_id'] = pref_id
    doc['buy_ref_id'] = buy_ref_id
    doc['buy_status'] = 'pending'
    doc['created_at'] = datetime.now()

    res = db.buys.insert_one(doc)
    return res.inserted_id

def update_buy_status(data):
    try:
        payment = sdk.payment().get(data["id"])
        ref_id = payment['response'].get('external_reference')
        if not ref_id:
            return False
    except KeyError as e:
        # Log error or handle it accordingly
        print(f"KeyError: {e}")
        return False

    # Update buy status
    db.buys.update_one(
        {'buy_ref_id': ref_id},
        {'$set': {'buy_status': 'approved', 'approved_at': datetime.now()}}
    )

    # Update items if they exist
    try:
        items = payment['response']['additional_info'].get('items')
        if items:
            db.buys.update_one({'buy_ref_id': ref_id}, {'$set': {'items': items}})
    except KeyError as e:
        # Log error or handle it accordingly
        print(f"KeyError: {e}")
        return False

    return ref_id

def get_all_buys():
    buys = db.buys.find()
    # Convert each document to dict and ObjectId to str
    buys = [{**buy, "_id": str(buy["_id"])} for buy in buys]
    return buys