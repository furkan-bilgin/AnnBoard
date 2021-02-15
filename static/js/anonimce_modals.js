class ModalController {
    static renderModal(modalName, args) {
        let data = nunjucksEnv.render(modalName, args);
        $("body").append(data);
    
        $("[data-close-modal]").click(function() {
            ModalController.closeAllModals();
        });
    
        $(".modal-background").click(function() {
            ModalController.closeAllModals();
        });
    }
    
    static closeAllModals() {
        $(".modal").remove();
    }
    
    static renderPopup(body, isError=false) {
        ModalController.renderModal("renderPopup.html", { body: body, is_error: isError })
    }
}

$(document).ready(() => { 
    $(document).on("click", "[data-launch-image-modal]", function(e) {
        ModalController.renderModal("renderImageModal.html", { url: $(this).attr("src") });
        e.stopPropagation();
    });

    $(document).on("click", "[data-delete-post]", function(e) {
        let postId = parseInt($(this).data("delete-post"));
        ModalController.renderModal("renderDeleteModal.html", { body: PostController.getPost(postId).body, id: postId });
        e.stopPropagation();
    });   
    
    $(document).on("click", "[data-ban-user]", function(e) {
        let postId = parseInt($(this).data("ban-user"));
        ModalController.renderModal("renderBanModal.html", { body: PostController.getPost(postId).body, id: postId });
        e.stopPropagation();
    });

    $(document).on("click", ".delete", function(e) {
        $(this).parent().remove();
    });
});