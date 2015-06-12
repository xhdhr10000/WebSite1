$(document).ready(function() {
//    selectorResize();
//    $(window).resize(selectorResize);
    loadSelector();
});

function selectorResize() {
    var d=$("div.dsel-container"),
        a=$("a.asel");
    a.css({
        "width": d.outerWidth()/2 - 5
    });
}

function loadSelector() {
    $.get("/php/article.php?f=ll",
    function(data, status) {
        if (status == "success") {
            var cs = 0, ce, id, title, html = "";
            while (cs < data.length) {
                ce = data.indexOf(":", cs);
                if (ce == -1) ce = data.length;
                id = data.substring(cs, ce);
                cs = ce + 1;
                if (cs >= data.length) break;
                ce = data.indexOf(";", cs);
                if (ce == -1) ce = data.length;
                title = data.substring(cs, ce);
                cs = ce + 1;

                html += createSelector(id, title);
            }
            $("#ds-container").html(html);
        }
    });
}

var artCounter = 0;

function createSelector(id, title) {
    var ret = '<a class="asel ';
    ret += (++artCounter%2!=0)?'left':'right';
    ret += '" href="/html/article.html?id='+id+'">';
    ret += title;
    ret += '</a>';
    return ret;
}
