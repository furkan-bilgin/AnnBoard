from werkzeug.utils import secure_filename
from b2sdk.v1 import *
import os


file_upload_url = os.environ["ann_file_upload_url"]

class FileStorage:
    """
        Upload the file with given name.
    """
    def upload_file(self, filename, blob):
        pass

    """
        Return the uploaded file as bytes
    """
    def get_file(self, filename):
        pass

    def delete_file(self, file_id, filename):
        pass


class LocalFileUploader(FileStorage):
    def __init__(self):
        super().__init__()

    def upload_file(self, filename, blob):
        pass
        #f = open(os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(filename)), "wb")
        #f.write(blob)
        #f.close()

    def get_file(self, filename):
        pass
        #f = open(os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(filename)), "rb")
        #return f.read(-1)

    def delete_file(self, file_id, filename):
        return True


class BackblazeFileUploader(FileStorage):
    def __init__(self):
        info = InMemoryAccountInfo()
        self.b2_api = B2Api(info)
        
        self.b2_api.authorize_account("production", os.environ["ann_backblaze_b2_app_id"], os.environ["ann_backblaze_b2_app_key"])
        self.bucket = self.b2_api.get_bucket_by_name("anonimce")

        super().__init__()
        

    def upload_file(self, filename, blob):
        file_info = self.bucket.upload_bytes(blob, "uc/" + filename)
        return file_info.id_    

    def get_file(self, filename):
        f = open(os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(filename)), "rb") #temporary, for old file support
        return f.read(-1)

    def delete_file(self, file_id, filename):
        try:
            self.b2_api.delete_file_version(file_id, filename)
            return True
        except:
            return False
        
def get_file_path(filename):
    return file_upload_url + "/" + filename
