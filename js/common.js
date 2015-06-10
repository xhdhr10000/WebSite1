$(document).ready(function() {
	commonResize();
	$(window).resize(commonResize);
    getCookie();
});

function commonResize() {
	var h=$(".dh"),
		c=$(".dc"),
		f=$(".df"),
		w=$(window);
	h.css({
		"width": w.width()
	});
	c.css({
		"width": w.width(),
		"height": w.height()-h.height()-f.height(),
		"top": h.height()
	});
	f.css({
		"width": w.width(),
		"top": h.height()+c.height()
	});
}

function getCookie() {
    $.get("/php/cookie.php?l=c_nickname", function (data, status) {
        if (status == "success") {
            var res = new String(data);
            if (res.search("error") == -1) {
                $("#auser").html(res);
                $("#luser").css("display", "block");
                $("#llog").css("display", "none");
                $("#lreg").css("display", "none");
            }
        }
    });
}
