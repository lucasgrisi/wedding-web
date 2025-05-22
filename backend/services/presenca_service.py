from mongo import get_presenca_collection
# from services.email_service import send_email

collection = get_presenca_collection()

def confirm_presenca(obj: dict):
    res = collection.find_one({'email': obj['email']})
    if not res:
        res = collection.insert_one(obj)
        # _, info = send_email(obj['email'], 'Bruna & Lucas - Presença Confirmada', 'Sua presença está confirmada, muito obrigado! 🎉\n\nNos vemos na festa!')
        # print(info)
        return True, str(res.inserted_id)
    return False, "Você já confirmou presença"

def get_presenca(email: str):
    res = collection.find_one({"email": email})
    if not res:
        return False, "email não encontrado"
    res.pop('_id')
    return True, res

def edit_presenca(obj: dict):
    res = collection.find_one({'email': obj['email']})
    if not res:
        False, "email nao encontrado"
    # for key, value in obj.keys():
    #     if key != "_id":
    #         res[key] = value

    result = collection.update_one({'email': obj['email']}, {'$set': obj})
    if result.modified_count == 1:
        # msg = 'Número de adultos: {}\nNúmero de crianças: {}'.format(obj['nAdults'], obj['nChildren'])
        # _, info = send_email(obj['email'], 'Bruna & Lucas - Presença Atualizada', f'Sua presença foi atualizada ✅\n{msg}')
        # print(info)
        return True, "Atualização concluída com sucesso"
    else:
        return False, "Falha na atualização"       
    
def list_presencas():
    res = collection.find()
    result =[]
    for p in res:
        _id = p.pop("_id")
        p["id"] = str(_id)
        result.append(p)
    return True, result