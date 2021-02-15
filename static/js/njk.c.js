(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["modals.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["url"], 
[], 
function (l_url, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("url", l_url);
var t_2 = "";t_2 += "\r\n    <div class=\"modal is-active\">\r\n        <div class=\"modal-background\"></div>\r\n        <div class=\"modal-content\">\r\n            <p class=\"image\">\r\n                <img src=\"";
t_2 += runtime.suppressValue(l_url, env.opts.autoescape);
t_2 += "\" alt=\"\">\r\n            </p>\r\n        </div>\r\n        <button class=\"modal-close is-large\" data-close-modal=\"true\" aria-label=\"close\"></button>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("render_image_modal");
context.setVariable("render_image_modal", macro_t_1);
output += "\r\n\r\n";
var macro_t_3 = runtime.makeMacro(
["body", "id"], 
[], 
function (l_body, l_id, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("body", l_body);
frame.set("id", l_id);
var t_4 = "";t_4 += "\r\n    <div class=\"modal is-active\">\r\n        <div class=\"modal-background\"></div>\r\n        <div class=\"modal-card\">\r\n            <header class=\"modal-card-head\">\r\n                <p class=\"modal-card-title\">Sil</p>\r\n                <button data-close-modal=\"true\" class=\"delete\" aria-label=\"close\"></button>\r\n            </header>\r\n            <section class=\"modal-card-body\">\r\n                <strong>";
t_4 += runtime.suppressValue(env.getFilter("safe").call(context, l_body), env.opts.autoescape);
t_4 += "</strong><br><br>\r\n                <i class=\"las la-trash-alt remove-link\"></i> Paylaşımı silme sebebini girin: <br>\r\n                <textarea id=\"delete-post-modal-reason\" placeholder=\"Silme nedeni... (1-200 harf arası)\" class=\"textarea\" cols=\"20\" rows=\"2\"></textarea>\r\n            </section>\r\n            <footer class=\"modal-card-foot\">\r\n                <button class=\"button is-danger\" data-delete-post-confirm=\"";
t_4 += runtime.suppressValue(l_id, env.opts.autoescape);
t_4 += "\" onclick=\"$(this).toggleClass('is-loading')\">Sil</button>\r\n                <button class=\"button\" data-close-modal=\"true\">Boş ver</button>\r\n            </footer>\r\n        </div>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_4);
});
context.addExport("render_delete_modal");
context.setVariable("render_delete_modal", macro_t_3);
output += "\r\n\r\n";
var macro_t_5 = runtime.makeMacro(
["body", "id"], 
[], 
function (l_body, l_id, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("body", l_body);
frame.set("id", l_id);
var t_6 = "";t_6 += "\r\n    <div class=\"modal is-active\">\r\n        <div class=\"modal-background\"></div>\r\n        <div class=\"modal-card\">\r\n            <header class=\"modal-card-head\">\r\n                <p class=\"modal-card-title\">Tekmele</p>\r\n                <button data-close-modal=\"true\" class=\"delete\" aria-label=\"close\"></button>\r\n            </header>\r\n            <section class=\"modal-card-body\">\r\n                <strong>";
t_6 += runtime.suppressValue(env.getFilter("safe").call(context, l_body), env.opts.autoescape);
t_6 += "</strong><br><br>\r\n                <i class=\"las la-user-slash ban-link\"></i> Bu kullanıcıyı <strong>tekmeleme</strong> sebebini girin. (bir daha asla paylaşım yapamayacak): <br>\r\n                <textarea id=\"ban-user-modal-reason\" placeholder=\"Tekmeleme nedeni... (3-200 harf arası)\" class=\"textarea\" cols=\"20\" rows=\"2\"></textarea>\r\n            </section>\r\n            <footer class=\"modal-card-foot\">\r\n                <button class=\"button is-danger\" data-ban-user-confirm=\"";
t_6 += runtime.suppressValue(l_id, env.opts.autoescape);
t_6 += "\" onclick=\"$(this).toggleClass('is-loading')\">Tekmele</button>\r\n                <button class=\"button\" data-close-modal=\"true\">Boş ver</button>\r\n            </footer>\r\n        </div>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("render_ban_modal");
context.setVariable("render_ban_modal", macro_t_5);
output += "\r\n\r\n";
var macro_t_7 = runtime.makeMacro(
["body", "is_error"], 
[], 
function (l_body, l_is_error, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("body", l_body);
frame.set("is_error", l_is_error);
var t_8 = "";t_8 += "\r\n    <div class=\"modal is-active\">\r\n        <div class=\"modal-background\"></div>\r\n        <div class=\"modal-card\">\r\n            <header class=\"modal-card-head\">\r\n                <p class=\"modal-card-title\">\r\n                    ";
if(l_is_error) {
t_8 += "\r\n                        Hata\r\n                    ";
;
}
else {
t_8 += "\r\n                        Bilgi\r\n                    ";
;
}
t_8 += "\r\n                </p>\r\n                <button data-close-modal=\"true\" class=\"delete\" aria-label=\"close\"></button>\r\n            </header>\r\n            <section class=\"modal-card-body\">\r\n                ";
t_8 += runtime.suppressValue(env.getFilter("safe").call(context, l_body), env.opts.autoescape);
t_8 += " \r\n            </section>\r\n            <footer class=\"modal-card-foot\">\r\n                <button class=\"button";
if(l_is_error) {
t_8 += " is-danger";
;
}
t_8 += "\" data-close-modal=\"true\">Tamam</button>\r\n            </footer>\r\n        </div>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("render_popup");
context.setVariable("render_popup", macro_t_7);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["moderationTools.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["post"], 
[], 
function (l_post, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("post", l_post);
var t_2 = "";t_2 += "\r\n    ";
if(runtime.contextOrFrameLookup(context, frame, "permissions")) {
t_2 += "\r\n        <button class=\"button\" onclick=\"$('#mod-buttons-";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "').toggle(); $(this).toggle(); return false;\" style=\"width: 20px; height: 30px\"><i class=\"las la-gavel\" style=\"color: green\"></i></button>\r\n\r\n        <span id=\"mod-buttons-";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\" style=\"display: none\">\r\n            <span class=\"small-padding\"></span>\r\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "permissions")),"canDelete")) {
t_2 += "\r\n                <a href=\"javascript:void(0)\" class=\"remove-link\" \r\n                data-tooltip=\"Bu gönderiyi sil\"\r\n                data-delete-post=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                    <i class=\"las la-trash-alt\"></i>\r\n                </a>   \r\n            ";
;
}
t_2 += "\r\n            \r\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "permissions")),"canBan")) {
t_2 += "\r\n                <a href=\"javascript:void(0)\" class=\"ban-link\" \r\n                data-tooltip=\"Göndereni tekmele\"\r\n                data-ban-user=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                    <i class=\"las la-user-slash\"></i>\r\n                </a> \r\n            ";
;
}
t_2 += "\r\n\r\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "permissions")),"canDelete") && runtime.memberLookup((l_post),"media_url")) {
t_2 += "\r\n                <a href=\"javascript:void(0)\" class=\"remove-link\" \r\n                data-tooltip=\"Medyayı sil\"\r\n                data-delete-media=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                    <i class=\"las la-photo-video\"></i>\r\n                </a>   \r\n            ";
;
}
t_2 += "\r\n            \r\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "permissions")),"pinPosts")) {
t_2 += "\r\n                ";
if(!runtime.memberLookup((l_post),"is_pinned")) {
t_2 += "\r\n                    <a href=\"javascript:void(0)\" class=\"pin-link\" \r\n                    data-tooltip=\"Paylaşımı sabitle\"\r\n                    data-pin-post=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                        <i class=\"las la-thumbtack\"></i>\r\n                    </a> \r\n                ";
;
}
else {
t_2 += "\r\n                    <a href=\"javascript:void(0)\" class=\"unpin-link\" \r\n                    data-tooltip=\"Sabitlemeyi kaldır\"\r\n                    data-unpin-post=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                        <i class=\"las la-thumbtack\"></i>\r\n                    </a> \r\n                ";
;
}
t_2 += "\r\n            ";
;
}
t_2 += "\r\n\r\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "permissions")),"distinguish")) {
t_2 += "\r\n                ";
if(runtime.memberLookup((l_post),"username") == "Anonim") {
t_2 += "\r\n                    <a href=\"javascript:void(0)\" class=\"distinguish-link\" \r\n                    data-tooltip=\"Modluğu belli et\"\r\n                    data-distinguish-post=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                        <i class=\"las la-shield-alt\"></i>\r\n                    </a> \r\n                ";
;
}
else {
t_2 += "\r\n                    <a href=\"javascript:void(0)\" class=\"undistinguish-link\" \r\n                    data-tooltip=\"Belli edilmeyi kaldır\"\r\n                    data-undistinguish-post=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_post),"id"), env.opts.autoescape);
t_2 += "\">\r\n                        <i class=\"las la-shield-alt\"></i>\r\n                    </a> \r\n                ";
;
}
t_2 += "\r\n            ";
;
}
t_2 += "\r\n        </span>\r\n    ";
;
}
t_2 += "\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("render_mod_tools");
context.setVariable("render_mod_tools", macro_t_1);
output += "\r\n\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["navigation.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["current", "to"], 
[], 
function (l_current, l_to, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("current", l_current);
frame.set("to", l_to);
var t_2 = "";t_2 += "\r\n    <div class=\"select select-navigation\">\r\n        <select id=\"navigation\">\r\n            ";
frame = frame.push();
var t_5 = (lineno = 3, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [1,l_to + 2]));
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("i", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\r\n                ";
if(l_current === t_6) {
t_2 += "\r\n                    <option selected=\"selected\">";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "</option>\r\n                ";
;
}
else {
t_2 += "\r\n                    <option>";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "</option>\r\n                ";
;
}
t_2 += "\r\n            ";
;
}
}
frame = frame.pop();
t_2 += "\r\n        </select>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("render_navigation");
context.setVariable("render_navigation", macro_t_1);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["post.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("utils.html", false, "post.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_topic")) {
var t_4 = t_1.render_topic;
} else {
cb(new Error("cannot import 'render_topic'")); return;
}
context.setVariable("render_topic", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "render_media")) {
var t_5 = t_1.render_media;
} else {
cb(new Error("cannot import 'render_media'")); return;
}
context.setVariable("render_media", t_5);
if(Object.prototype.hasOwnProperty.call(t_1, "render_report_link")) {
var t_6 = t_1.render_report_link;
} else {
cb(new Error("cannot import 'render_report_link'")); return;
}
context.setVariable("render_report_link", t_6);
if(Object.prototype.hasOwnProperty.call(t_1, "render_reply_link")) {
var t_7 = t_1.render_reply_link;
} else {
cb(new Error("cannot import 'render_reply_link'")); return;
}
context.setVariable("render_reply_link", t_7);
output += "\r\n";
env.getTemplate("moderationTools.html", false, "post.html", false, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
t_8.getExported(function(t_10,t_8) {
if(t_10) { cb(t_10); return; }
if(Object.prototype.hasOwnProperty.call(t_8, "render_mod_tools")) {
var t_11 = t_8.render_mod_tools;
} else {
cb(new Error("cannot import 'render_mod_tools'")); return;
}
context.setVariable("render_mod_tools", t_11);
output += "\r\n\r\n";
var macro_t_12 = runtime.makeMacro(
["comment", "can_reply"], 
[], 
function (l_comment, l_can_reply, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("comment", l_comment);
frame.set("can_reply", l_can_reply);
var t_13 = "";t_13 += "\r\n    <div class=\"post-contents\" id=\"comment-";
t_13 += runtime.suppressValue(runtime.memberLookup((l_comment),"id"), env.opts.autoescape);
t_13 += "\" data-post-id=\"";
t_13 += runtime.suppressValue(runtime.memberLookup((l_comment),"id"), env.opts.autoescape);
t_13 += "\" style=\"padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;\">\r\n        ";
if(runtime.memberLookup((l_comment),"is_pinned")) {
t_13 += "\r\n            <i class=\"las la-thumbtack\" style=\"color: green\" aria-hidden=\"true\"></i>\r\n        ";
;
}
t_13 += "\r\n\r\n        ";
if(runtime.memberLookup((l_comment),"username") === "Moderatör") {
t_13 += "\r\n            ";
var t_14;
t_14 = "style=\"color: green\"";
frame.set("ann_style", t_14, true);
if(frame.topLevel) {
context.setVariable("ann_style", t_14);
}
if(frame.topLevel) {
context.addExport("ann_style", t_14);
}
t_13 += "\r\n            <i class=\"las la-shield-alt\" style=\"color: green\" aria-hidden=\"true\"></i>    \r\n        ";
;
}
t_13 += "\r\n\r\n        <span class=\"post-sender\"><strong ";
t_13 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "ann_style")), env.opts.autoescape);
t_13 += ">";
t_13 += runtime.suppressValue(runtime.memberLookup((l_comment),"username"), env.opts.autoescape);
t_13 += "</strong> • @";
t_13 += runtime.suppressValue(runtime.memberLookup((l_comment),"id"), env.opts.autoescape);
t_13 += " • ";
t_13 += runtime.suppressValue((lineno = 14, colno = 134, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "to_readable_date"), "to_readable_date", context, [runtime.memberLookup((l_comment),"utc_timestamp")])), env.opts.autoescape);
t_13 += "</span>\r\n        \r\n        <span class=\"post-warning\"></span>\r\n        <div class=\"post-moderation-tools is-pulled-right is-vcentered\" data-id=\"";
t_13 += runtime.suppressValue(runtime.memberLookup((l_comment),"id"), env.opts.autoescape);
t_13 += "\">\r\n            \r\n            ";
t_13 += runtime.suppressValue((lineno = 19, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_report_link"), "render_report_link", context, [runtime.memberLookup((l_comment),"base36")])), env.opts.autoescape);
t_13 += " \r\n            \r\n            ";
if(l_can_reply) {
t_13 += " \r\n                ";
t_13 += runtime.suppressValue((lineno = 22, colno = 36, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_reply_link"), "render_reply_link", context, [runtime.memberLookup((l_comment),"id")])), env.opts.autoescape);
t_13 += "\r\n            ";
;
}
t_13 += "\r\n            ";
t_13 += runtime.suppressValue((lineno = 24, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_mod_tools"), "render_mod_tools", context, [l_comment])), env.opts.autoescape);
t_13 += "\r\n        </div>\r\n        ";
t_13 += runtime.suppressValue((lineno = 26, colno = 23, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_media"), "render_media", context, [l_comment])), env.opts.autoescape);
t_13 += "\r\n        <div class=\"post-body\">\r\n            ";
t_13 += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 28, colno = 34, runtime.callWrap(runtime.memberLookup((l_comment),"format_body"), "comment[\"format_body\"]", context, []))), env.opts.autoescape);
t_13 += "\r\n        </div>\r\n    </div>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_13);
});
context.addExport("render_comment");
context.setVariable("render_comment", macro_t_12);
output += "\r\n\r\n\r\n";
var macro_t_15 = runtime.makeMacro(
["data", "clickable"], 
["show_topic"], 
function (l_data, l_clickable, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data", l_data);
frame.set("clickable", l_clickable);
frame.set("show_topic", Object.prototype.hasOwnProperty.call(kwargs, "show_topic") ? kwargs["show_topic"] : runtime.contextOrFrameLookup(context, frame, "True"));var t_16 = "";t_16 += " \r\n\r\n    ";
var t_17;
t_17 = "/+" + runtime.memberLookup((l_data),"topic") + "/" + runtime.memberLookup((l_data),"base36");
frame.set("post_url", t_17, true);
if(frame.topLevel) {
context.setVariable("post_url", t_17);
}
if(frame.topLevel) {
context.addExport("post_url", t_17);
}
t_16 += "\r\n    ";
if(l_clickable) {
t_16 += "\r\n    <div class=\"clickable-post\" data-post-url=\"";
t_16 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "post_url"), env.opts.autoescape);
t_16 += "\">\r\n    ";
;
}
t_16 += "\r\n    <section class=\"hero post\" data-post-id=\"";
t_16 += runtime.suppressValue(runtime.memberLookup((l_data),"id"), env.opts.autoescape);
t_16 += "\">\r\n        <div class=\"post-contents\">\r\n\r\n            ";
if(runtime.memberLookup((l_data),"is_pinned")) {
t_16 += "\r\n                <i class=\"las la-thumbtack\" style=\"color: green\" aria-hidden=\"true\"></i>\r\n            ";
;
}
t_16 += "\r\n\r\n            ";
if(runtime.contextOrFrameLookup(context, frame, "show_topic")) {
t_16 += "\r\n            ";
t_16 += runtime.suppressValue((lineno = 48, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_topic"), "render_topic", context, [runtime.memberLookup((l_data),"topic"),"upper-post-topic"])), env.opts.autoescape);
t_16 += "\r\n            <span class=\"small-padding\"></span>\r\n            ";
;
}
t_16 += "\r\n\r\n           \r\n            ";
if(runtime.memberLookup((l_data),"title")) {
t_16 += "\r\n                <span class=\"post-title\">";
t_16 += runtime.suppressValue(runtime.memberLookup((l_data),"title"), env.opts.autoescape);
t_16 += "</span>\r\n                •\r\n            ";
;
}
t_16 += "\r\n            \r\n            ";
if(runtime.memberLookup((l_data),"username") === "Moderatör") {
t_16 += "\r\n                ";
var t_18;
t_18 = "style=\"color: green\"";
frame.set("ann_style", t_18, true);
if(frame.topLevel) {
context.setVariable("ann_style", t_18);
}
if(frame.topLevel) {
context.addExport("ann_style", t_18);
}
t_16 += "\r\n                <i class=\"las la-shield-alt\" style=\"color: green\" aria-hidden=\"true\"></i>    \r\n            ";
;
}
t_16 += "\r\n            <span class=\"post-sender\">\r\n                \r\n                <strong ";
t_16 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "ann_style")), env.opts.autoescape);
t_16 += ">";
t_16 += runtime.suppressValue(runtime.memberLookup((l_data),"username"), env.opts.autoescape);
t_16 += "</strong> \r\n                • \r\n                ";
t_16 += runtime.suppressValue((lineno = 66, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "to_readable_date"), "to_readable_date", context, [runtime.memberLookup((l_data),"utc_timestamp")])), env.opts.autoescape);
t_16 += "\r\n            </span>\r\n            <span class=\"post-warning\"></span>\r\n            <div class=\"post-moderation-tools is-pulled-right is-vcentered\" data-id=\"";
t_16 += runtime.suppressValue(runtime.memberLookup((l_data),"id"), env.opts.autoescape);
t_16 += "\"> \r\n                ";
t_16 += runtime.suppressValue((lineno = 70, colno = 37, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_report_link"), "render_report_link", context, [runtime.memberLookup((l_data),"base36")])), env.opts.autoescape);
t_16 += "\r\n                ";
t_16 += runtime.suppressValue((lineno = 71, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_mod_tools"), "render_mod_tools", context, [l_data])), env.opts.autoescape);
t_16 += "\r\n            </div>\r\n            ";
t_16 += runtime.suppressValue((lineno = 73, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_media"), "render_media", context, [l_data])), env.opts.autoescape);
t_16 += "\r\n\r\n            <div class=\"post-body\">\r\n                ";
t_16 += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 76, colno = 35, runtime.callWrap(runtime.memberLookup((l_data),"format_body"), "data[\"format_body\"]", context, []))), env.opts.autoescape);
t_16 += "\r\n            </div>\r\n            \r\n        </div>\r\n        ";
var t_19;
t_19 = runtime.memberLookup((l_data),"comment_count") - env.getFilter("length").call(context, runtime.memberLookup((l_data),"comments"));
frame.set("msg_count", t_19, true);
if(frame.topLevel) {
context.setVariable("msg_count", t_19);
}
if(frame.topLevel) {
context.addExport("msg_count", t_19);
}
t_16 += "\r\n        ";
if(runtime.memberLookup((l_data),"comments")) {
t_16 += "\r\n            <hr>\r\n            ";
if(runtime.memberLookup((l_data),"has_less_comments") && runtime.contextOrFrameLookup(context, frame, "msg_count") > 0) {
t_16 += "\r\n                <div class=\"post-contents\"> <a data-post-show-more=\"";
t_16 += runtime.suppressValue(runtime.memberLookup((l_data),"id"), env.opts.autoescape);
t_16 += "\" href=\"javascript:void(0)\">Öncesini gör (";
t_16 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "msg_count"), env.opts.autoescape);
t_16 += " mesaj)</a> </div>\r\n            ";
;
}
else {
t_16 += "\r\n                <div style=\"padding: .5rem\"></div>\r\n            ";
;
}
t_16 += "\r\n\r\n            ";
frame = frame.push();
var t_22 = runtime.memberLookup((l_data),"comments");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("element", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_16 += "\r\n                ";
t_16 += runtime.suppressValue((lineno = 90, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_comment"), "render_comment", context, [t_23,(!l_clickable)])), env.opts.autoescape);
t_16 += "\r\n            ";
;
}
}
frame = frame.pop();
t_16 += "      \r\n        ";
;
}
t_16 += "\r\n    </section>\r\n\r\n    ";
if(l_clickable) {
t_16 += "\r\n    </div>\r\n    ";
;
}
t_16 += "\r\n    ";
if(runtime.memberLookup((l_data),"is_pinned") && runtime.memberLookup((l_data),"has_less_comments")) {
t_16 += "\r\n    <hr>\r\n    ";
;
}
t_16 += "\r\n\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_16);
});
context.addExport("render_post");
context.setVariable("render_post", macro_t_15);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["removed.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("navigation.html", false, "removed.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_navigation")) {
var t_4 = t_1.render_navigation;
} else {
cb(new Error("cannot import 'render_navigation'")); return;
}
context.setVariable("render_navigation", t_4);
output += "\r\n\r\n";
var macro_t_5 = runtime.makeMacro(
["data"], 
[], 
function (l_data, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data", l_data);
var t_6 = "";t_6 += "\r\n    <tr>\r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"id"), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n      \r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.memberLookup((l_data),"post")),"body")), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n\r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"reason"), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n\r\n       <th>\r\n        ";
t_6 += runtime.suppressValue((lineno = 17, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "to_readable_date"), "to_readable_date", context, [runtime.memberLookup((l_data),"utc_timestamp")])), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n\r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"moderator"), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n    </tr>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("render_removed_user_content");
context.setVariable("render_removed_user_content", macro_t_5);
output += "\r\n\r\n";
var macro_t_7 = runtime.makeMacro(
["data_list"], 
[], 
function (l_data_list, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data_list", l_data_list);
var t_8 = "";t_8 += "\r\n<table class=\"table\" style=\"font-size: 1rem; width: 100%\">\r\n  <thead>\r\n    <tr>\r\n      <th>#</th>\r\n      <th>İçerik</th>\r\n      <th>Sebep</th>\r\n      <th>Tarih</th>\r\n      <th>Moderatör</th>\r\n    </tr>\r\n  </thead>\r\n  <tfoot>\r\n    ";
frame = frame.push();
var t_11 = l_data_list;
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("data", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
t_8 += "\r\n        ";
t_8 += runtime.suppressValue((lineno = 39, colno = 38, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_removed_user_content"), "render_removed_user_content", context, [t_12])), env.opts.autoescape);
t_8 += "\r\n    ";
;
}
}
frame = frame.pop();
t_8 += "\r\n  </tbody>\r\n</table>\r\n\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("render_removed_user_content_table");
context.setVariable("render_removed_user_content_table", macro_t_7);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderBanModal.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("modals.html", false, "renderBanModal.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_ban_modal")) {
var t_4 = t_1.render_ban_modal;
} else {
cb(new Error("cannot import 'render_ban_modal'")); return;
}
context.setVariable("render_ban_modal", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 19, runtime.callWrap(t_4, "render_ban_modal", context, [runtime.contextOrFrameLookup(context, frame, "body"),runtime.contextOrFrameLookup(context, frame, "id")])), env.opts.autoescape);
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderComment.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("post.html", false, "renderComment.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_comment")) {
var t_4 = t_1.render_comment;
} else {
cb(new Error("cannot import 'render_comment'")); return;
}
context.setVariable("render_comment", t_4);
output += "\r\n\r\n<section class=\"hero post\" style=\"padding: 0.25rem\"> \r\n    <div style=\"padding: .5rem\"></div>\r\n    ";
if(runtime.contextOrFrameLookup(context, frame, "comment")) {
output += "\r\n        ";
output += runtime.suppressValue((lineno = 5, colno = 25, runtime.callWrap(t_4, "render_comment", context, [runtime.contextOrFrameLookup(context, frame, "comment"),false])), env.opts.autoescape);
output += "\r\n    ";
;
}
else {
output += "\r\n        ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "comments");
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("comment", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n            ";
output += runtime.suppressValue((lineno = 8, colno = 29, runtime.callWrap(t_4, "render_comment", context, [t_8,false])), env.opts.autoescape);
output += "\r\n        ";
;
}
}
frame = frame.pop();
output += "\r\n    ";
;
}
output += "\r\n</section>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderDeleteModal.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("modals.html", false, "renderDeleteModal.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_delete_modal")) {
var t_4 = t_1.render_delete_modal;
} else {
cb(new Error("cannot import 'render_delete_modal'")); return;
}
context.setVariable("render_delete_modal", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 22, runtime.callWrap(t_4, "render_delete_modal", context, [runtime.contextOrFrameLookup(context, frame, "body"),runtime.contextOrFrameLookup(context, frame, "id")])), env.opts.autoescape);
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderGreenText.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<span class=\"green-text\">>";
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "body")), env.opts.autoescape);
output += "</span>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderImageModal.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("modals.html", false, "renderImageModal.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_image_modal")) {
var t_4 = t_1.render_image_modal;
} else {
cb(new Error("cannot import 'render_image_modal'")); return;
}
context.setVariable("render_image_modal", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 21, runtime.callWrap(t_4, "render_image_modal", context, [runtime.contextOrFrameLookup(context, frame, "url")])), env.opts.autoescape);
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderLink.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "url"), env.opts.autoescape);
output += "\" target=\"_blank\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "url"), env.opts.autoescape);
output += "</a>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderMention.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<a class=\"focus-comment-link\" data-id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\">@";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</a>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderNavigation.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("navigation.html", false, "renderNavigation.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_navigation")) {
var t_4 = t_1.render_navigation;
} else {
cb(new Error("cannot import 'render_navigation'")); return;
}
context.setVariable("render_navigation", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 20, runtime.callWrap(t_4, "render_navigation", context, [runtime.contextOrFrameLookup(context, frame, "current_page"),runtime.contextOrFrameLookup(context, frame, "page_count")])), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderPopup.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("modals.html", false, "renderPopup.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_popup")) {
var t_4 = t_1.render_popup;
} else {
cb(new Error("cannot import 'render_popup'")); return;
}
context.setVariable("render_popup", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 15, runtime.callWrap(t_4, "render_popup", context, [runtime.contextOrFrameLookup(context, frame, "body"),runtime.contextOrFrameLookup(context, frame, "is_error")])), env.opts.autoescape);
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderPost.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("post.html", false, "renderPost.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_post")) {
var t_4 = t_1.render_post;
} else {
cb(new Error("cannot import 'render_post'")); return;
}
context.setVariable("render_post", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 14, runtime.callWrap(t_4, "render_post", context, [runtime.contextOrFrameLookup(context, frame, "post"),runtime.contextOrFrameLookup(context, frame, "clickable"),runtime.contextOrFrameLookup(context, frame, "show_topic")])), env.opts.autoescape);
output += "\r\n";
if(runtime.contextOrFrameLookup(context, frame, "is_prerendered")) {
output += "\r\n    ";
var t_5;
t_5 = "/+" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"topic") + "/" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"base36");
frame.set("post_url", t_5, true);
if(frame.topLevel) {
context.setVariable("post_url", t_5);
}
if(frame.topLevel) {
context.addExport("post_url", t_5);
}
output += "\r\n    <a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "post_url"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "post_url"), env.opts.autoescape);
output += "</a>\r\n";
;
}
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderPostMoreLoading.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"loader is-loading\"></div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderRemovedUserContentTable.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("removed.html", false, "renderRemovedUserContentTable.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_removed_user_content_table")) {
var t_4 = t_1.render_removed_user_content_table;
} else {
cb(new Error("cannot import 'render_removed_user_content_table'")); return;
}
context.setVariable("render_removed_user_content_table", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 36, runtime.callWrap(t_4, "render_removed_user_content_table", context, [runtime.contextOrFrameLookup(context, frame, "list")])), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["renderReportTable.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("report.html", false, "renderReportTable.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_report_table")) {
var t_4 = t_1.render_report_table;
} else {
cb(new Error("cannot import 'render_report_table'")); return;
}
context.setVariable("render_report_table", t_4);
output += "\r\n\r\n";
output += runtime.suppressValue((lineno = 2, colno = 22, runtime.callWrap(t_4, "render_report_table", context, [runtime.contextOrFrameLookup(context, frame, "list")])), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["report.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("navigation.html", false, "report.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "render_navigation")) {
var t_4 = t_1.render_navigation;
} else {
cb(new Error("cannot import 'render_navigation'")); return;
}
context.setVariable("render_navigation", t_4);
output += "\r\n\r\n";
var macro_t_5 = runtime.makeMacro(
["data"], 
[], 
function (l_data, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data", l_data);
var t_6 = "";t_6 += "\r\n    <tr>\r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"id"), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n\r\n      <th>\r\n        ";
if(runtime.memberLookup((l_data),"is_comment")) {
t_6 += "\r\n            Yorum\r\n        ";
;
}
else {
t_6 += "\r\n            Paylaşım\r\n        ";
;
}
t_6 += "\r\n      </th>\r\n      \r\n      <th>\r\n        <a href=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"link"), env.opts.autoescape);
t_6 += "\">";
t_6 += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((l_data),"reported_post_body")), env.opts.autoescape);
t_6 += "</a>\r\n      </th>\r\n\r\n      <th>\r\n        ";
t_6 += runtime.suppressValue(runtime.memberLookup((l_data),"reason"), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n\r\n      <th>\r\n        ";
if(runtime.memberLookup((l_data),"reporter_is_risky")) {
t_6 += "\r\n            Evet\r\n        ";
;
}
else {
t_6 += "\r\n            Hayır\r\n        ";
;
}
t_6 += "\r\n      </th>\r\n\r\n       <th>\r\n        ";
t_6 += runtime.suppressValue((lineno = 33, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "to_readable_date"), "to_readable_date", context, [runtime.memberLookup((l_data),"utc_timestamp")])), env.opts.autoescape);
t_6 += "\r\n      </th>\r\n    </tr>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("render_report");
context.setVariable("render_report", macro_t_5);
output += "\r\n\r\n";
var macro_t_7 = runtime.makeMacro(
["data_list"], 
[], 
function (l_data_list, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data_list", l_data_list);
var t_8 = "";t_8 += "\r\n<table class=\"table\" style=\"font-size: 1rem; width: 100%\">\r\n  <thead>\r\n    <tr>\r\n      <th>#</th>\r\n      <th><abbr title=\"Yorum ya da Paylaşım\" data-tooltip=\"Yorum ya da Paylaşım\">Tür</abbr></th>\r\n      <th>İçerik</th>\r\n      <th>Sebep</th>\r\n      <th><abbr title=\"İspiyonlayan riskli mi?\" data-tooltip=\"İspiyonlayan riskli mi?\">İRM</abbr></th>\r\n      <th>Tarih</th>\r\n    </tr>\r\n  </thead>\r\n  <tfoot>\r\n    ";
frame = frame.push();
var t_11 = l_data_list;
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("data", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
t_8 += "\r\n        ";
t_8 += runtime.suppressValue((lineno = 52, colno = 24, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "render_report"), "render_report", context, [t_12])), env.opts.autoescape);
t_8 += "\r\n    ";
;
}
}
frame = frame.pop();
t_8 += "\r\n  </tbody>\r\n</table>\r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("render_report_table");
context.setVariable("render_report_table", macro_t_7);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["userLoginData.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
if(runtime.contextOrFrameLookup(context, frame, "data")) {
output += "\r\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"username"), env.opts.autoescape);
output += "\r\n    <span style=\"width:1rem\"></span>\r\n    <button onclick=\"localStorage.clear(); window.location.href='/admin/oturumu-kapat'\" class=\"button\">Çıkış Yap</button> &nbsp;\r\n    <button onclick=\"window.location.href='/admin/anasayfa'\" class=\"button\">Panele Gir</button>\r\n";
;
}
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["utils.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["data", "additional_class"], 
["href"], 
function (l_data, l_additional_class, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data", l_data);
frame.set("additional_class", l_additional_class);
frame.set("href", Object.prototype.hasOwnProperty.call(kwargs, "href") ? kwargs["href"] : null);var t_2 = "";if(env.getTest("null").call(context, runtime.contextOrFrameLookup(context, frame, "href")) === true) {
t_2 += "\r\n    ";
var t_3;
t_3 = "/+" + l_data + "/";
frame.set("href", t_3, true);
if(frame.topLevel) {
context.setVariable("href", t_3);
}
if(frame.topLevel) {
context.addExport("href", t_3);
}
t_2 += "\r\n";
;
}
t_2 += "\r\n<a href=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "href"), env.opts.autoescape);
t_2 += "\" class=\"topic-link ";
t_2 += runtime.suppressValue(l_additional_class, env.opts.autoescape);
t_2 += "\">+";
t_2 += runtime.suppressValue(l_data, env.opts.autoescape);
t_2 += " <!--<sup>0</sup> TODO: Showing post count like this could be cool? --></a>";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("render_topic");
context.setVariable("render_topic", macro_t_1);
output += "\r\n\r\n";
var macro_t_4 = runtime.makeMacro(
["data"], 
[], 
function (l_data, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("data", l_data);
var t_5 = "";var t_6;
t_6 = /\.mp4$/g;
frame.set("regExp", t_6, true);
if(frame.topLevel) {
context.setVariable("regExp", t_6);
}
if(frame.topLevel) {
context.addExport("regExp", t_6);
}
t_5 += "\r\n    ";
if(runtime.memberLookup((l_data),"media_url")) {
t_5 += "\r\n        <div class=\"post-media\">   \r\n        ";
if((lineno = 12, colno = 25, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "regExp")),"test"), "regExp[\"test\"]", context, [runtime.memberLookup((l_data),"media_url")]))) {
t_5 += "\r\n            <video preload=\"metadata\" src=\"";
t_5 += runtime.suppressValue(runtime.memberLookup((l_data),"media_url"), env.opts.autoescape);
t_5 += "\" controls style=\"width: 100%; height:100%\">\r\n        ";
;
}
else {
t_5 += " \r\n            <img loading=\"lazy\" src=\"";
t_5 += runtime.suppressValue(runtime.memberLookup((l_data),"media_url"), env.opts.autoescape);
t_5 += "\" style=\"max-height: 100%; max-width: 100%;\" data-launch-image-modal=\"true\"    >\r\n        ";
;
}
t_5 += "\r\n        </div>\r\n    ";
;
}
;
frame = callerFrame;
return new runtime.SafeString(t_5);
});
context.addExport("render_media");
context.setVariable("render_media", macro_t_4);
output += "\r\n\r\n \r\n";
var macro_t_7 = runtime.makeMacro(
["id"], 
[], 
function (l_id, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("id", l_id);
var t_8 = "";t_8 += "\r\n    <a class=\"report-link\" href=\"/ispiyonla/";
t_8 += runtime.suppressValue(l_id, env.opts.autoescape);
t_8 += "\" data-tooltip=\"Bu kişiyi şikayet et.\">\r\n        <i class=\"las la-flag\"></i>\r\n    </a> ";
t_8 += " \r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("render_report_link");
context.setVariable("render_report_link", macro_t_7);
output += "\r\n\r\n";
var macro_t_9 = runtime.makeMacro(
["id"], 
[], 
function (l_id, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("id", l_id);
var t_10 = "";t_10 += "\r\n    <a class=\"reply-link\" href=\"javascript:void(0)\" \r\n        data-id=\"";
t_10 += runtime.suppressValue(l_id, env.opts.autoescape);
t_10 += "\"\r\n        data-tooltip=\"Bu yoruma yanıt ver.\">\r\n        <i class=\"las la-comment-dots\"></i>\r\n    </a> ";
t_10 += "   \r\n";
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("render_reply_link");
context.setVariable("render_reply_link", macro_t_9);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

