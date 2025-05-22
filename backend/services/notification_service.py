import os
import emails
from dotenv import load_dotenv
from mongo import db

load_dotenv()

CONTACTS = ['lucasgrisii@gmail.com']


def fill_template(items, from_name, email, message):
    item_template = """
    <div>
        <img src="{picture_url}" width="250">
        <br />
        <span><b>{title}</b></span><br />
        <span>Valor: R$ {unit_price},00</span><br />
    </div>
    <br />
    """

    all_items_html = "".join([
        item_template.format(**item) for item in items
    ])

    final_template = f"""
    <h1>Você recebeu um presente! 🎁</h1>
    <div>
        {all_items_html}
        <span>De: {from_name} ({email})</span><br /><br />
        <span>Recado:</span><br />
        <p>{message}</p>
    </div>
    """

    return final_template


def send_email(ref_id):
    # get data from db
    buy = db.buys.find_one({'buy_ref_id': ref_id})

    # Prepare the email
    message = emails.html(
        html=fill_template(buy['items'], buy['name'],
                           buy['email'], buy['message']),
        subject="Você recebeu um presente de casamento!",
        mail_from="lucasgrisii@gmail.com",
    )
    for contact in CONTACTS:
        # Send the email
        message.send(
            to=contact,
            smtp={
                "host": "email-smtp.us-east-2.amazonaws.com",
                "port": 587,
                "timeout": 5,
                "user": os.getenv("SES_USER"),
                "password": os.getenv("SES_PASSWORD"),
                "tls": True,
            },
        )
