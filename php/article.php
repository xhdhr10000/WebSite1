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
    $art = input_check($_POST['a']);
    $key = input_check($_POST['k']);

    if (strlen($user) == 0) die("error: user is null");
    $sql_query = "SELECT id FROM user WHERE username='".$user."'";
    if (!($ret = mysql_query($sql_query, $con)))
        die("error: get user failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $uid = $row[0];
    if ($uid == null) die("error: uid is null");

    $sql_insert = "INSERT INTO article (content, owner) ".
        "VALUES ('".mysql_real_escape_string($art)."', '".$uid."')";
/*
    $sql_insert = "CREATE PROCEDURE ArtInsert(in content text, in owner int) BEGIN
        INSERT INTO article (content, owner) VALUES ('', owner)
        DECLARE ptr binary(16)
        SELECT ptr = TEXTPTR(content) WHERE id = identity
        WRITE TEXT article.content ptr content
        END";
*/
    if (!mysql_query($sql_insert, $con)) die("error: insert failed: ".mysql_error());

    $sql_query = "SELECT id FROM article ORDER BY id DESC LIMIT 1";
    if (!($ret = mysql_query($sql_query, $con))) die("error: select last article failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $aid = $row[0];
    if ($aid == null) die("error: aid is null");

    return $aid;
}

function load($con, $aid) {
    $sql_query = "SELECT content FROM article WHERE id='".$aid."'";
    if (!($ret = mysql_query($sql_query, $con)))
        die("error: get article failed: ".mysql_error());
    $row = mysql_fetch_row($ret);
    $art = $row[0];
    if (!$art) die("error: article is null");
    return output_check($art);
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
