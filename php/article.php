<?php
include "common.php";
include "mysql.php";

if ($_SERVER['REQUEST_METHOD'] == "GET" || $_SERVER['REQUEST_METHOD'] == "POST") {
    $f = input_check($_GET['f']);
    if ($f == 's') echo save($con);
    else if ($f == 'l') echo load($con, input_check($_GET['i']));
    else if ($f == 'll') echo loadlist($con);
    else die("error: undifined function: ".$f);
}

function save($con) {
    $user = input_check($_POST['u']);
    $title = input_check($_POST['t']);
    $art = input_check($_POST['a']);
    $key = input_check($_POST['k']);

    if (strlen($user) == 0) die("error: user is null");
    $sql_query = "SELECT id FROM user WHERE username='".$user."'";
    if (!($ret = mysql_query($sql_query, $con)))
        die("error: get user failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $uid = $row[0];
    if ($uid == null) die("error: uid is null");

    $sql_insert = "INSERT INTO article (title, content, owner) ".
        "VALUES ('".mysql_real_escape_string($title)."', '".
        mysql_real_escape_string($art)."', '".$uid."')";
    if (!mysql_query($sql_insert, $con)) die("error: insert failed: ".mysql_error());

    $sql_query = "SELECT id FROM article ORDER BY id DESC LIMIT 1";
    if (!($ret = mysql_query($sql_query, $con))) die("error: select last article failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $aid = $row[0];
    if ($aid == null) die("error: aid is null");

    return $aid;
}

function load($con, $aid) {
    $sql_query = "SELECT title,content FROM article WHERE id='".$aid."'";
    if (!($ret = mysql_query($sql_query, $con)))
        die("error: get article failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $title = $row[0];
    $art = $row[1];
    if (!$title || !$art) die("error: article is null");
    return output_check($title).";&".output_check($art);
}

function loadlist($con) {
    $sql_query = "SELECT id, title FROM article";
    if (!($ret = mysql_query($sql_query, $con)))
        die("error: find article failed: ".mysql_error());
    $result = "";
    while ($row = mysql_fetch_row($ret)) {
        $result = $result.$row[0].":".$row[1].";";
    }
    return $result;
}

function output_check($str) {
    $str = htmlspecialchars_decode($str);
    $str = stripcslashes($str);
    return $str;
}
?>
