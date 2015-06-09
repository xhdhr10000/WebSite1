try {
$(document).ready(function() {
	commonResize();
	$(window).resize(commonResize);
});

function commonResize() {
	var h=$(".dh"),
		c=$(".dc"),
		f=$(".df"),
		w=$(window);
	h.css({
		"width": w.width(),
	});
	c.css({
		"width": w.width(),
		"height": w.height()-h.height()-f.height(),
		"top": h.height(),
	});
	f.css({
		"width": w.width(),
		"top": h.height()+c.height(),
	});
}
} catch (e) {
	alert(e);
}
