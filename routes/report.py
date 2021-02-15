from routes import post
from flask import *
from flask import current_app as app
from controllers import post_controller, user_controller
from forms import ReportForm
from helpers.form import flash_form_errors
from helpers.base36 import base36decode

@app.route('/ispiyonla/<base36>', methods=["GET", "POST"])
def report_post(base36):
    form = ReportForm(request.form)
    post = post_controller.get_post(base36) 
    user = user_controller.get_user(request.remote_addr, country=session["country"])

    if post is None or post.is_deleted():
        abort(404)

    if user.is_banned():
        return render_template("error/you_are_banned.html")
        
    if request.method == "POST" and form.validate():
        result, message = user_controller.report_user(user.id, post.id, form.reason_id.data)
        if not result:
            flash(message, category="error")
        else:
            flash(message, category="success")

        return redirect(request.url)

    else:
        flash_form_errors(form)

    return render_template("report.html", post=post, form=form)
