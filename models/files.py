from main import db
from datetime import datetime


class UserMedia(db.Model):
    __tablename__ = "user_media"
    id = db.Column(db.BigInteger, primary_key=True)
    url = db.Column(db.String(1000))
    filename = db.Column(db.String(100))
    file_id = db.Column(db.String(600))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    is_deleted = db.Column(db.Boolean)
    
    post = db.relationship("Post",  uselist=False, lazy=True, primaryjoin="UserMedia.id == Post.user_media_id")
    deletion_info = db.relationship("RemovedUserMedia", lazy=True, primaryjoin="RemovedUserMedia.user_media_id == UserMedia.id", uselist=False)

    def is_video(self):
        return self.filename.endswith(".mp4") or self.filename.endswith(".webm")

    def is_deleted(self):
        return self.deletion_info != None

class RemovedUserMedia(db.Model):
    __tablename__ = "removed_user_media"

    id = db.Column(db.BigInteger, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow) # UTC timestamp
    user_media_id = db.Column(db.BigInteger, db.ForeignKey("user_media.id"))
    moderator_id = db.Column(db.BigInteger, db.ForeignKey("registered_users.id"))

    moderator = db.relationship("RegisteredUser", lazy=True, primaryjoin="RegisteredUser.id == RemovedUserMedia.moderator_id")
    user_media = db.relationship("UserMedia", lazy=True, primaryjoin="RemovedUserMedia.user_media_id == UserMedia.id")

    def to_dict(self):
        return None #WIP