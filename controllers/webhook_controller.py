from .event_controller import *
from ratelimit import *
from backoff import on_exception, expo
from flask import current_app as app
import requests
import json
import threading

def _send_webhook_message(webhook_url, title, fields):
    data = {}
    data["content"] = ""
    data["embeds"] = []
    embed = {}

    embed["color"] = 0
    embed["title"] = title
    embed["fields"] = [ { "name": x, "value": y } for x, y in fields ]
    data["embeds"].append(embed)

    #def send_request():
    #    result = requests.post(webhook_url, data=json.dumps(data), headers={"Content-Type": "application/json"})

    #t = threading.Thread(target=send_request)
    #t.start()

@new_post_signal.connect
@new_comment_signal.connect
def send_discord_post_webhook(post):
    fields = [("ID", post.id), ("Body",  post.body), ("IP Address", f"`{post.author.ip_address}`"), ("URL", post.get_full_url())]

    _send_webhook_message(app.config["DISCORD_NEW_POST_WEBHOOK"], "New Post", fields)


@remove_post_signal.connect
def send_discord_remove_webhook(post):
    fields = [("ID", post.id), ("Body", post.body), ("Moderator Name", post.deletion_info.moderator.username)]

    _send_webhook_message(app.config["DISCORD_MODLOG_WEBHOOK"], "Post Deleted", fields)