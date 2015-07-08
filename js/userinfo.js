var cax = -1, cay = -1, mx, my;

$(document).ready(function() {
    loadUserInfo();
    $(".a-user-avatar").hover(function() {
        $(".s-change-avatar").toggle();
    });
    $(".a-user-avatar").click(function() {
        var w = $(window),
            d = $(".d-change-avatar-container");
        d.toggle();
        d.css({
            "left": (w.width()-d.width())/2,
            "top": (w.height()-d.height())/2
        });
    });
    $(".a-ca-close").click(function() {
        $(".d-change-avatar-container").hide();
    });
    $(".a-ca-cancel").click(function() {
        $(".d-change-avatar-container").hide();
    });
    $(".d-ca-title").mousedown(function(e) {
        cax = $(".d-change-avatar-container").position().left;
        cay = $(".d-change-avatar-container").position().top;
        mx = e.pageX;
        my = e.pageY;
        return false;
    });
    $(window).mouseup(function() {
        if (cax != -1 && cay != -1) {
            cax = cay = -1;
            return false;
        }
    });
    $(window).mousemove(function(e) {
        if (cax != -1 && cay != -1) {
            var c = $(".d-change-avatar-container");
            c.css({
                "left": cax + e.pageX - mx,
                "top": cay + e.pageY - my
            });
            return false;
        }
    });

    $(".a-ca-upload").click(function() {
        $(".i-ca-file").click();
    });
    $("#f-upload").submit(function() {
    });
    $(".i-ca-file").change(function() {
        if ($(this).val().length != 0)
            $("#f-upload").submit();
    });
    $("#if-upload").load(function() {
        var win = document.getElementById("if-upload").contentWindow,
            result = win.document.body.innerText;
        if (result.search("error") != -1)
            alert(result);
        else {
            $(".i-ca").attr("src", result);
        }
    });
    $("#i-ca-editor").load(function() {
        if ($(this).height() != 0)
            $(this).css("top", (250-$(this).height())/2);
    });
    $("#i-ca-editor-f").load(function() {
        if ($(this).height() != 0)
            $(this).css("top", (250-$(this).height())/2);
    });
});

function parseServerData(data, keyword) {
    var ce, cs = data.indexOf(keyword+"=");
    if (cs != -1) {
        ce = data.indexOf(";", cs);
        if (ce == -1) ce = data.length;
        return data.substring(cs+keyword.length+1, ce);
    }
    return null;
}

function loadUserInfo() {
    var id, username, nickname, email, tel, avater;
    id = getCookie("c_userid");
    if (id == null) location.href = "/html/login.html";
    username = getCookie("c_username");
    nickname = getCookie("c_nickname");

    $("#i-ca-uid").val(id);

    $.get("/php/userinfo.php?f=lu&id="+id,
    function (data, status) {
        if (status == "success") {
            if (data.search("error") != -1) alert(data);
            else {
                username = parseServerData(data, "username");
                nickname = parseServerData(data, "nickname");
                email = parseServerData(data, "email");
                tel = parseServerData(data, "tel");
                avatar = parseServerData(data, "avatar");

                if (username) $("#s-info-username").text(username);
                if (nickname) $("#s-info-nickname").text(nickname);
                if (email) $("#s-info-email").text(email);
                if (tel) $("#s-info-tel").text(tel);
                if (avatar) $("#i-info-avatar").attr("src", avatar);
            }
        }
    });
}
