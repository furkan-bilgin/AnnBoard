$(document).ready(() => {
    if (Cookies.get("admin_token") === undefined) {
        localStorage.removeItem("loginData");
        localStorage.removeItem("permissions");
    }

    let loginData = localStorage.getItem("loginData");
    if (loginData) {
        loginData = JSON.parse(loginData);
        let render = nunjucksEnv.render("userLoginData.html", {
            data: loginData
        });  
        $("#user-login-data").html(render);
    }
});