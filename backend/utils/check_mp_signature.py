import hashlib
import hmac
import urllib.parse
import os
from dotenv import load_dotenv

load_dotenv()

MP_SECRET_KEY = os.getenv("MP_SECRET_KEY")

def check_signature(request):
    # Obtain the x-signature value from the header
    xSignature = request.headers.get("x-signature")
    xRequestId = request.headers.get("x-request-id")

    # Obtain Query params related to the request URL
    queryParams = urllib.parse.parse_qs(request.url.query)

    # Extract the "data.id" from the query params
    dataID = queryParams.get("data.id", [""])[0]

    # Separating the x-signature into parts
    parts = xSignature.split(",")

    # Initializing variables to store ts and hash
    ts = None
    hash = None

    # Iterate over the values to obtain ts and v1
    for part in parts:
        # Split each part into key and value
        keyValue = part.split("=", 1)
        if len(keyValue) == 2:
            key = keyValue[0].strip()
            value = keyValue[1].strip()
            if key == "ts":
                ts = value
            elif key == "v1":
                hash = value

    # Obtain the secret key for the user/application from Mercadopago developers site
    secret = MP_SECRET_KEY

    # Generate the manifest string
    manifest = f"id:{dataID};request-id:{xRequestId};ts:{ts};"

    # Create an HMAC signature defining the hash type and the key as a byte array
    hmac_obj = hmac.new(secret.encode(), msg=manifest.encode(), digestmod=hashlib.sha256)

    # Obtain the hash result as a hexadecimal string
    sha = hmac_obj.hexdigest()
    if sha == hash:
        # HMAC verification passed
        # print("HMAC verification passed")
        return True
    else:
        # HMAC verification failed
        # print("HMAC verification failed")
        return False