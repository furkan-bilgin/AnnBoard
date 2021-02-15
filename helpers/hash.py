from bcrypt import hashpw, checkpw, gensalt

def bcrypt_hash(password):
    return hashpw(password.encode("utf-8"), gensalt()).decode("utf-8")

def bcrypt_check(password, real_password):
    return checkpw(password.encode("utf-8"), real_password.encode("utf-8"))