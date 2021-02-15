$(document).ready(() => {
    let POST_REFRESH_SECONDS = 5 + 1;

    let postIsLoading = false;
    let postLastData = null;
    let postRefreshSeconds = POST_REFRESH_SECONDS;
    
    let postRefreshMultiplier = 1;
    let postFetchInterval = setInterval(() => {
        if (postIsLoading)
            return;
        
        postRefreshSeconds--;
        if (postRefreshSeconds > 0)
            $("#refresh-time").html(postRefreshSeconds+" sn içinde yenilenecek.")
    
        if (postRefreshSeconds == 0) 
            fetchPost();
    }, 1000);
    
    function fetchPost(firstRefresh=false) {
        $.ajax({url: "/api/v1/null", type: "POST", success: ()=>{}}); // Browser Cache doesn't go away if we don't send at least 1 POST request, I don't know why and this needs to be researched but, it's a quick hack.

        id = $("#post").data("post-id");
        postIsLoading = true;

        if (firstRefresh)
            $("#all-post-contents").hide();
            
        function finishLoading(data) {
            $(".refresh-button").toggleClass("is-loading");
            $("#refresh-time").html("Yenilendi!");
    
            if (data != null) {
                $("#post").html(
                    typeof data === "string" ? data : PostTools.renderPost(data, clickable=false, showTopic=true)
                );
            }
    
            if (firstRefresh) { 
                $("#post-loading").fadeOut(50, () => {
                    if (firstRefresh)
                        $("#all-post-contents").fadeIn(50);
                    
                    $(document).trigger("newPost");
                });   
            }
            
            postIsLoading = false;
            postRefreshSeconds = Math.floor((POST_REFRESH_SECONDS - 1 ) * postRefreshMultiplier + 1);
        }
    
        let renderData = `<span class="has-text-centered post-warning" style="padding: 0.5rem">Böyle bir paylaşım yok.</center>`;
        $(".refresh-button").toggleClass("is-loading");
        $("#refresh-time").html("Yenileniyor...")
    
        setTimeout(() => {
            $.getJSON("/api/v1/post/"+id, (data, status) => {
                let shouldRender = true;
                var rawData = JSON.stringify(data);
    
                if (data.success) {
                    renderData = data.post;
                    PostController.registerPost(renderData);
                } else {
                    finishLoading(`<span class="has-text-centered post-warning" style="padding: 0.5rem">${data.message}</center>`);
                }
         
                if (postLastData != null && postLastData.length === rawData.length) {
                    shouldRender = false;
                    postRefreshMultiplier += 0.5;
                }
                else {
                    postRefreshMultiplier = 1;
                }
                postLastData = rawData;
        
                finishLoading(shouldRender ? renderData : null);
            }).fail(() => {
                finishLoading(renderData);
            });
        }, firstRefresh ? 0 : 200);      
    }
    
    if (typeof $("#post").data("post-id") !== "undefined") {
        fetchPost(true);
    } else {
        clearInterval(postFetchInterval);
    }

    $(document).on("click", ".refresh-button", (e) => {
        fetchPost();
        postRefreshSeconds = POST_REFRESH_SECONDS;
        postRefreshMultiplier = 1;
    }); 

    $(document).on("refreshCurrentPost", () => {
        fetchPost();
    });
});