$(document).ready(() => {
    function paginatedTable(templateName, target, endpoint) {
        let currentPage = 0;
        let limit = 20;
        let nav = false;

        function navigation(pageCount) {
            nav = true;
            $("#navigation").html(this.nunjucksEnv.render("renderNavigation.html", {current_page: currentPage, page_count: pageCount }))
        }

        function dump() {
            $("#post-loading").show();
            $(target).html("");
            
            $.getJSON(endpoint + "?limit="+limit+"&page="+currentPage, (result) => {
                if (!nav)
                    navigation(Math.floor(result.total / limit));
                
                let render = this.nunjucksEnv.render(templateName, { "list": result.result });
                $(target).html(render);
                $("#post-loading").hide();
            }).fail(() => {
                ModalController.renderPopup("Sunucu hatası. Lütfen sonra tekrar deneyin.");
            });
        }

        if ($(target).length) {
            dump();
            $(document).on("change", "#navigation", function() {
                let val = parseInt($(this).val()) - 1;
                if (val == currentPage || isNaN(val))
                    return;

                currentPage = val;
                dump();
            });
        }
    }

    paginatedTable("renderReportTable.html", "#dump-reports", "/admin/api/reports");
    paginatedTable("renderRemovedUserContentTable.html", "#dump-removed", "/admin/api/removed_user_content");
});