$(document).ready(function () {
    loginResize();
    $(window).resize(loginResize);
    $("a.alog").click(function () {
        var err = false;
        var u = $("#iusername").val(),
            p = $("#ipassword").val();
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
