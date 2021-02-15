from routes.api.post import response_error
from flask import *
from main import cache
from flask import current_app as app
from flask_login import current_user
from controllers import post_controller, user_controller
from helpers.chain_control import control
from .__init__ import api_blueprint, response_json


@api_blueprint.route('/search', methods=["GET"])
@cache.cached(600, query_string=True)
def api_search_posts():
    query = request.args.get("q", "")
    if query == "":
        abort(404)
    
    if len(query) < 3:
        return response_error("Aratmak istediğiniz şey çok kısa. Lütfen daha uzun bir şeyler yazın.")

    posts = post_controller.search_posts(query)
    return response_json({ "success": True, "posts": [ x.to_dict(show_comments=False) for x in posts ]})
