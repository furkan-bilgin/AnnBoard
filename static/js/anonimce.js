$(document).ready(() => {
    this.currentPermissions = localStorage.getItem("permissions");
    if (this.currentPermissions)
        this.currentPermissions = JSON.parse(this.currentPermissions);

    this.nunjucksEnv = new nunjucks.Environment();
    this.nunjucksEnv.globals["permissions"] = this.currentPermissions;
    this.nunjucksEnv.globals["to_readable_date"] = (iso) => moment(iso).fromNow();
    
    allowClickWithoutParentNavigation();

    if ($(".prerendered-content").length)
        $(".prerendered-content").remove();
});

function allowClickWithoutParentNavigation() {
    $(".post a").click((e) => {
        //e.stopPropagation();
    });
    
    $(".post button").click((e) => {
        e.stopPropagation();
    });
}