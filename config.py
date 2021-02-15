import os
import sys

platform = "windows" if sys.platform == "win32" else "linux"

#Database and storage
SQLALCHEMY_DATABASE_URI = os.environ["ann_database"]
SQLALCHEMY_TRACK_MODIFICATIONS = False

if platform == "windows":
    UPLOAD_FOLDER = os.environ["ann_upload_folder"]


#Recaptcha
RECAPTCHA_USE_SSL = False

RECAPTCHA_PUBLIC_KEY = os.environ["ann_recaptcha_site_key"]
RECAPTCHA_PRIVATE_KEY = os.environ["ann_recaptcha_secret_key"]

RECAPTCHA_PUBLIC_KEY_V3 = os.environ["ann_recaptcha_site_key_v3"]
RECAPTCHA_PRIVATE_KEY_V3 = os.environ["ann_recaptcha_secret_key_v3"]

RECAPTCHA_OPTIONS = {"theme": "black"}
RECAPTCHA_PARAMETERS = {"hl": "tr"}; 

#Discord
DISCORD_NEW_POST_WEBHOOK = os.environ["ann_discord_new_post_webhook"]
DISCORD_MODLOG_WEBHOOK = os.environ["ann_discord_modlog_webhook"]


#Other
MAX_CONTENT_LENGTH = 1024 * 1024 * 10
SQLALCHEMY_POOL_RECYCLE = 300

UGLIFYJS_EXTRA_ARGS = ["-m", "--toplevel"]

#Cache
CACHE_TYPE = "redis"
CACHE_REDIS_HOST = os.environ["ann_redis_host"]
CACHE_REDIS_PORT = os.environ["ann_redis_port"]
CACHE_REDIS_PASSWORD = ""

if CACHE_REDIS_HOST == "null":
    CACHE_TYPE = "null"