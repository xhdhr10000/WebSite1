var userPanelOpen = 0;

$(document).ready(function() {
    getUserInfo();
    $("#auser").hover(onUserOpen, onUserClose);
    $(".d-user-panel").hover(onUserOpen, onUserClose);
    $("#a-user-exit").click(onUserExit);
    commonResize();
    $(window).resize(commonResize);
});

function getUserInfo() {
    if (getCookie("c_nickname") != null) {
        $("#auser").html(getCookie("c_nickname"));
        $("#a-user-info").attr("href", $("#a-user-info").attr("href")+"?id="+getCookie("c_userid"));
        $("#luser").css("display", "block");
        $("#llog").css("display", "none");
        $("#lreg").css("display", "none");
    }
}

function commonResize() {
    var h=$(".dh"),
        c=$(".dc"),
        f=$(".df"),
        lu=$("#luser"),
        u=$("#auser"),
        up=$(".d-user-panel"),
        w=$(window);
    h.css({
        "width": w.width()
    });
    c.css({
        "width": w.width(),
        "height": w.height()-h.height()-f.height(),
        "top": h.height()
    });
    f.css({
        "width": w.width(),
        "top": h.height()+c.height()
    });
    up.css({
        "top": u.position().top+u.height(),
        "left": u.position().left+u.width()-up.width()
    });
}

function onUserOpen() {
    userPanelOpen++;
    $(".d-user-panel").css("display", "block");
}

function onUserClose() {
    if (--userPanelOpen == 0)
        $(".d-user-panel").css("display", "none");
}

function onUserExit() {
    setCookie("c_userid");
    setCookie("c_username");
    setCookie("c_nickname");
}

function setCookie(cname, value, exp) {
    if (value == null) {
        $.cookie(cname, null, {path: "/", expires: -1});
        location.reload();
    } else if (exp == null)
        $.cookie(cname, value, {path: "/"});
    else {
        var date = new Date();
        date.setTime(date.getTime() + exp - date.getTimezoneOffset());
        $.cookie(cname, value, {path: "/", expires: date});
    }
}

function getCookie(cname) {
    return $.cookie(cname);
    /*
    $.get("/php/cookie.php?l=c_nickname", function (data, status) {
        if (status == "success") {
            var res = new String(data);
            if (res.search("error") == -1) {
                $("#auser").html(res);
                $("#luser").css("display", "block");
                $("#llog").css("display", "none");
                $("#lreg").css("display", "none");
            }
        }
    });
    */
}
