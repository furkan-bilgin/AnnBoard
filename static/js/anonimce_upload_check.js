$(document).ready(() => {
    const fileInput = document.querySelector('#file-js input[type=file]');
    
    if (fileInput == null)
        return; 

    const acceptedFiles = [".mp4", ".gif", ".jpg", ".jpeg", ".png", ".webm", ".avi"];

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            let fileNameObj = document.querySelector('#file-js .file-name');
            const fileSize = fileInput.files[0].size / (1024 * 1024);
            
            let errorText = null;

            if (fileSize > 6) {
                errorText = "Maksimum dosya boyutu 6 mb, ama siz "+Math.ceil(fileSize)+" mb yüklemişsiniz.";
            }
            
            const fileExtension = "." + fileInput.files[0].name.split(".").pop().toLowerCase();
            if (!acceptedFiles.includes(fileExtension)) {
                errorText = fileExtension+" türü dosyaları yükleyemezsiniz. Sadece resim veya video türü dosyalar yüklenebilir.";
            }

            if (errorText !== null){
                fileNameObj = undefined;
                PostTools.highlightObject(".file-cta", "error-highlight");
                $("#file-error-text").html(errorText);
                fileInput.value = "";
                return;
            } else {
                $("#file-error-text").html("");
            } 

            if (fileNameObj != undefined)
                fileNameObj.textContent = fileInput.files[0].name;
        }
    }
});