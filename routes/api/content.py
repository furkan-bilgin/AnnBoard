from flask import *
from flask import current_app as app
from main import cache
from flask_login import current_user
from controllers import post_controller, user_controller
from helpers.chain_control import control
from .__init__ import api_blueprint, response_json


@api_blueprint.route('/post/<base36>', methods=["GET"])
@cache.memoize(300)
def api_get_post(base36):
    post = post_controller.get_post(base36)
    if post == None or post.is_deleted() or post.parent != None:
        abort(404)
    
    return response_json({"success": True, "post": post.to_dict()})


@api_blueprint.route('/front', methods=["GET"])
@cache.memoize(300)
def api_get_front():
    result = []
    posts = post_controller.get_front_posts()
    for post in posts:
        result.append(post.to_dict(show_less_comments=True))
        
    return response_json({"success": True, "posts": result})


@api_blueprint.route('/null', methods=["POST"])
@cache.memoize(9000)
def api_null():
    response = response_json({"success": False})
    response.status_code = 404
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"

    return response


@api_blueprint.route('/front/<topic_name>', methods=["GET"])
@cache.memoize(300)
def api_get_topic_front(topic_name):
    result = []
    posts = post_controller.get_topic_posts(topic_name)
    if posts is None:
        abort(404)

    for post in posts:
        if not post.is_deleted():
            result.append(post.to_dict(show_less_comments=True))
        
    return response_json({"success": True, "posts": result})


@api_blueprint.errorhandler(404)
@api_blueprint.errorhandler(403)
@cache.memoize(3600)
def api_404(err):
    response = response_json({"success": False, "message": "Aradığınız şey bulunamadı."})
    response.status_code = 404

    return response


@api_blueprint.errorhandler(500)
@cache.memoize(3600)
def api_500(err):
    response = response_json({"success": False, "message": "Sunucu hatası. Bir süre sonra tekrar deneyin."})
    response.status_code = 500

    return response
