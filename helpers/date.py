from datetime import timedelta, datetime, timezone
import locale
import time

def get_readable_date(datetime):
    date = datetime + timedelta(hours=3) # TODO: Change this mess
    return date.strftime("%d %b %Y %H:%M:%S")


def _unix_time(dt):
    epoch = datetime.utcfromtimestamp(0)
    delta = dt - epoch
    return delta.total_seconds()

def _unix_time_millis(dt):
    return int(_unix_time(dt) * 1000)

def get_timestamp(now=None):
    if now is None:
        now = datetime.utcnow()

    return _unix_time_millis(now)