$(document).ready(function () {
    loginResize();
    $(window).resize(loginResize);
    $("a.alog").click(function () {
        var err = "";
        var u = $("#iusername").val(),
            p = $("#ipassword").val();

        err = checkInput(u, p);
        if (err)
            $("#dlog-msg").html(err).css("display", "block");
        else {
            $("#dlog-msg").css("display", "none");
            var send = "iusername="+u+"&ipassword="+p;
            doLogin(send);
        }
    });
    $("form.flog").keypress(function (event) {
        if (event.which == 13) $("a.alog").click();
    });
});

function loginResize() {
    var h=$(".dh"),
        l=$(".dlog"),
        w=$(window);

    l.css({
        "top": h.height(),
        "left": w.width()/2-l.width()/2
    });
}

function checkInput(u, p) {
    if (u.length == 0) return "请输入用户名";
    if (p.length == 0) return "请输入密码";
}

function doLogin(s) {
    $.post("/php/login.php", s,
    function (data, status) {
        if (status == "success") {
            var res = new String(data).toLowerCase();
            if (res.search("error") != -1)
                $("#dlog-msg").html("用户名/密码不正确").css("display", "block");
            else if (res.search("ok") != -1) {
                var cs = res.indexOf("username=") + 9,
                    ce = res.indexOf(";", cs);
                if (ce == -1) ce = res.length;
                setCookie("c_username", res.substring(cs,ce));

                cs = res.indexOf("nickname=") + 9;
                ce = res.indexOf(";", cs);
                if (ce == -1) ce = res.length;
                setCookie("c_nickname", res.substring(cs,ce));
                location.href = "/";
            }
        }
    });
}
