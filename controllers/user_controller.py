from models.users import PermissionGroup, UserBan
from flask import current_app as app
from main import db, event_loop
from sqlalchemy import desc
from models import User, RegisteredUser, RemovedUserContent, UserReport
from datetime import datetime, timedelta
from main import login_manager
from helpers.hash import bcrypt_check, bcrypt_hash
from helpers.ip_checker import is_ip_address_bad
from sqlalchemy import desc
from controllers.event_controller import *
import os


@login_manager.user_loader
def load_user(user_id):
    return RegisteredUser.query.get(int(user_id))


def login_registered_user(username, password):
    user = get_registered_user(username)
    if user is None:
        return False
        
    return bcrypt_check(password, user.password)


def get_user_token(username, create_new=True):
    user = get_registered_user(username)
    if user is None:
        return None
    if create_new or user.token == None:
        user.token = os.urandom(30).hex()

    db.session.commit()
    
    return user.token


def get_user_by_token(token):
    return RegisteredUser.query.filter(RegisteredUser.token == token).first()


def get_registered_user(username):
    return RegisteredUser.query.filter(RegisteredUser.username == username).first()


def get_user_by_id(id):
    return User.query.filter(User.id == id).first()


def get_user(ip_address, create_new=True, check_risk=False, user_agent=None, country=None):
    user = User.query.filter(User.ip_address == ip_address).first()
    if create_new and user is None:
        user = add_user(ip_address)

    if create_new:
        if check_risk:
            check_user_ip(user, country)

        if user_agent is not None:
            user.user_agent = user_agent
            db.session.commit()
            
    if user is not None:
        if user.country is None and country is not None:
            user.country = country
            db.session.commit()

    return user


def add_user(ip_address):
    if get_user(ip_address, create_new=False) is not None:
        return get_user(ip_address)
        
    user = User(ip_address=ip_address)
    db.session.add(user)
    db.session.commit()

    return user
    

def ban_user(user_id, moderator_id, reason=None):
    user = get_user_by_id(user_id)
    if user is None:
        return False
    if user.is_banned():
        return False
    
    userban = UserBan(user_id=user_id, reason=reason, moderator_id=moderator_id)
    db.session.add(userban)
    db.session.commit()

    return True


def get_post_reports(post_id, reporter_id=None):
    from controllers.post_controller import get_post_by_id

    post = get_post_by_id(post_id)
    reports = list(post.reports)
    if reporter_id is not None:
        for report in reports:
            if report.reporter_id != reporter_id:
                reports.remove(report)

    return None if len(reports) == 0 else reports


def get_reports(page, limit):
    return UserReport.query.order_by(desc(UserReport.id)).limit(limit).offset(limit * page).all()


def get_report_count():
    return UserReport.query.count()


def report_user(reporter_id, post_id, reason_id):
    from controllers.post_controller import get_post_by_id
    
    if get_post_reports(post_id, reporter_id) is not None:
        return False, "Bu paylaşımı zaten ispiyonlamışsınız."
    
    user_report = UserReport(reporter_id=reporter_id, user_id=get_post_by_id(post_id).user_id, post_id=post_id, reason_id=reason_id)
    db.session.add(user_report)
    db.session.commit()

    new_report.send(user_report)
    return True, "Paylaşımı başarıyla ispiyonladınız. Teşekkürler :)"


def check_user_ip(user, country):
    if country == "TR" and (user.is_risky or user.is_risky is None):
        user.is_risky = False
        db.session.commit()
        return False

    if country == "T1":
        if user.is_risky:
            return True
        
        user.is_risky = True
        db.session.commit()
        return True
    
    if user.is_risky is not None:
        return user.is_risky

    result = event_loop.run_until_complete(is_ip_address_bad(user.ip_address))
    result = result.blacklisted

    user.is_risky = result
    db.session.commit()

    return result


def add_registered_user(username, password_hash, group):
    perm_group_id = PermissionGroup.query.filter(PermissionGroup.name == group).first().id
    registered_user = RegisteredUser(username=username, password=password_hash, permission_group_id=perm_group_id)
    
    db.session.add(registered_user)
    db.session.commit()

    return True