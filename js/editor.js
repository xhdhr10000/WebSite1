$(document).ready(function() {
    //editorResize();
    //$(window).resize(editorResize);
    $("#content").ckeditor();
    /*
    $(".a-editor-btn.color").click(function() {
        $("#dcolorpanel").slideToggle("fast");
    });
    $(".a-editor-btn.bold").click(editorBold);
    $(".editor-content").keydown(function(event) {
        if (event.keyCode == 9) {
            editorBold();
            //$(this).append("&nbsp;&nbsp;&nbsp;&nbsp;");
            return false;
        }
    });
    */
    $("#asubmit").click(submit);
});

function editorResize() {
    var c = $(".editor-content"),
        t = $(".editor-title"),
        b = $(".editor-bar"),
        k = $(".editor-keyword"),
        s = $(".editor-submit"),
        bc = $("#acolor"),
        cp = $(".d-editor-btn.colorpanel"),
        w = $(window);

    c.css({
        "height": w.innerHeight()-t.outerHeight()-
            b.outerHeight()-k.outerHeight()-s.outerHeight()-80
    });

    cp.css({
        "left": bc.position().left
    });
}

function editorBold() {
    var sel = window.getSelection() ? window.getSelection() : document.selection;
    var pos = sel.focusOffset;
    var dc = $("#dcontent");
//    dc.html(dc.html().substring(0, sel.focusOffset)+"&nbsp;&nbsp;&nbsp;&nbsp;"+dc.html().substring(sel.focusOffset, dc.html().length));

    sel = window.getSelection() ? window.getSelection() : document.selection;
    var range = sel.createRange ? sel.createRange() : sel.getRangeAt(0);
//    range.setEnd(sel.focusNode, range.endOffset+1);
    sel.removeAllRanges();
    sel.addRange(range);
    dc.focus();
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
