$(document).ready(function() {
    editResize();
    $(window).resize(editResize);
});

function editResize() {
    var d = $(".de"),
        h = $(".dh"),
        w = $(window);

    d.css({
        "top": h.height(),
        "width": w.width()*0.8,
        "height": w.height() - h.height() - 30
    });
}
