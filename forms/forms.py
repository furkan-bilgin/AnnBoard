from flask_wtf.recaptcha.validators import Recaptcha
from wtforms import *
from flask_wtf import RecaptchaField
from flask_wtf.file import FileAllowed
from wtforms.widgets.core import CheckboxInput
from helpers.recaptcha import validate_recaptcha
from globals import report_reasons

class PostForm(Form):
    body = TextAreaField("Düşünce", [validators.Length(min=1, max=30000, message="1 ile 30.000 karakter arası bir yazı yazman gerekiyor.")])
    title = TextField("Başlık", [validators.Length(min=0, max=35, message="0 ile 35 karakter arası bir başlık girmen gerekiyor. (yani girmesen de olur)")] )
    media = FileField(validators=[FileAllowed(['jpg', 'jpeg', 'png', 'mp4', 'webm'], 'Sadece resim veya video yükleyebilirsiniz!')])

    recaptcha_response = HiddenField(_name="g-recaptcha-response")
    distinguish_as_mod = BooleanField(_name="distinguish-as-mod")


class CommentForm(Form):
    body = TextAreaField('Düşünce', [validators.Length(min=1, max=30000, message="1 ile 30.000 karakter arası bir yazı yazman gerekiyor.")])
    media = FileField(validators=[FileAllowed(['jpg', 'jpeg', 'png', 'mp4', 'webm'], 'Sadece resim veya video yükleyebilirsiniz!')])

    recaptcha_response = HiddenField(_name="g-recaptcha-response")
    topic_name = HiddenField()
    base36 = HiddenField()
    distinguish_as_mod = BooleanField(_name="distinguish-as-mod")


    
class ReportForm(Form):
    reason_id = SelectField(u'Sebep', choices = report_reasons, validators=[validators.required()])
    recaptcha = RecaptchaField()