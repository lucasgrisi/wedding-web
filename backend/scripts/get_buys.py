# from pymongo import MongoClient
from datetime import datetime, timezone
import mercadopago
import os
from pprint import pprint
from dotenv import load_dotenv

load_dotenv()
# client = MongoClient("mongodb://localhost:27017")
# db = client["casamento"]

# client = MongoClient(os.getenv("MONGO_URI"))
# db = client["casamento"]

sdk = mercadopago.SDK(os.getenv("MP_API_KEY"))

preference = sdk.preference().get('240767208-df7f295f-f509-462a-a3e1-0aa296b2054f')
pprint(preference)
# payment = sdk.payment().get("90399291123")
# pprint(payment)


# payments = sdk.payment().search()
# presentes = payments['response']['results']
# for presente in presentes:
#     ref_id = presente['external_reference']
#     # if not ref_id:
#     #     continue
#     items = presente['additional_info'].get('items', [])
#     created_at = presente['date_created']
#     approved_at = presente['date_approved']

#     pprint(ref_id)
#     pprint(approved_at)
#     pprint(items)