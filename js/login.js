$(document).ready(function() {
	loginResize();
	$(window).resize(loginResize);
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
