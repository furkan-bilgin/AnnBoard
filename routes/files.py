from flask import *
from main import file_uploader
from models import Topic, Post
from datetime import datetime, timedelta
from controllers import post_controller
from flask import current_app as app

@app.route('/d/<file_name>')
def get_file(file_name):
    try:
        file = file_uploader.get_file(file_name)
    except:
        abort(404)
        
    response = make_response(file)
    response.cache_control.max_age = 90000
    if file_name.endswith(".mp4"):
        response.headers.set("Content-Type", "video/mp4")
    else:
        response.headers.set("Content-Type", "image/jpeg")
    
    return response