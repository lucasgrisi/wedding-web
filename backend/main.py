from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from services.item_service import item_service, update_payed_items
from services.presenca_service import confirm_presenca, get_presenca, edit_presenca, list_presencas
from services.payment_service import create_preference, get_payment_approved_items, insert_user_msg, update_buy_status, get_all_buys
from services.notification_service import send_email
from utils.check_mp_signature import check_signature


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["d6c08jelq30tc.cloudfront.net", "localhost:8000", "marialeticiaediogo.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.post("/preference")
async def get_preference_id(req: Request):
    body = await req.json()
    items = body.get('items', [])
    preference, buy_ref_id = create_preference(items)

    return {'id': preference['id'], 'external_ref_id': buy_ref_id}

@app.post("/buymsg")
async def set_buy_msg(req: Request):
    body = await req.json()
    print(body)
    user_msg = body.get('message', {})
    pref_id = body.get('preferenceId', '')
    buy_ref_id = body.get('externalRefId', '')

    info = insert_user_msg(user_msg, pref_id, buy_ref_id)
    return {'success': 'true', 'info': str(info)}

@app.post("/webhook")
async def get_payment_feedback(req: Request):
    body = await req.json()
    if not check_signature(req):
        return {'success': False, 'info': 'Bad Signature'}
    approved, info = get_payment_approved_items(body['data'])
    if approved:
        update_payed_items(info)
        ref_id = update_buy_status(body['data'])
        send_email(ref_id)

@app.get("/items")
def get_all_items():
    items = item_service.list_items()
    return items

@app.post("/presenca")
async def confirmar_presenca(req: Request):
    body = await req.json()
    success, info = confirm_presenca(body)
    return {"success": success, "info": info}

@app.post("/getpresenca")
async def get_presenca_by_email(req: Request):
    body = await req.json()
    success, info = get_presenca(body['email'])
    return {'success': success, 'info': info}

@app.get("/confirms")
async def list_confirms():
    success, info = list_presencas()
    return {'success': success, 'info': info}

@app.post("/editpresenca")
async def atualizar_presenca(req: Request):
    body = await req.json()
    success, info = edit_presenca(body)
    return {'success': success, 'info': info}

@app.get("/presentes")
def get_all_presentes():
    buys = get_all_buys()
    return buys