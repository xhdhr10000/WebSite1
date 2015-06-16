$(document).ready(function() {
    editorResize();
    $(window).resize(editorResize);
    $(".a-editor-btn.color").click(function() {
        $("#dcolorpanel").slideToggle("fast");
    });
    $(".editor-content").keydown(function(event) {
        /*
        if (event.keyCode == 9) {
            $(this).append("&nbsp;&nbsp;&nbsp;&nbsp;");
            return false;
        }
        */
    });
    $("#asubmit").click(submit);
});

function editorResize() {
    var c = $(".editor-content"),
        t = $(".editor-title"),
        b = $(".editor-bar"),
        k = $(".editor-keyword"),
        s = $(".editor-submit"),
        cp = $("#dcolorpanel"),
        w = $(window);

    c.css({
        "height": w.innerHeight()-t.outerHeight()-
            b.outerHeight()-k.outerHeight()-s.outerHeight()-80
    });
}

function submit() {
    if ($("#ititle").val().length == 0) {
        alert("请输入文章标题");
        return;
    }

    $.post("/php/article.php?f=s", {
        u: getCookie("c_username"),
        t: $("#ititle").val(),
        k: $("#ikeyword").val(),
        a: encodeURI($("#dcontent").html())
    },
    function(data, status) {
        if (status == "success") {
            if (data.search("error") != -1) alert(data);
            else window.top.location.href = "/html/article.html?id="+data;
        }
    });
}
