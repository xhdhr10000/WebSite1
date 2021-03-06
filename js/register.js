$(document).ready(function () {
    registerResize();
    $(window).resize(registerResize);
    $("a.areg").click(function () {
        var err = false;
        var u = $("#iusername").val(),
            n = $("#inickname").val(),
            p = $("#ipassword").val(),
            r = $("#irpassword").val(),
            e = $("#iemail").val(),
            t = $("#itel").val();

        err = checkInput(u, n, p, r, e, t);
        if (!err) {
            var send = "iusername=" + u + "&inickname=" + n +
            "&ipassword=" + p + "&iemail=" + e + "&itel=" + t;
            doRegister("reg", send);
        }
    });
    $("form.freg").keypress(function (event) {
        if (event.which == 13) $("a.areg").click();
    });
});

function registerResize() {
    var h = $(".dh"),
        l = $(".dreg"),
        w = $(window);

    l.css({
        "top": h.outerHeight(),
        "left": w.innerWidth()/2-l.outerWidth()/2
    });
}

function checkInput(u, n, p, r, e, t) {
    var err = false;
    if (u.length == 0) {
        $("#stip-username").html("用户名不能为空").css("visibility", "visible");
        err = true;
    } else $("#stip-username").css("visibility", "hidden");
    if (p == 0) {
        $("#stip-password").html("密码不能为空").css("visibility", "visible");
        err = true;
    } else if (r == 0) {
        $("#stip-password").css("visibility", "hidden");
        $("#stip-rpassword").html("请再次输入密码").css("visibility", "visible");
        err = true;
    } else if (p != r) {
        $("#stip-rpassword").html("两次密码输入不同").css("visibility", "visible");
        err = true;
    } else {
        $("#stip-password").css("visibility", "hidden");
        $("#stip-rpassword").css("visibility", "hidden");
    }
    return err;
}

function doRegister(m, s) {
    $.post("/php/register.php?f=" + m, s,
    function (data, status) {
        if (status == "success") {
            var res = new String(data).toLowerCase();
            if (res.search("error") != -1)
                alert(res);
            else if (res.search("exist") != -1) {
                if (res.search("username") != -1)
                    $("#stip-username").html("用户名已存在").css("visibility", "visible");
                else
                    $("#stip-username").css("visibility", "hidden");
                if (res.search("email") != -1)
                    $("#stip-email").html("邮箱已被注册").css("visibility", "visible");
                else
                    $("#stip-email").css("visibility", "hidden");
                if (res.search("tel") != -1)
                    $("#stip-tel").html("手机已被注册").css("visibility", "visible");
                else
                    $("#stip-tel").css("visibility", "hidden");
            } else if (res.search("ok") != -1) {
                var cs = res.indexOf("username=") + 9,
                    ce = res.indexOf(";", cs);
                if (ce == -1) ce = res.length;
                setCookie("c_username", res.substring(cs,ce));

                cs = res.indexOf("nickname=") + 9;
                ce = res.indexOf(";", cs);
                if (ce == -1) ce = res.length;
                setCookie("c_nickname", res.substring(cs,ce));

                cs = res.indexOf("id=") + 3;
                ce = res.indexOf(";", cs);
                if (ce == -1) ce = res.length;
                setCookie("c_userid", res.substring(cs,ce));
                location.href = "/";
            }
        }
    });
}
