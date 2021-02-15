from flask import *
from flask import current_app as app

@app.errorhandler(404)
def error_404(msg):
    return render_template("error/404.html"), 404


@app.errorhandler(403)
def error_403(msg):
    flash("Bu sayfaya giremezsiniz.", category="error")
    return render_template("error/404.html"), 403

@app.errorhandler(500)
def error_500(msg):
    flash("Sunucu hatası. Lütfen bir süre sonra tekrar deneyin.", category="error")
    return render_template("error/404.html"), 500


@app.errorhandler(429)
def ratelimit_handler(e):
    return make_response(
            "Too many requests", 429
    )