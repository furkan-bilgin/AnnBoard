from wtforms import *

class LoginForm(Form):
    username = TextField("Kullanıcı Adı", [validators.Length(min=1, max=20, message="Kullanıcı adı 1-20 karakter arası olmalı.")])
    password = TextField("Şifre", [validators.Length(min=1, max=40, message="Şifre 1-40 karakter arası olmalı.")])
    remember_me = BooleanField("Beni Hatırla")