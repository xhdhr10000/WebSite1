$(document).ready(function() {
    loadArticle();
    $("#auser").click(function() {
        setCookie("c_username");
        setCookie("c_nickname");
    });
});

function loadArticle() {
//    alert(location.search);
}
