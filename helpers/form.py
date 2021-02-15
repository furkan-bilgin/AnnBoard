from flask import flash

def flash_form_errors(form, category="error"):
    for fieldName, errorMessages in form.errors.items():
        for err in errorMessages:
            if "response" in err:
                err = "Ben robot değilim testini yapmanız gerekiyor."
            
            flash(err, category=category)


def get_form_errors(form):
    errors = []
    for fieldName, errorMessages in form.errors.items():
        for err in errorMessages:
            errors.append(err)

    return errors


def get_uploaded_file_size(file):
    file.seek(0,2)
    return file.tell()