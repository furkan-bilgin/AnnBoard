from main import db
from datetime import datetime
from helpers.base36 import base36encode
from globals import report_reasons

class UserReport(db.Model):
    __tablename__ = "user_reports"
    
    id = db.Column(db.BigInteger, primary_key=True)
    reporter_id = db.Column(db.BigInteger, db.ForeignKey("users.id"))
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"))
    post_id = db.Column(db.BigInteger, db.ForeignKey("posts.id"))
    reason_id = db.Column(db.SmallInteger)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow) # UTC timestamp

    reporter = db.relationship("User", lazy=True, primaryjoin="User.id == UserReport.reporter_id")

    def to_dict(self):
        result = {
            "id": self.id,
            "is_comment": self.post.parent is not None,
            "post_id": base36encode(self.post_id),
            "reason": report_reasons[self.reason_id - 1][1],
            "utc_timestamp": self.timestamp.isoformat()+"Z",
            "reported_post_body": self.post.get_body(),
            "reporter_is_risky": self.reporter.is_risky
        }

        result["link"] = self.post.get_full_url()

        return result 