$(document).ready(function() {
    var cs = location.search.indexOf("id=");
    if (cs == -1) alert("error: "+location.search);
    var ce = location.search.indexOf("&", cs);
    if (ce == -1) ce = location.search.length;
    var id = location.search.substring(cs+3, ce);
    loadArticle(id);
});

function loadArticle(id) {
    $.get("/php/article.php?f=l&i="+id,
    function (data, status) {
        if (status == "success") {
            if (data.search("error: ") != -1) alert(data);
            else {
                var cs = data.search(";&");
                if (cs != -1) {
                    document.title = decodeURI(data.substring(0, cs));
                    cs += 2;
                }
                $("#darticle").html(decodeURI(data.substring(cs, data.length)));
            }
        }
    });
}

function saveArticle() {
    var s = "u="+getCookie("c_username")+"&a="+encodeURI($("#darticle").html());
    $.post("/php/article.php?f=s", s,
    function (data, status) {
        if (status == "success") {
            if (data.search("error") != -1) alert(data);
            else loadArticle(data);
        }
    });
}
