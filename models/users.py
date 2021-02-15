from datetime import datetime
from main import db, cache
from flask_login import UserMixin, AnonymousUserMixin
from models.permissions import Permissions
import json

GROUP_PERMISSONS = {
    "owner": Permissions.to_list(),
    "janitor": [Permissions.REMOVE_POSTS, Permissions.USER_BAN_REQUEST],
    "mod": [Permissions.BAN_USERS, Permissions.REMOVE_POSTS, Permissions.SEE_LANDING_PAGE, Permissions.POST_IN_MODERATOR_TOPIC, Permissions.PIN_POSTS, Permissions.DISTINGUISH_AS_MOD]
}

class PermissionGroup(db.Model):
    __tablename__ = "permission_groups"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    permissions = db.Column(db.String(200))


class RegisteredUser(UserMixin, db.Model):
    __tablename__ = "registered_users"
    
    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(200))
    token = db.Column(db.String(100))
    permission_group_id = db.Column(db.Integer, db.ForeignKey("permission_groups.id"))
    
    permission_group = db.relationship("PermissionGroup", lazy=True, primaryjoin="PermissionGroup.id == RegisteredUser.permission_group_id")

    @cache.memoize(180)
    def get_permissions(self):
        if self.permission_group.name in GROUP_PERMISSONS:
            return [ x.value for x in GROUP_PERMISSONS[self.permission_group.name] ]

        return json.loads(self.permission_group.permissions)

    def has_any_permission(self):
        return len(self.get_permissions()) > 0 

    def has_permission(self, permission):
        if isinstance(permission, Permissions):
            permission = permission.value

        if self.permission_group.name == "owner":
            return True

        return permission in self.get_permissions()

    def clear_token(self):
        self.token = None
        db.session.commit()

    def __repr__(self):
        return "<RegisteredUser {}>".format(self.username)


class UserBan(db.Model):
    __tablename__ = "user_bans"
    
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"))
    reason = db.Column(db.String(1000))
    moderator_id = db.Column(db.BigInteger, db.ForeignKey("registered_users.id"))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow) # UTC timestamp


class AnonUser(AnonymousUserMixin):
    def get_permissions(self):
        return []
    
    def has_permission(self, permission):
        return False

    def has_any_permission(self):
        return False

    def __repr__(self):
        return "<AnonUser>"
