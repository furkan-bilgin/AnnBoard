function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

let POST_MENTION_REGEX = /@(?<id>\d+)/gm;
let POST_GREENTEXT_REGEX = /^&gt;(.*)$/gm;
let POST_LINK_REGEX = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gm;

class PostTools {
    static formatPostBody(body) {
        body = body.replace(POST_GREENTEXT_REGEX, nunjucksEnv.render("renderGreenText.html", { "body": "$1" }));
        body = body.replace(POST_MENTION_REGEX, nunjucksEnv.render("renderMention.html", { "id": "$1" }));
        body = body.replace(POST_LINK_REGEX, nunjucksEnv.render("renderLink.html", { "url": "$1" }))

        body = body.replace(/\n/g, "<br>"); // Replace newlines with br
        
        return body;
    }

    static renderPost(post, clickable, showTopic=false) {
        let render = nunjucksEnv.render("renderPost.html", {
            post: post, 
            clickable: clickable, 
            permissions: this.permissions,
            show_topic: showTopic
        });  
     
        return render;
    }

    static renderComment(comment, comments=null) {
        let obj = { "comment": comment }
        if (comments != null) {
            obj = { "comments": comments }
        }
        
        return nunjucksEnv.render("renderComment.html", obj);
    }

    static scrollToObject(id) {
        $('html,body').animate({
          scrollTop: $(id).offset().top - 120},
          'fast');
    }
    
    static highlightObject(id, objectClass = "post-highlight") {
        let element = $(id);
        if (element.hasClass(objectClass) && isElementInViewport(element))
            return;
        
        element.addClass(objectClass);
        setTimeout(function () {
            element.removeClass(objectClass);
        }, 1000);
    }

    static focusComment(id, scroll=true) {
        if (!window.location.href.includes("+")) {
            return;
        }
        
        if (typeof id !== "string")
            window.location.hash = id;
        else
            id = id.replace("#", "");
            
        PostTools.highlightObject("#comment-"+id);
        
        if (scroll)
            PostTools.scrollToObject("#comment-"+id);
    }
}

$(document).on("newPost", function (event) {
    if (window.location.hash !== "") // Focus on comment if hash is defined
        PostTools.focusComment(window.location.hash);
});

$(document).ready(() => {
    $(document).on("click", ".clickable-post", function(e) {
        window.location.href = $(this).data("post-url");
    });

    $(document).on("click", "[data-post-show-more]", function(e) {
        e.stopPropagation();
        $(this).html(nunjucksEnv.render("renderPostMoreLoading.html"));

        let id = parseInt($(this).data("post-show-more"));
        let base36 = id.toString(36);

        PostController.fetchPost(base36, (post) => {
            PostController.getPostDom(id).replaceWith(PostTools.renderPost(post, true, true));
        });
    });

    $(document).on("click", ".focus-comment-link", function(e) { // Listen focus comment links
        PostTools.focusComment($(this).data("id"));
    });

    $(document).on("click", ".reply-link", function(e) { // Listen reply link clicks
        let id = $(this).data("id");
        let textarea = $(".textarea");
        if (!textarea.val().startsWith("@"))
            textarea.val("@" + id +" "+textarea.val());
        else
            textarea.val(textarea.val().replace(/^@([0-9]+)/, "@" + id));
            
        PostTools.scrollToObject(".textarea");
        PostTools.highlightObject(".textarea");
    });
});