from flask import *
from flask import current_app as app
from flask_login import current_user
from werkzeug.routing import RequestRedirect, MethodNotAllowed, NotFound
import hashlib

def get_view_function(url, method='GET'):
    """Match a url and return the view and arguments
    it will be called with, or None if there is no view.
    """

    adapter = app.url_map.bind('localhost')

    try:
        match = adapter.match(url, method=method)
    except RequestRedirect as e:
        # recursively match redirects
        return get_view_function(e.new_url, method)
    except (MethodNotAllowed, NotFound):
        # no match
        return None

    try:
        # return the view function and arguments
        return app.view_functions[match[0]], match[1]
    except KeyError:
        # no view is associated with the endpoint
        return None


def _cache_with_args(main_str, kargs, args):
    arr = [str(kargs)]
    if len(args) > 0:
        arr.append(args[0].__name__)

    result = hashlib.sha1(str(str(main_str) + "-".join(arr)).encode("utf-8")).hexdigest()

    return result


def cache_key_user(*args, **kargs):
    return "cache_key_user_" + _cache_with_args(current_user, kargs, args)


def cache_key_ip_address(*args, **kargs):
    return "cache_key_ip_" + _cache_with_args(request.remote_addr, kargs, args)


def cache_key_session_id(*args, **kargs):
    return "cache_key_session_id_" + _cache_with_args(session["id"], kargs, args)

def cache_key_ip_user(*args, **kargs):
    return "cache_key_ip_user_" + _cache_with_args("-".join([str(current_user), str(request.remote_addr)]), kargs, args)
