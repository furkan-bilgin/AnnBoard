
from flask import current_app as app

from urllib import request as http
from werkzeug.urls import url_encode
from wtforms import ValidationError
import json

RECAPTCHA_VERIFY_SERVER = 'https://www.google.com/recaptcha/api/siteverify'
RECAPTCHA_ERROR_CODES = {
    'missing-input-secret': 'The secret parameter is missing.',
    'invalid-input-secret': 'The secret parameter is invalid or malformed.',
    'missing-input-response': 'The response parameter is missing.',
    'invalid-input-response': 'The response parameter is invalid or malformed.'
}
from enum import Enum
class RecaptchaType(Enum):
    V2 = 0
    V3 = 1

async def validate_recaptcha(recaptcha_type, request, recaptcha_response):
    if recaptcha_response == "":
        return False, "Ben robot değilim doğrulamasını yapmanız gerekiyor."

    try:
        key = "RECAPTCHA_PRIVATE_KEY" if recaptcha_type == RecaptchaType.V2 else "RECAPTCHA_PRIVATE_KEY_V3"
        private_key = app.config[key]
    except KeyError:
        raise RuntimeError("No RECAPTCHA_PRIVATE_KEY config set")

    data = url_encode({
        'secret':     private_key,
        'remoteip':   request.remote_addr,
        'response':   recaptcha_response
    })

    http_response = http.urlopen(RECAPTCHA_VERIFY_SERVER, _to_bytes(data))

    if http_response.code != 200:
        return False, "Robot doğrulaması başarısız oldu."

    json_resp = json.loads(_to_unicode(http_response.read()))
    
    if json_resp["success"]:
        if recaptcha_type == RecaptchaType.V2:
            return True, ""
        else:
            if float(json_resp["score"]) >= 0.5:
                return True, ""
            else:
                return False, "Robot doğrulamanız başarısız. VPN kullanıyorsanız kapatıp tekrar deneyin."

    #for error in json_resp.get("error-codes", []):
    #    if error in RECAPTCHA_ERROR_CODES:
    #        return False, "Robot değilim doğrulamasını yaparken bir sorun oluştu"#RECAPTCHA_ERROR_CODES[error]
   
    return False, "Robot doğrulaması yapılırken bir sorun oluştu. Lütfen tekrar deneyin."

def _to_bytes(text):
    """Transform string to bytes."""
    if isinstance(text, str):
        text = text.encode('utf-8')
    return text


def _to_unicode(input_bytes, encoding='utf-8'):
    """Decodes input_bytes to text if needed."""
    if not isinstance(input_bytes, (str, )):
        input_bytes = input_bytes.decode(encoding)
    return input_bytes