from flask import *
from flask import current_app as app
from flask_login import current_user
from forms import PostForm, CommentForm
from models import Post, Permissions
from controllers.file_controller import get_file_path
from controllers import post_controller, user_controller
from main import cache
from helpers.form import flash_form_errors, get_uploaded_file_size
from helpers.chain_control import control
from helpers.date import get_timestamp
from helpers.recaptcha import validate_recaptcha, RecaptchaType
from helpers.flask import cache_key_ip_address, cache_key_ip_user, cache_key_user
from routes.topic import show_post
import os
import sys


@app.route('/+<topic_name>/ekle', methods=["GET"])
@cache.memoize(180)
def submit_post(topic_name):
    topic = post_controller.get_topic(topic_name)
    user = user_controller.get_user(request.remote_addr, check_risk=True, user_agent=request.user_agent.string, country=session["country"])
    form = PostForm(request.form, user.is_risky)
    
    if user.is_banned():
        return render_template("error/you_are_banned.html")

    if topic is None:
        abort(404)

    if topic.is_hidden():
        flash("Bu kategori gizli. Başka kategoride paylaşım yapın.", category="error")
        abort(404)

    if topic.is_moderator_topic and not current_user.has_permission(Permissions.POST_IN_MODERATOR_TOPIC):
        abort(404)


    return render_template("content/submit_post.html", form=form, topic=topic, show_checkbox_recaptcha=user.is_risky)

submit_post.make_cache_key = cache_key_ip_user


@app.route('/ekle', methods=["GET"])
@cache.cached(3600, make_cache_key=cache_key_user)
def submit_post_without_topic():
    topics = post_controller.get_all_topics()
    if not current_user.has_permission(Permissions.POST_IN_MODERATOR_TOPIC):
        topics = [x for x in topics if not x.is_moderator_topic]

    return render_template("content/submit_post.html", topics=topics)
