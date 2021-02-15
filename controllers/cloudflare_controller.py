import requests
import os
from main import platform
from ratelimit import limits, RateLimitException
from backoff import on_exception, expo

CLOUDFLARE_KEY = os.environ["ann_cloudflare_api_key"]
CLOUDFLARE_ZONE = os.environ["ann_cloudflare_zone"]
CLOUDFLARE_EMAIL = os.environ["ann_cloudflare_email"]


@on_exception(expo, RateLimitException, max_tries=8)
@limits(calls=1200, period=60 * 5)
def purge_cache(file_list):
    if platform == "windows":
        return True, ""

    headers = {"Authorization": f"Bearer {CLOUDFLARE_KEY}",
               "Content-Type": "application/json", 
               "X-Auth-Key": CLOUDFLARE_KEY,
               "X-Auth-Email": CLOUDFLARE_EMAIL}

    data = {'files': file_list}
    url = f"https://api.cloudflare.com/client/v4/zones/{CLOUDFLARE_ZONE}/purge_cache"

    x = requests.post(url, headers=headers, json=data)

    return x.status_code == 200, x.text