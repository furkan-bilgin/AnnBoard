$(document).ready(() => {
    /**
     * Send POST request to an endpoint with given data, callback "callback" function if we success.
     */
    function modAction(endpoint, data, callback, useToast=false) {
        function feedback(str, error=false){
            if (!useToast) {
                ModalController.renderPopup(str);
            } else {
                bulmaToast.toast({
                    message: str,
                    type: error ? "is-danger" : "is-success",
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                })
            }
        }
        function error(str="<strong>Bu işlem yapılırken bir hata oluştu. Lütfen bir süre sonra tekrar deneyin.</strong>") {
            feedback(str, error=true);
        }
        
        $.post(endpoint, data, (result) => {
            ModalController.closeAllModals();
            
            if (result.success) {
                feedback(result.message);
            } else {
                error(result.message); 
            }

            callback(result.success);
        }).fail(error);
    }

    /**
     * Create a click event for any element with dataId to call modAction() with custom data function
     */
    function flexibleAction(dataId, endPoint, data, action, _useToast=false) {
        $(document).on("click", "[data-" + dataId + "]", function(e) {
            let postId = parseInt($(this).data(dataId));
            e.stopPropagation();

            modAction(endPoint, data(postId), (result) => {
                action(result, postId);
            }, useToast=_useToast);
        });  
    }

    /**
     * Create a click event for any element with dataId to call flexibleAction() with it's value (must be a post id) 
     */
    function actionWithSingleId(dataId, endPoint, action) {
        flexibleAction(dataId, endPoint, (postId) => { return { "id" : postId } }, (result, postId) => {
            if (!result)
                return;
            action(postId);
            PostController.reRenderPost(postId);
        }, _useToast=true);
    } 

    // MOD TOOLS //

    flexibleAction("delete-post-confirm", "/admin/api/delete", (postId) => { 
        return { "id": postId, "reason": $("#delete-post-modal-reason").val() } 
    }, (result, postId) => {
        if (result)
            PostController.getPostDom(postId).find(".post-warning").append(" SİLİNDİ ")
    });

    flexibleAction("ban-user-confirm", "/admin/api/ban", (postId) => { 
        return { "id": postId, "reason": $("#ban-user-modal-reason").val() } 
    }, (result, postId) => {
        if (result)
            PostController.getPostDom(postId).find(".post-warning").append(" TEKMELENDİ ")
    });

    // Pinning
    actionWithSingleId("pin-post", "/admin/api/pin", (postId) => {
        PostController.getPost(postId).is_pinned = true;
    });

    actionWithSingleId("unpin-post", "/admin/api/unpin", (postId) => {
        PostController.getPost(postId).is_pinned = false;
    });

    // Distinguish
    actionWithSingleId("distinguish-post", "/admin/api/distinguish", (postId) => {
        PostController.getPost(postId).username = "Moderatör";
    });

    actionWithSingleId("undistinguish-post", "/admin/api/undistinguish", (postId) => {
        PostController.getPost(postId).username = "Anonim";
    });

    // Media
    actionWithSingleId("delete-media", "/admin/api/delete/media", (postId) => {
        PostController.getPost(postId).media_url = null;
    });

    // OTHER //

    $(document).on("click", "[name='add-moderator-button']", function(e) {
        e.preventDefault();
        let bcrypt = dcodeIO.bcrypt;
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash($("#password").val(), salt, (err, hash) => {
                console.log(hash);
                modAction("/admin/api/addmod", { "username": $("#username").val(), "password": hash, "group": $("#group").val() }, (result) => {
                    $(this).toggleClass('is-loading');
                });
            });
        });
    });
})