from controllers import prerender_controller
from controllers import user_controller
from flask import *
from main import cache
from flask import current_app as app
from models import Topic, Post
from datetime import datetime, timedelta
from helpers.base36 import base36decode
from helpers.flask import cache_key_ip_address, cache_key_ip_user, cache_key_user
from controllers import post_controller
from forms import CommentForm

@app.route('/+<topic_name>')
@app.route('/+<topic_name>/')
@cache.memoize(600)
def show_topic(topic_name):    
    topic = post_controller.get_topic(topic_name)
    
    if topic is None:
        flash("Girmek istediğiniz kategori bulunamadı. Kategori listesi için ana sayfaya dönün.", category="error")
        abort(404)

    if topic.is_hidden():
        flash("Girmek istediğiniz kategori gizli.", category="error")
        abort(404)
        
    return render_template("content/show_topic.html", 
                            topic=topic,
                            prerender=prerender_controller.prerender_front(topic_name))

show_topic.make_cache_key = cache_key_user

@app.route('/+<topic_name>/<base36>')
@cache.memoize(30)
def show_post(topic_name=None, base36=None):
    form = CommentForm(request.form)
    topic = post_controller.get_topic(topic_name)
    user = user_controller.get_user(request.remote_addr, check_risk=True, user_agent=request.user_agent.string, country=session["country"])

    if topic is None:
        flash("Girmek istediğiniz kategori bulunamadı. Kategori listesi için ana sayfaya dönün.", category="error")
        abort(404)
    else:
        post = post_controller.get_post(base36)
        
        if (post is None) or (post.parent is not None) or (post.topic.name != topic_name) or (post.deletion_info is not None):
            flash("Girmek istediğiniz paylaşım bulunamadı.", category="error")
            abort(404)
        
        return render_template("content/show_post.html",
                                post=post,
                                form=form,
                                topic=topic, 
                                show_checkbox_recaptcha=user.is_risky,
                                prerender=prerender_controller.prerender_post(post))

show_post.make_cache_key = cache_key_ip_user