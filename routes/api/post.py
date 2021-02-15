from flask import *
from flask_login import current_user
from forms import PostForm, CommentForm
from models import Post, Permissions
from controllers.file_controller import get_file_path
from controllers import post_controller, user_controller
from controllers.spam_controller import is_user_spamming
from main import file_uploader, event_loop
from flask import current_app as app
from helpers.form import flash_form_errors, get_form_errors, get_uploaded_file_size
from helpers.chain_control import control
from helpers.date import get_timestamp
from helpers.recaptcha import validate_recaptcha, RecaptchaType
from routes.topic import show_post
from .__init__ import api_blueprint, response_json
import os
import sys

def response_error(err):
    return response_json({ "success": False, "message": err }, 429)

def ban_result():
    return response_error("IP adresiniz sınırsız süre tekmelenmiş. Paylaşım ya da yorum yapamazsınız.")

def spam_error():
    return response_error("Çok hızlı paylaşım yapıyorsunuz! Biraz yavaşlayıp tekrar deneyin.")

def not_found():
    return response_error("Bu paylaşım ya da kategori bulunamadı.")

def success(post, extra={}):
    return response_json({ "success": True, "post": { **post.to_dict(), **extra} })


def process_file(media, user_id):
    blob = media.read()

    if len(blob) >= 1024 * 1024 * 6: # max file size is 6 MB
        return (False, "6 MB'dan büyük bir dosya yükleyemezsiniz.", "")
    
    if len(blob) < 100:
        return True, "", None
    
    filename, extension = os.path.splitext(media.filename)
    filename = str(get_timestamp()) + extension

    url = get_file_path(filename)

    file_id = file_uploader.upload_file(filename, blob)
    user_media = post_controller.add_user_media(url, filename, user_id, file_id)
    
    return True, "", user_media

def check_recaptcha(globals):
    type = RecaptchaType.V2 if globals["user"].is_risky else RecaptchaType.V3
    result, message = event_loop.run_until_complete(validate_recaptcha(type, request, request.form["g-recaptcha-response"]))

    return result, message

def check_media(globals):
    if "media" in request.files:
        result, error, user_media = process_file(request.files["media"], globals["user"].id)
        globals["user_media"] = user_media
        return result, error
    
    globals["user_media"] = None

    return True, ""


@api_blueprint.route('/submit/topic/<topic_name>', methods=["POST"])
def submit_post(topic_name):
    topic = post_controller.get_topic(topic_name)
    user = user_controller.get_user(request.remote_addr, check_risk=True, user_agent=request.user_agent.string, country=session["country"])
    form = PostForm(request.form, user.is_risky)
    
    if topic is None:
        return not_found()

    if user.is_banned():
        return ban_result()

    if topic.is_moderator_topic and not current_user.has_permission(Permissions.POST_IN_MODERATOR_TOPIC):
        return not_found()
    
    body = escape(form.body.data)
    title = escape(form.title.data)
    
    if len(form.title.data) == 0:
        title = None

    if form.validate():       
        def check_post(globals):
            um_id = globals["user_media"].id if globals["user_media"] is not None else None

            result, error, post = post_controller.create_post(body, topic.id, user.id, um_id, title)
            if form.distinguish_as_mod.data == True and current_user.has_permission(Permissions.DISTINGUISH_AS_MOD):
                post_controller.distinguish_post_as_mod(post)

            globals["post"] = post

            return result, error
            
        globals = {"user": user, "form": form}
        result, error, globals = control(globals, check_recaptcha, check_media, check_post)

        if result:
            post = globals["post"]
            return success(post, { "url": post.get_url() })
        else:
            return response_error(error)
    else:
        return response_error(", ".join(get_form_errors(form)))


@api_blueprint.route('/submit/comment', methods=["POST"])
def submit_comment():
    user = user_controller.get_user(request.remote_addr, check_risk=True, user_agent=request.user_agent.string, country=session["country"])
    form = CommentForm(request.form, user.is_risky)
    topic = post_controller.get_topic(form.topic_name.data)
    post = post_controller.get_post(form.base36.data)

    if user.is_banned():
        return ban_result()

    if is_user_spamming(user):
        return spam_error()
    
    body = escape(form.body.data)

    if topic is None or post is None or post.is_deleted():
        return not_found()

    if form.validate():
        def check_post(globals):
            um_id = globals["user_media"].id if globals["user_media"] is not None else None
            result, error, comment = post_controller.create_comment(body, post.id, user.id, um_id)
            
            if form.distinguish_as_mod.data == True and current_user.has_permission(Permissions.DISTINGUISH_AS_MOD):   
                post_controller.distinguish_post_as_mod(post)
            
            globals["post"] = comment

            return result, error
            
        globals = {"user": user, "form": form}
        result, error, globals = control(globals, check_recaptcha, check_media, check_post)
        
        if result:
            post = globals["post"]
            return success(post)  
        else:
            return response_error(error)
    else:
        return response_error(", ".join(get_form_errors(form)))
        