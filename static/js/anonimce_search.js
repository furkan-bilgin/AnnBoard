function processSearchData(x) { // This is basically for grouping comments and posts together.
    let posts = {};
    let comments = [];

    x.forEach(element => { // Put posts to posts dict
        if (element.hasOwnProperty("topic")) {
            posts[element.id] = element;
        } else {
            comments.push(element);
        }
    });

    comments.forEach(element => {
        let postId = element.parent_id;
        if (!posts.hasOwnProperty(postId)) {
            return;
        }
        let post = posts[postId];

        if (!post.hasOwnProperty("comments"))
            post.comments = [];
            
        post.comments.push(element); // Add comments to their own posts, if they exist.  
        comments = comments.filter(e => e != element);
    });

    let result = $.map(posts, (v, k) => v); // Convert posts dictionary to array
    if (comments.length > 0) 
        result = result.concat([{ commentGroup: comments }]); // Add the leftover comments to their own comment group.

    return result;

}

$(document).ready(() => {
    $('#search-bar').on("keypress", function (e) {
        if(e.which === 13){
            if ($(this).val() === "")
                return;
                
            $(this).attr("disabled", "disabled");
            
            window.location.href = "/ara?q=" + $(this).val();
        }
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    $(document).on("searchDone", () => {
        $(".post-body").mark(query, { separateWordSearch: false });
    });

    if (window.location.pathname == "/ara") {
        $("#search-bar").val(query);
        $("section").show();
        $("#search-title").html(`<strong>"${query}"</strong> arama sonuçları`)
    }
});