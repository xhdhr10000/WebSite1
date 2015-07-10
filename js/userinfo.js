var cax = -1, cay = -1, cw, ch, mx, my, op;

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

    /* move change avatar */
    $(".d-ca-title").mousedown(function(e) {
        handleMouseDown(e, $(".d-change-avatar-container"), "mca");
    });
    $(".d-ca-frame").mousedown(function(e) {
        handleMouseDown(e, $(this), "mcaf");
    });
    $(".d-ca-mag").mousedown(function(e) {
        handleMouseDown(e, $(this), "rscaf");
    });
    $(window).mouseup(function() {
        if (cax != -1 && cay != -1) {
            cax = cay = -1;
            return false;
        }
    });
    $(window).mousemove(function(e) {
        if (cax != -1 && cay != -1) {
            switch(op) {
            case "mca":
                c = $(".d-change-avatar-container");
                d = $(".dc");
                l = cax + e.pageX - mx;
                t = cay + e.pageY - my;
                if (cax + e.pageX - mx <= 0) l = 0;
                if (cax + e.pageX - mx + c.width() > d.width())
                    l = d.width() - c.width();
                if (cay + e.pageY - my <= 0) t = 0;
                if (cay + e.pageY - my + c.height() > d.height())
                    t = d.height() - c.height();
                c.css({
                    "left": l,
                    "top": t
                });
                break;
            case "mcaf":
                c = $(".d-ca-frame");
                d = $(".d-ca-editor");
                l = cax + e.pageX - mx;
                t = cay + e.pageY - my;
                if (cax + e.pageX - mx <= 0) l = 0;
                if (cax + e.pageX - mx + c.width() > d.width())
                    l = d.width() - c.width();
                if (cay + e.pageY - my <= 0) t = 0;
                if (cay + e.pageY - my + c.height() > d.height())
                    t = d.height() - c.height();
                c.css({
                    "left": l,
                    "top": t
                });
                break;
            case "rscaf":
                c = $(".d-ca-frame");
                d = $(".d-ca-editor");
                m = $(".d-ca-mag");
                if (cw + cax + e.pageX - mx <= m.width() ||
                    cw + cax + e.pageX - mx + c.position().left > d.width() ||
                    ch + cay + e.pageX - mx < m.height() ||
                    ch + cay + e.pageX - mx + c.position().top >= d.height())
                        break;
                c.css({
                    "width": cw + cax + e.pageX - mx,
                    "height": ch + cay + e.pageX - mx
                });
                break;
            }
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
        else
            $(".i-ca").attr("src", result);
    });
    $("#i-ca-editor").load(function() {
        resizeEditorImage($(this), false);
    });
    $("#i-ca-editor-f").load(function() {
        resizeEditorImage($(this), true);
    });
});

function handleMouseDown(e, which, o) {
    if (cax != -1 && cay != -1) return true;
    cax = which.position().left;
    cay = which.position().top;
    cw = which.width();
    ch = which.height();
    mx = e.pageX;
    my = e.pageY;
    op = o;
    return false;
}

function resizeEditorImage(img, clip) {
    var dEdit = $(".d-ca-editor"),
        dLarge = $(".d-ca-large"),
        dFrame = $(".d-ca-frame");
    img.css({"width": "auto", "height": "auto"});
    if (img.width() == 0 || img.height() == 0) {
        img.css({"width": dEdit.width(), "height": dEdit.height()});
        return;
    }

    var off = (1-Math.min(img.width(),img.height())/
        Math.max(img.width(),img.height()))*dEdit.width()/2;
    if (img.width() < img.height()) {
        img.css({
            "height": dEdit.height(),
            "left": off+2,
            "top": 2
        });
    } else if (img.width() > img.height()) {
        img.css({
            "width": dEdit.width(),
            "top": off+2,
            "left": 2
        });
    } else {
        img.css({"width": dEdit.width(), "height": dEdit.height()});
    }

    if (clip) {
        var t = (img.height()-dLarge.height())/2,
            l = (img.width()-dLarge.width())/2,
            b = t+dLarge.height(),
            r = l+dLarge.width();
        if (t < 0) {
            t = 0;
            b = img.height();
        }
        if (l < 0) {
            l = 0;
            r = img.width();
        }
        img.css("clip", "rect("+t+"px,"+r+"px,"+b+"px,"+l+"px)");

        if (img.width() < img.height()) {
            l += off;
            r += off;
        } else if (img.width() > img.height()) {
            t += off;
            b += off;
        }
        dFrame.css({
            "width": r-l,
            "height": b-t,
            "left": l+1+"px",
            "top": t+1+"px"
        });
    }
}

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
    var id, username, nickname, email, tel, avatar;
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
