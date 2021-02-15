from datetime import time
from models.posts import Post
from flask import current_app as app
from main import db
import time
import threading
from datetime import datetime, timedelta
from .event_controller import new_comment_signal

def recalculate_all_hotness():
    delta = datetime.now() - timedelta(days=365)
    posts = Post.query.filter(Post.timestamp >= delta).filter(Post.parent_id == None).all()
    for post in posts:
        post.recalculate_hotness()
    db.session.commit()