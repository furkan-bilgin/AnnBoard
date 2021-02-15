from werkzeug.routing import BuildError
from helpers.flask import get_view_function
from main import cache
from flask import url_for
from .base import BaseCachePurger
from helpers.flask import get_view_function
from controllers import cloudflare_controller
import time
import re


class CloudflareCachePurger(BaseCachePurger):
    def _purge_cache(self, *paths):
        result, message = cloudflare_controller.purge_cache(["https://anonimce.com" + x for x in paths]) #quick hack, fix later

    def purge_api_post_cache(self, post):
        self._purge_cache(
            url_for("api.api_get_post", base36=post.get_base36()), 
            url_for("api.api_get_topic_front", topic_name=post.topic.name)
        )

    def purge_static_cache(self, func):
        try:
            self._purge_cache(url_for(func.__name__))
        except BuildError as ex:
            self._purge_cache(url_for(ex.suggested.endpoint))

    def purge_user_media(self, user_media):
        self._purge_cache(user_media.url)


class FlaskCachePurger(BaseCachePurger):
    def purge_api_post_cache(self, post):
        from routes import api_get_post, api_get_topic_front
        cache.delete_memoized(api_get_post, post.get_base36())
        cache.delete_memoized(api_get_topic_front, post.topic.name)

    def purge_static_cache(self, func):
        cache.delete_memoized(func)

    def purge_user_media(self, user_media):
        pass
