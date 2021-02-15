from wtforms import *

class AdminDeleteForm(Form):
    reason = TextField("Sebep", [validators.Length(min=1, max=200, message="Silme sebebi 1-200 karakter arası olmalı.")])
    id = Field("id")
    
    
class AdminBanForm(Form):
    reason = TextField("Sebep", [validators.Length(min=3, max=200, message="Tekmeleme sebebi 3-200 karakter arası olmalı.")])
    id = Field("id")


class AdminAddModForm(Form):
    username = TextField(validators=[validators.Length(min=3, max=50, message="Kullanıcı adı 3-50 karakter arası olmalı.")])
    group = TextField(validators=[validators.Length(min=3, max=50, message="Grup adı 3-50 karakter arası olmalı.")])
    password = Field(validators=[validators.Length(min=5, max=500, message="Şifre gir.")])


class AdminPinUnpinForm(Form):
    id = Field("id")


class AdminDistinguishForm(Form):
    id = Field("id")


class AdminDeleteMediaForm(Form):
    id = Field("id")
