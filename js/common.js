$(document).ready(function() {
    commonResize();
    $(window).resize(commonResize);
    getCookie("c_nickname");
});

function commonResize() {
    var h=$(".dh"),
        c=$(".dc"),
        f=$(".df"),
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
    if ($.cookie(cname) != null) {
        $("#auser").html($.cookie(cname));
        $("#luser").css("display", "block");
        $("#llog").css("display", "none");
        $("#lreg").css("display", "none");
    }
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
