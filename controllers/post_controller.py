from models.files import RemovedUserMedia
from controllers import cache_controller
from controllers import file_controller
from flask import current_app as app
from main import db, file_uploader
from sqlalchemy import *
from sqlalchemy.sql import *
from models import Post, Topic, RemovedUserContent, UserMedia
from helpers.base36 import base36decode, base36encode, represents_int
from controllers import user_controller
from datetime import datetime, timedelta
from controllers.event_controller import *
from globals import HIDDEN_TOPICS
import operator

def create_post(body, topic_id, user_id, user_media_id, title):
    #TODO: Add spam prevention

    post = Post(body=body, topic_id=topic_id, user_id=user_id, user_media_id=user_media_id, title=title)
    db.session.add(post)
    db.session.commit()
    
    new_post_signal.send(post)

    return True, "", post

def create_comment(body, post_id, user_id, user_media_id):
    comment = Post(body=body, topic_id=None, parent_id=post_id, user_id=user_id, user_media_id=user_media_id)
    db.session.add(comment)
    db.session.commit()

    new_comment_signal.send(comment)

    return True, "", comment

def delete_user_content(post_id, moderator_id, reason):
    post_id, moderator_id = int(post_id), int(moderator_id)
    post = get_post(base36encode(post_id))
    if post is None:
        return False, "Böyle bir paylaşım yok."
    
    if post.is_deleted():
        return False, "Bu paylaşım zaten silinmiş."

    if post.media != None:
        delete_user_media(post.media, moderator_id)

    ruc = RemovedUserContent(post_id=post_id, moderator_id=moderator_id, reason=reason)
    db.session.add(ruc)
    db.session.commit()

    remove_post_signal.send(post)

    return True, ""

def add_user_media(url, filename, user_id, file_id):
    uc = UserMedia(url=url, filename=filename, user_id=user_id, file_id=file_id)
    db.session.add(uc)
    db.session.commit()

    return uc

def delete_user_media(user_media, moderator_id):
    rum = RemovedUserMedia(user_media_id=user_media.id, moderator_id=moderator_id)
    
    file_uploader.delete_file(user_media.file_id, "uc/" + user_media.filename)
    cache_controller.purge_media_cache(user_media)
    db.session.add(rum)
    db.session.commit()

    delete_media_signal.send(user_media)


def get_removed_user_content(page, limit):
    return RemovedUserContent.query.order_by(desc(RemovedUserContent.id)).limit(limit).offset(limit * page).all()


def get_removed_user_content_count():
    return RemovedUserContent.query.count()


def distinguish_post_as_mod(post):
    post.username = "Moderatör"
    distinguish_signal.send(post)

    db.session.commit()


def undistinguish_post_as_mod(post):
    post.username = "Anonim"
    undistinguish_signal.send(post)

    db.session.commit()


def get_post(base36):
    try:
        base36 = base36decode(base36)
    except:
        return None
            
    posts = Post.query.filter(Post.id == base36).all()

    return None if len(posts) == 0 else posts[0]

def search_posts(query):
    posts = Post.query.filter(Post.body.contains(query)).filter(Post.deletion_info == None).order_by(desc(Post.timestamp)).limit(50).all()
    return [ x for x in posts if x.parent == None or (x.parent != None and not x.parent.is_deleted()) ]

def get_post_by_id(id):
    return get_post(base36encode(id))

def get_front_posts():
    yesterday = datetime.now() - timedelta(days=365)#timedelta(days=1)

    posts = Post.query.filter(Post.timestamp >= yesterday). \
                       filter(Post.parent_id == None). \
                       filter(Post.deletion_info == None). \
                       filter(or_(Post.is_pinned == False, and_(Post.is_pinned, Post.topic.has(is_moderator_topic=True)))).\
                       order_by(desc(Post.hotness)). \
                       order_by(desc(Post.timestamp)).limit(100).all()
    
    return Post.sort_by_pinned(posts)

def get_topic_posts(name):
    topic = get_topic(name)
    if topic is None:
        return None
        
    posts = Post.query.filter(Post.topic_id == topic.id). \
                       filter(Post.parent_id == None). \
                       filter(Post.deletion_info == None). \
                       order_by(desc(Post.hotness)). \
                       order_by(desc(Post.timestamp)).limit(100).all()
                       
    return Post.sort_by_pinned(posts)

def get_topic(name):
    topics = Topic.query.filter(Topic.name == name).all()
    
    return None if len(topics) == 0 else topics[0]

def get_all_topics():
    return sorted(Topic.query.filter(Topic.name.notin_(HIDDEN_TOPICS)).all(), key=operator.attrgetter("topic_position"))

def pin_post(post):
    if post is None:
        return False

    post.is_pinned = True
    db.session.commit()
    
    pin_post_signal.send(post)
    
    return True


def unpin_post(post):
    if post is None:
        return False
    
    post.is_pinned = False
    db.session.commit()
    
    unpin_post_signal.send(post)

    return True

