var nunjucks = require("nunjucks");
var minify = require("html-minifier").minify;
var fs = require("fs");

// INIT TEMPLATES AND NUNJUCK 

global["window"] = {}
require("../static/js/njk.c.js");

let env = new nunjucks.Environment();
env.addGlobal("to_readable_date", (x) => x);
var minifyOptions = { collapseWhitespace: true };

let filePath = process.argv[3];
let json = JSON.parse(fs.readFileSync(filePath));
    
// INIT END

function _loopPost(post) {
    post.format_body = (x) => x;
    if (post.hasOwnProperty("comments")) {
        post.comments.forEach(element => {
            _loopPost(element);
        });
    }
}

function renderPost(post) {
    _loopPost(post);
    let render = env.render("renderPost.html", {"post": post, "clickable": false, "show_topic": true, "is_prerendered": true});
    return render;
}

if (process.argv[2] === "post") {
    console.log(
        minify(renderPost(json.post), minifyOptions)
        );
} else if (process.argv[2] === "front") {
    let result = "";
    json.posts.forEach(post => {
        result += renderPost(post);
    });

    console.log(
        minify(result, minifyOptions)
    );
}

fs.unlinkSync(filePath);
