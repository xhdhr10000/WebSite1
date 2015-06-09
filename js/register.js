$(document).ready(function () {
    registerResize();
    $(window).resize(registerResize);
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