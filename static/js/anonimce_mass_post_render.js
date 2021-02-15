$(document).ready(() => {
    var showTopic = true;
    var noPostText = "İlginç, burada hiç paylaşım yapılmamış. Belki de internetinde bir sorun vardır?";
    var preProcessMassPostData = (x) => x;

    function dumpPosts(endpoint="/api/v1/front", id="#dump-posts", onFinish=null) {
        function finishLoading(data) {
            $(id).html(data);
            $("#post-loading").fadeOut(50, () => {
                $(id).fadeIn(50);
            });   

            allowClickWithoutParentNavigation(); 
            if (onFinish != null)
                onFinish();
        }

        $.getJSON(endpoint, (result) => {
            data = "";
            if (result.success || result.hasOwnProperty("posts")) {
                result.posts = preProcessMassPostData(result.posts);

                result.posts.forEach(element => {
                    if (element.hasOwnProperty("topic")) { // If it's a post, just render it
                        PostController.registerPost(element); // Register post
                        data += PostTools.renderPost(element, clickable=true, showTopic=showTopic);
                        
                    } else { // If not...
                        if (element.hasOwnProperty("commentGroup")) {
                            element.commentGroup.forEach(comment => { // Register each element in commentGroup
                                PostController.registerPost(comment);
                            });

                            data += PostTools.renderComment(null, comments=element.commentGroup);
                        } else {
                            data += PostTools.renderComment(element);
                        }
                    }
                });
            } else {
                data = result.message;
            }
  
            if (data === "") {
                data = `<span class="has-text-centered" style="display: block">${noPostText}</span>`;
            }

            finishLoading(data);
        }).fail((jqXHR) => {
            let result = jqXHR.responseJSON;
            let message = "Anonimce'ye bağlanılamadı. Lütfen tekrar deneyin...";
            if (result != null && result.hasOwnProperty("message"))
                message = result.message;

            finishLoading(`<span class="error has-text-centered" style="display: block">${message}</span>`)
        });
    }
    
    if ($("#dump-posts").length) { // Does dump-posts element exist 
        let topicName = $("#dump-posts").data("topic-name");
        if (topicName) {
            showTopic = false;
            dumpPosts("/api/v1/front/" + topicName);
        }
        else {
            dumpPosts();
        } 
    }

    if ($("#dump-search-result").length) {
        noPostText = "Aradığınız şey bulunamadı.";
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        
        preProcessMassPostData = processSearchData;

        dumpPosts("/api/v1/search?q=" + q, "#dump-search-result", () => {
            $(document).trigger("searchDone");
        });
    }
});