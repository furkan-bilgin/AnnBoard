from flask import *
from main import cache
from flask import current_app as app

@app.route('/ara')
@cache.cached(3600)
def search_posts():
    return render_template("search.html")
