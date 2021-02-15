from flask import Blueprint
api_blueprint = Blueprint("api", __name__)

def response_json(obj, status_code=200):
    obj = json.dumps(obj, separators=(',', ':'))
    response = Response(obj, status=status_code, mimetype="application/json")
    return response

def paginated_result(getter_func, total_func):
    limit = abs(int(request.args.get("limit", 50)))
    page = abs(int(request.args.get("page", 0)))

    ruc = [x.to_dict() for x in getter_func(page, limit)]
    ruc = [x for x in ruc if x != None] #Remove None

    return response_json({"result": ruc, "total": total_func()})


from .content import *
from .post import *
from .search import *