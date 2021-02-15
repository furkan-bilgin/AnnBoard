from forms.admin import AdminAddModForm, AdminDeleteMediaForm, AdminDistinguishForm, AdminPinUnpinForm
from flask import *
from flask_login import current_user
from helpers.chain_control import control
from controllers import user_controller, post_controller
from forms import AdminBanForm, AdminDeleteForm
from helpers.decorators import requires_permission
from helpers.form import get_form_errors
from models import Permissions
from .__init__ import admin_blueprint
from routes.api import paginated_result, response_json
from version import version
from datetime import datetime
import requests


@admin_blueprint.route('/api/reports', methods=["GET"])
@requires_permission(Permissions.SEE_LANDING_PAGE)
def admin_get_reports():
    return paginated_result(user_controller.get_reports, user_controller.get_report_count)


@admin_blueprint.route('/api/removed_user_content', methods=["GET"])
@requires_permission(Permissions.REMOVE_POSTS)
def admin_get_removed_user_content():
    return paginated_result(post_controller.get_removed_user_content, post_controller.get_removed_user_content_count)


@admin_blueprint.route('/api/delete', methods=["POST"])
@requires_permission(permission=Permissions.REMOVE_POSTS)
def admin_delete_post():
    form = AdminDeleteForm(request.form)

    if not form.validate():
        return response_json({ "result": False, "message": ", ".join(get_form_errors(form)) })

    success, message = post_controller.delete_user_content(int(form.id.data), current_user.id, form.reason.data)
    if success:
        message = "Paylaşım başarıyla silindi."
    else:
        message = "Paylaşım silinemedi. " + message

    return response_json({"success": success, "message": message})


@admin_blueprint.route('/api/ban', methods=["POST"])
@requires_permission(permission=Permissions.BAN_USERS)
def admin_ban_user():
    form = AdminBanForm(request.form)

    if not form.validate():
        return response_json({ "result": False, "message": ", ".join(get_form_errors(form)) })

    post = post_controller.get_post_by_id(int(form.id.data))
    if post is None:
        abort(404)

    reason = form.reason.data
    result = user_controller.ban_user(post.user_id, current_user.id, reason)

    message = "Kullanıcı tekmelendi." if result else "Kullanıcı tekmelenirken bir sorun oluştu."

    return response_json({ "success": result, "message": message })


@admin_blueprint.route('/api/version', methods=["GET"])
@requires_permission(Permissions.SEE_LANDING_PAGE)
def admin_get_version():
    v = datetime.strptime(version, "%Y%m%dT%H%M%SZ").timestamp()

    return response_json({ "success": True, "version": int(v) })


@admin_blueprint.route('/api/addmod', methods=["POST"])
@requires_permission(Permissions.ADD_MOD)
def admin_api_add_mod():
    form = AdminAddModForm(request.form)
    group = form.group.data

    if not form.validate():
        return response_json({ "result": False, "message": ", ".join(get_form_errors(form)) })

    if group == "owner":
        abort(403)

    user_controller.add_registered_user(form.username.data, form.password.data, form.group.data)
    return response_json({ "success": True, "message": "'" + form.username.data + "' kullanıcısı başarıyla eklendi." })


@admin_blueprint.route('/api/pin', methods=["POST"])
@requires_permission(Permissions.PIN_POSTS)
def admin_api_pin_post():
    form = AdminPinUnpinForm(request.form)

    post = post_controller.get_post_by_id(form.id.data)
    post_controller.pin_post(post)

    return response_json({ "success": True, "message": "Paylaşım başarıyla sabitlendi." })


@admin_blueprint.route('/api/unpin', methods=["POST"])
@requires_permission(Permissions.PIN_POSTS)
def admin_api_unpin_post():
    form = AdminPinUnpinForm(request.form)

    post = post_controller.get_post_by_id(form.id.data)
    post_controller.unpin_post(post)

    return response_json({ "success": True, "message": "Sabitlenme başarıyla kaldırıldı." })


@admin_blueprint.route('/api/distinguish', methods=["POST"])
@requires_permission(Permissions.PIN_POSTS)
def admin_api_distinguish_post():
    form = AdminDistinguishForm(request.form)

    post = post_controller.get_post_by_id(form.id.data)

    if post.author.ip_address != request.remote_addr:
        return response_json({ "success": False, "message": "Bu paylaşım sizin değil." })

    post_controller.distinguish_post_as_mod(post)

    return response_json({ "success": True, "message": "Başarıyla moderatör görüntüsü ayarlandı." })


@admin_blueprint.route('/api/undistinguish', methods=["POST"])
@requires_permission(Permissions.PIN_POSTS)
def admin_api_undistinguish_post():
    form = AdminDistinguishForm(request.form)

    post = post_controller.get_post_by_id(form.id.data)

    post_controller.undistinguish_post_as_mod(post)

    return response_json({ "success": True, "message": "Başarıyla moderatörlük görüntüsü kaldırıldı." })


@admin_blueprint.route('/api/delete/media', methods=["POST"])
@requires_permission(Permissions.PIN_POSTS)
def admin_api_delete_media():
    form = AdminDeleteMediaForm(request.form)

    post = post_controller.get_post_by_id(form.id.data)

    if post.media is None or ( post.media is not None and post.media.is_deleted()):
        return response_json({ "success": False, "message": "Bu paylaşımın medyası yok ya da zaten silinmiş." })

    post_controller.delete_user_media(post.media, current_user.id)

    return response_json({ "success": True, "message": "Medya başarıyla silindi." })


@admin_blueprint.route('/api/get_permissions', methods=["GET"])
@requires_permission(Permissions.SEE_LANDING_PAGE)
def admin_api_get_permissions():
    return response_json({ "success": True, "permissions": current_user.get_permissions() })


@admin_blueprint.route('/api/dev/export_logs')
@requires_permission(Permissions.EXPORT_LOGS)
def admin_api_export_logs():
    logs = requests.post("http://annlog:5000/export?type=" + request.args.get("type", "raw") + "&hours=" + request.args.get("hours", "24"), { "token": "uLDQf4UPrU6uDrmW59wk" })
    return logs.text