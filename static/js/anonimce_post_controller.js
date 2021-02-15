class PostController {
    static registerPost(post, isComment=false) {
        PostController.posts[post.id] = post;
        
        if (!isComment)
            post.isComment = false;

        post.format_body = () => PostTools.formatPostBody(post.body);

        if (post.hasOwnProperty("comments")) {
            post.comments.forEach(element => {
                element.isComment = true;
                element.parent = post;
                PostController.registerPost(element, isComment=true);
            });
        }
    }
    
    static getPost(id) {
        return PostController.posts[id];
    }

    static fetchPost(id, callback) {
        $.getJSON("/api/v1/post/"+id, (result) => {
            PostController.registerPost(result.post);
            callback(result.post);
        }).fail(() => callback(null))
    }

    static getPostDom(id) {
        return $(`[data-post-id="${id}"]`);
    }

    static reRenderPost(id) {
        let post = PostController.getPost(id);
        if (post.isComment)
            post = post.parent;

        return PostController.getPostDom(post.id).replaceWith(PostTools.renderPost(post, false, true));
    }
}

PostController.posts = {};