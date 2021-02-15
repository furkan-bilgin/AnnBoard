$(document).ready(() => {
    function submit(form, endpoint="/api/v1/submit/comment") {
        function fail(result) {
            let json = result.responseJSON;
            ModalController.renderPopup(json != null ? json.message : "Anonimce'ye bağlanılamadı. Lütfen bir süre sonra tekrar deneyin.", isError=true);
        }

        function final() {
            form.find("button").removeClass("is-loading");
        }

        $.ajax({
            url: endpoint,
            data: new FormData(form[0]),
            processData: false,
            contentType: false,
            type: "POST",
            success: function(result){
                if (!result.success) {
                    fail(result);
                    return;
                }
                if (typeof result.post.url !== "undefined") {
                    window.location.href = result.post.url;
                    return;
                }
    
                //TODO: Add pseudo post.
                $(document).trigger("refreshCurrentPost");
                $(document).trigger("refreshCaptcha");
                form.find("textarea").val(""); // Reset textarea
            },
            error: (result, status, error) => {
                fail(result);
            }
        }).always(() => final());
    }


    $(document).on("submit", "#comment-submit-form", function() {
        submit($(this));
        return false;  
    });

    $(document).on("submit", "#post-submit-form", function() {
        let currentTopic = window.location.href.split("+")[1].split("/")[0]; // QUICK HACK: Replace this with something more logical.
        submit($(this), "/api/v1/submit/topic/" + currentTopic);

        return false;
    });
});