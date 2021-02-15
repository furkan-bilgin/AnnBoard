from flask import *
from main import cache
from flask import current_app as app

@app.route('/robots.txt')
def robots():
    return send_file("./templates/robots.txt")


@app.route('/sss')
@cache.memoize(3600)
def faq():
    return render_template("faq.html")


@app.route('/kurallar')
@cache.memoize(3600)
def site_rules():
    return render_template("site_rules.html")


@app.route('/iletisim')
@cache.memoize(3600)
def contact_us():
    return render_template("contact_us.html")
