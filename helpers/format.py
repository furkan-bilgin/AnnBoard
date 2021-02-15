import re
from flask import render_template


def format_comment_body(body, comments):
    if len(comments) <= 0:
        return body
    
    ids = []
    for c in comments:
        ids.append(str(c.id))
    
    pattern = "(\W|^)@(" + ("|".join(ids)) + ")(?![0-9])"
    def replace_function(match):
        match = match.group(2)
        return render_template("content/focus_comment.html", comment_id=match)
    
    match = re.sub(pattern, replace_function, body)
    return match