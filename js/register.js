$(document).ready(function () {
    registerResize();
    $(window).resize(registerResize);
	$("a.areg").click(function() {
		var u=$("#iusername").val(),
			n=$("#inickname").val(),
			p=$("#ipassword").val(),
			r=$("#irpassword").val(),
			e=$("#iemail").val(),
			t=$("#itel").val();
		if (p!=r) alert("Check password");
		var send = "iusername="+u+"&inickname="+n+
			"&ipassword="+p+ "&iemail="+e+ "&itel="+t;
		doRegister("reg", send);
	});
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

var xmlHttp;

function doRegister(m, s) {
	var url = "/php/register.php?f="+m;
	xmlHttp = getXmlHttp();
	xmlHttp.onreadystatechange = onRegComplete;
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttp.send(s);
}

function onRegComplete() {
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
		var res = new String(xmlHttp.responseText).toLowerCase();
		if (res.search("error") != -1) alert(res);
		else if (res.search("exist") != -1) alert(res);
		else if (res.search("ok") != -1) location.href = "/";
		alert(res);
	}
}

function getXmlHttp() {
	var xmlHttp = null;
	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XmlHttpRequest");
		} catch(e) {
			xmlHttp = new ActiveXObject("Microsoft.XmlHttpRequest");
		}
	}
	return xmlHttp;
}
