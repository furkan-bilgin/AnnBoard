from flask import *
from main import cache
from flask import current_app as app
from models import Topic, Post
from datetime import datetime, timedelta
from controllers import post_controller, prerender_controller

@app.route('/')
@cache.memoize(300)
def front_page():
    return render_template("index.html", 
                            topics=post_controller.get_all_topics(),
                            prerender=prerender_controller.prerender_front("front"))
