import datetime
from controllers import user_controller
import controllers.user_controller
from datetime import timedelta, datetime

MAX_VIOLATIONS = 5
POST_CHECK_DELTA = timedelta(minutes=5)

def is_user_spamming(user):
    post_timestamps = [ post.timestamp for post in user.posts ]
    violation = 0

    for timestamp in post_timestamps:
        if datetime.utcnow() - timestamp < POST_CHECK_DELTA:
            violation += 1

    return violation >= MAX_VIOLATIONS
