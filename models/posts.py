from datetime import datetime
from globals import HIDDEN_TOPICS
from re import split
from main import db
from helpers.base36 import base36encode
from helpers.date import get_readable_date, get_timestamp
from helpers.format import format_comment_body
from controllers.event_controller import distinguish_signal
from sqlalchemy.orm import backref
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.orm.collections import attribute_mapped_collection
from sqlalchemy import event, func
from sqlalchemy.sql import *

class RemovedUserContent(db.Model):
    __tablename__ = "removed_user_content"

    id = db.Column(db.BigInteger, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow) # UTC timestamp
    post_id = db.Column(db.BigInteger, db.ForeignKey("posts.id"))
    reason = db.Column(db.String(200))
    moderator_id = db.Column(db.BigInteger, db.ForeignKey("registered_users.id"))

    moderator = db.relationship("RegisteredUser", lazy=True, primaryjoin="RegisteredUser.id == RemovedUserContent.moderator_id")
    post = db.relationship("Post", lazy=True, primaryjoin="RemovedUserContent.post_id == Post.id")

    def to_dict(self):
        if self.post is None:
            return None

        return {
            "id": self.id,
            "reason": self.reason,
            "post": self.post.to_dict(),
            "utc_timestamp": self.timestamp.isoformat()+"Z",
            "moderator": self.moderator.username
        }


class Topic(db.Model):
    __tablename__ = "topics"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15))
    posts = db.relationship('Post', lazy=True, primaryjoin="Post.topic_id == Topic.id")
    is_moderator_topic = db.Column(db.Boolean)

    def __repr__(self):
        return '<Topic {}>'.format(self.name)

    def is_hidden(self):
        return self.name in HIDDEN_TOPICS

    @property
    def topic_position(self):
        return 1 if self.name == "duyurular" else 0 


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.BigInteger, primary_key=True)
    body = db.Column(db.String(1000))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow) # UTC timestamp
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    parent_id = db.Column(db.BigInteger, db.ForeignKey("posts.id"))
    user_media_id = db.Column(db.BigInteger, db.ForeignKey("user_media.id"))
    is_pinned = db.Column(db.Boolean, default=False)
    hotness = db.Column(db.Integer, nullable=False, default=0)
    username = db.Column(db.String(100))
    title = db.Column(db.String(300))
    
    deletion_info = db.relationship("RemovedUserContent", lazy=True, primaryjoin="RemovedUserContent.post_id == Post.id", uselist=False)

    #parent is defined, don't redefine it you fucking dumbass
    topic = db.relationship("Topic", lazy=True, primaryjoin="Post.topic_id == Topic.id")
    comments = db.relationship(
        'Post',
        cascade="all, delete-orphan",
        backref=backref("parent", remote_side=id)
        #collection_class=attribute_mapped_collection("name"),
    )
    media = db.relationship("UserMedia",  uselist=False, lazy=True, primaryjoin="UserMedia.id == Post.user_media_id")
    reports = db.relationship("UserReport", backref="post", lazy=True, primaryjoin="Post.id == UserReport.post_id")
    
    def __repr__(self):
        return '<Post {} {}>'.format(self.body, self.id)

    def get_base36(self):
        return base36encode(self.id)

    def get_topic(self):
        return self.topic if self.topic is not None else self.parent.topic

    def get_url(self):
        return "/+{}/{}".format(self.get_topic().name, self.get_base36())

    def get_full_url(self):
        return "https://anonimce.com" + (self.parent.get_url() + "#" + str(self.id) if self.parent is not None else self.get_url())

    def get_date(self):
        return get_readable_date(self.timestamp)

    def has_comments(self):
        return len(self.comments) > 0

    def filter_comments(self, show_less):
        filtered_comments = [comment for comment in self.comments if not comment.is_deleted()]
        return Post.sort_by_pinned(filtered_comments if not show_less else filtered_comments[-2:])

    def get_body(self):
        return self.body

    def get_deletion_info(self):
        return self.deletion_info

    def is_deleted(self):
        return (self.deletion_info is not None) or (self.parent is not None and self.parent.is_deleted())

    def should_show(self, show_if_deleted):
        return (self.is_deleted() and show_if_deleted) or (not self.is_deleted())


    def recalculate_hotness(self, commit=False):
        if self.parent != None:
            return

        if not self.is_deleted():
            """
            G = 1.15 #gravity 
            
            time_delta = (datetime.utcnow().timestamp() - self.timestamp.timestamp()) / 60
            hours = time_delta
            unique_commenters = {x.author.id: x for x in self.filter_comments(show_less=False)}.values()
            hotness = ( len(unique_commenters) + 1 )  / ((hours + 2) ** G)
            """

            #Show newest first
            comments = self.filter_comments(show_less=False)
            post_timestamp = self.timestamp.timestamp()
            if len(comments) > 0:
                post_timestamp = comments[-1].timestamp.timestamp()
            
            time_delta = post_timestamp - 1600000000
            
            self.hotness = time_delta
        else:
            self.hotness = -100
            
        if commit:
            db.session.commit()


    def to_dict(self, show_less_comments=False, show_deleted=False, show_comments=True):
        comments = [x.to_dict() for x in self.filter_comments(show_less_comments) if x.is_deleted() == show_deleted] #Convert comments to dict if they're deleted or not 
        
        result = {
            "id": self.id,
            "base36": self.get_base36(),
            "utc_timestamp": self.timestamp.isoformat()+"Z",
            "username": "Anonim" if self.username is None else self.username,
            "topic": None if self.topic is None else self.topic.name,
            "is_pinned": self.is_pinned,
            "media_url": None if self.media is None else self.media.url,

            "comments": comments,
            "comment_count": len(self.filter_comments(show_less=False)),

            "body": (self.get_body() if self.parent is not None else self.get_body()),
            "title": self.title,
            "has_less_comments": show_less_comments
        }

        if result["topic"] is None:
            del result["topic"]
            result["parent_id"] = self.parent_id

        if result["title"] is None:
            del result["title"]

        if result["media_url"] is None or self.media.is_deleted():
            del result["media_url"]

        if len(result["comments"]) == 0 or not show_comments:
            del result["comments"]
            del result["comment_count"]
            
        if self.parent is not None:
            del result["has_less_comments"]

        return result

    def to_title(self, text):
        splitted = text.split()
        result = splitted[:4]
        text = " ".join(result)

        return text + "..." if len(splitted) > len(result) else text 

    @staticmethod
    def sort_by_pinned(list):
        new_list = []
        for post in list:
            if post.is_pinned == True:
                new_list.insert(0, post)
            else:
                new_list.append(post)

        return new_list

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.BigInteger, primary_key=True)
    ip_address = db.Column(db.String(50)) 
    user_agent = db.Column(db.String(200))
    posts = db.relationship('Post', backref='author', lazy=True, primaryjoin="User.id == Post.user_id")
    reports = db.relationship('UserReport', backref='user', lazy=True, primaryjoin="User.id == UserReport.user_id")
    is_risky = db.Column(db.Boolean(), default=None)
    country = db.Column(db.String(4))

    #is_banned = db.Column(db.Boolean, default=False)
    #ban_reason = db.Column(db.String(200))
    ban_info = db.relationship("UserBan", backref="user", lazy=True, primaryjoin="User.id == UserBan.user_id", uselist=False)

    def is_banned(self):
        return self.ban_info is not None

    def __repr__(self):
        return '<User {}>'.format(self.ip_address)

