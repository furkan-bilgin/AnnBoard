from flask_login import current_user, AnonymousUserMixin
from flask import abort, request
from functools import wraps

def requires_permission(permission):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            
            if current_user.is_anonymous:
                abort(404)
            if not current_user.has_permission(permission.value):
                abort(404)
            return func(*args, **kwargs)
        return wrapper
    return decorator