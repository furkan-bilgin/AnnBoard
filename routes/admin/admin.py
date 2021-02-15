from forms.admin import AdminAddModForm
from models.permissions import Permissions
from helpers.decorators import requires_permission
from flask import *
from flask import current_app as app
from models import Topic, Post
from datetime import datetime, timedelta
from controllers import user_controller
from flask_login import current_user, login_user, logout_user
from forms import LoginForm

admin_blueprint = Blueprint("admin", __name__)


@admin_blueprint.route('/', methods=["GET", "POST"])
def admin_login():
    if current_user.is_authenticated:
        return redirect(url_for("admin.admin_landing_page"))

    form = LoginForm(request.form)
    if request.method == "POST":
        if form.validate():

            if not user_controller.login_registered_user(form.username.data, form.password.data):
                flash('Hatalı kullanıcı adı veya şifre girdiniz.', category="error")
                return redirect(url_for("admin.admin_login"))
            user = user_controller.get_registered_user(form.username.data)
            
            res = make_response(redirect(url_for("admin.admin_landing_page")))
            if form.remember_me.data:
                res.set_cookie("admin_token", user_controller.get_user_token(user.username), expires=datetime.now() + timedelta(days=365))

            login_user(user)
            return res

    return render_template("admin/login.html", form=form)


@admin_blueprint.route('/oturumu-kapat')
def log_out():
    if not current_user.is_authenticated:
        return redirect('/')

    current_user.clear_token()
    
    logout_user()

    resp = Response(render_template("admin/logout.html"))
    resp.set_cookie("admin_token", "", 0)

    return resp
    

@admin_blueprint.route('/anasayfa')
@requires_permission(Permissions.SEE_LANDING_PAGE)
def admin_landing_page():
    return render_template("admin/pages/landing_page.html", login_data=json.dumps({"username": current_user.username}))


@admin_blueprint.route('/ispiyonlar')
@requires_permission(Permissions.SEE_LANDING_PAGE)
def admin_reports():
    return render_template("admin/pages/reports.html")


@admin_blueprint.route('/silinenler')
@requires_permission(Permissions.REMOVE_POSTS)
def admin_removed():
    return render_template("admin/pages/removed.html")


@admin_blueprint.route('/mod-ekle')
@requires_permission(Permissions.ADD_MOD)
def admin_add_mod():
    form = AdminAddModForm(request.form)

    return render_template("admin/pages/add_mod.html", form=form)

