from controllers.event_controller import *
from controllers import hotness_controller
from main import cache
from cache import *


@new_comment_signal.connect
@new_post_signal.connect
@remove_post_signal.connect
def recalculate_post_hotness(post):
    if post.parent is not None:
        post = post.parent
    
    post.recalculate_hotness(commit=True)


@new_comment_signal.connect
@new_post_signal.connect
@remove_post_signal.connect
@pin_post_signal.connect
@unpin_post_signal.connect
@distinguish_signal.connect
@undistinguish_signal.connect
@delete_media_signal.connect
def clear_front_cache(post):
    from routes import api_get_front 
    purger.purge_static_cache(api_get_front)


@new_comment_signal.connect
@remove_post_signal.connect
@pin_post_signal.connect
@unpin_post_signal.connect
@distinguish_signal.connect
@undistinguish_signal.connect
def purge_api_post_cache(post):
    if post.parent is not None:
        post = post.parent
    
    purger.purge_api_post_cache(post)


@delete_media_signal.connect
def purge_media_cache(user_media):
    purge_api_post_cache(user_media.post)
    purger.purge_user_media(user_media)