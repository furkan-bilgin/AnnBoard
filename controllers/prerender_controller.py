#! /usr/bin/env python
from threading import Thread
from helpers.date import get_timestamp
import subprocess
import base64
import json
from helpers.flask import _cache_with_args 
from flask import current_app as app
from main import cache, platform
from controllers import post_controller
import traceback 

MEMOIZE_TIME = 60*60*60*6 #6 hours

def _run_nodejs(render_type, data, cache_key, app):
    try:
        filename = app.root_path+"/prerender/" + str(get_timestamp()) + ".txt"
        file = open(filename, "w")
        file.write(data)
        file.close()

        node_path = "node"
        if platform == "linux":
            node_path = "/usr/bin/node"

        output = subprocess.run([node_path, f"{app.root_path}/prerender/index.js", render_type, filename], capture_output=True)
        output = output.stdout.decode("utf-8")
        
        with app.app_context():
            cache.set(cache_key, output, timeout=MEMOIZE_TIME)

    except Exception as e:
        print("Exception during prerendering", e)
        traceback.print_exc()
        return ""

def _run_nodejs_thread(*args):
    thread = Thread(target=_run_nodejs, args=(*args, app._get_current_object()))
    thread.setDaemon(True)
    thread.start()

def cache_key_prerender(obj):
    return _cache_with_args("cache_key_prerender_", [ obj ], [])


"""
Try to get prerendered string in cache. If not, start prerender it on background task.
"""
def _prerender(key, action):
    cache_key = cache_key_prerender(key)
    result = cache.get(cache_key)
    if result != None:
        return result
        
    action(cache_key)
    return ""


def prerender_post(post):
    def prerender(cache_key):
        data = json.dumps({ "post": post.to_dict(show_less_comments=True) })
        _run_nodejs_thread("post", data, cache_key)
    
    return _prerender(post, prerender)


def prerender_front(topic_name):
    def prerender(cache_key):
        post_list = post_controller.get_topic_posts(topic_name) if topic_name != "front" else post_controller.get_front_posts()

        data = json.dumps({ "posts": [ x.to_dict(show_less_comments=True) for x in post_list ] })
        _run_nodejs_thread("front", data, cache_key)
    
    return _prerender(topic_name, prerender)