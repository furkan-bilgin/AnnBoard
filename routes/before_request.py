from flask import current_app as app
from flask import request, session, abort
from controllers import user_controller
from flask_login import login_user
import os


@app.before_request
def before_request_ip_change_check():
    if "last_ip" not in session:
        session["last_ip"] = request.remote_addr
        return

    if session["last_ip"] != request.remote_addr:
        session.clear()

@app.before_request
def get_country():
    session["country"] = request.headers.get("CF-IPCountry", None)

@app.before_request
def before_request_set_id():
    if "id" not in session:
        session["id"] = os.urandom(30).hex()

@app.after_request
def after_request_admin_token(response):
    if "admin_token" in request.cookies:
        token = request.cookies["admin_token"]
        user = user_controller.get_user_by_token(token)
        if user is not None:
            login_user(user)
        else:
            response.set_cookie("admin_token", "", 0)

    return response


@app.before_request
def prevent_raw_css_or_js():
    if request.path.startswith("/static/js") or request.path.startswith("/static/css/anon") or request.path.startswith("/static/nunjucks"):
        abort(404) 