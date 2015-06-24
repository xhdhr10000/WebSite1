$(document).ready(function() {
    editResize();
    $(window).resize(editResize);
    $("#asubmit").click(submit);
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

function submit() {
    if ($("#ititle").val().length == 0) {
        alert("请输入文章标题");
        return;
    }

    $.post("/php/article.php?f=s", {
        u: getCookie("c_username"),
        t: $("#ititle").val(),
        k: $("#ikeyword").val(),
        a: encodeURI(CKEDITOR.instances.tcontent.getData())
    },
    function(data, status) {
        if (status == "success") {
            if (data.search("error") != -1) alert(data);
            else window.top.location.href = "/html/article.html?id="+data;
        }
    });
}
