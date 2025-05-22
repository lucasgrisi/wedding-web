
from pymongo import MongoClient
from datetime import datetime, timezone
import mercadopago
import os
client = MongoClient("mongodb://localhost:27017")
db = client["casamento"]

# client = MongoClient(os.getenv("MONGO_URI"))
# db = client["casamento"]

sdk = mercadopago.SDK(os.getenv("MP_API_KEY"))


payments = sdk.payment().search()
presentes = payments['response']['results']
for presente in presentes:
    ref_id = presente['external_reference']
    if not ref_id:
        continue
    items = presente['additional_info']['items']
    created_at = presente['date_created']
    approved_at = presente['date_approved']
    print(datetime.fromisoformat(created_at).astimezone(timezone.utc))
    db.buys.update_one(
        {'buy_ref_id': ref_id},
        {'$set': {'items': items, 'created_at': datetime.fromisoformat(created_at).astimezone(
            timezone.utc), 'approved_at': datetime.fromisoformat(approved_at).astimezone(timezone.utc)}}
    )
