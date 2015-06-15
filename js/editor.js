$(document).ready(function() {
    editorResize();
    $(window).resize(editorResize);
    $(".a-editor-btn.color").click(function() {
        $("#dcolorpanel").slideToggle("fast");
    });
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
