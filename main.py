#/usr/bin/bash python
from controllers import file_controller
from os import environ
from flask import Flask
from flask_compress import Compress
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade as migrate_upgrade
from flask_login import LoginManager 
from flask_assets import Environment
from flask_caching import Cache
from helpers.safer_proxy_fix import SaferProxyFix
from version import version
import controllers.file_controller
import os
import asyncio
import nest_asyncio
import sys
import hashlib

platform = "linux"

if sys.version_info[0]==3 and sys.version_info[1] >= 8 and sys.platform.startswith('win'):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    platform = "windows"

event_loop = asyncio.new_event_loop()
asyncio.set_event_loop(event_loop)
nest_asyncio.apply()

db = SQLAlchemy() 
migrate = Migrate()
login_manager = LoginManager()
compress = Compress()
assets = Environment()
cache = Cache()

file_uploader = file_controller.BackblazeFileUploader()

def create_app(config_filename):
    app = Flask(__name__)
    app.secret_key = os.urandom(24)

    if "ann_use_safer_proxy" in os.environ:
        app.wsgi_app = SaferProxyFix(app.wsgi_app, num_proxy_servers=1 if platform == "linux" else 2)
    
    app.config.from_pyfile(config_filename)

    with app.app_context():
        register_extensions(app)
        migrate_db(app)
        register_blueprints(app)
        register_version(app)
        register_controllers(app)

    return app


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)

    assets.init_app(app)
    compress.init_app(app)
    cache.init_app(app)
    cache.clear()

    from models.users import AnonUser
    login_manager.anonymous_user = AnonUser
    login_manager.session_protection = "basic"

    login_manager.init_app(app)
    

def register_blueprints(app):
    from routes import api_blueprint, admin_blueprint

    app.register_blueprint(api_blueprint, url_prefix='/api/v1/')
    app.register_blueprint(admin_blueprint, url_prefix='/admin/')


def register_version(app):
    app.jinja_env.globals.update(version_hash=hashlib.sha1(version.encode("utf-8")).hexdigest())


def register_controllers(app):
    import controllers.cache_controller
    import controllers.user_controller 


def migrate_db(app):
    with app.app_context():
        migrate_upgrade()
