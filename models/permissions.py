from enum import Enum
from flask import g
from flask import current_app as app

class Permissions(Enum):
    REMOVE_POSTS = 0
    BAN_USERS = 1
    USER_BAN_REQUEST = 2
    POST_IN_MODERATOR_TOPIC = 3
    SEE_LANDING_PAGE = 4
    ADD_MOD = 5
    PIN_POSTS = 6
    DISTINGUISH_AS_MOD = 7
    EXPORT_LOGS = 8

    @classmethod
    def to_list(cls):
        return list(map(lambda c: c, cls))

app.jinja_env.globals.update(permissions=Permissions)