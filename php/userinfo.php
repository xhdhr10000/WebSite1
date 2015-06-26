<?php
include "common.php";
include "mysql.php";

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $id = mysql_real_escape_string(input_check($_GET['id']));

    $sql_query = "SELECT username, nickname, email, tel, avatar
        FROM user WHERE id='".$id."'";
    $ret = mysql_query($sql_query, $con);
    if (!$ret) die("error: user ".$id." not exist");
    $row = mysql_fetch_row($ret);
    if (!$row) die("error: user ".$id." not exist");
    $u = $row[0];
    $n = $row[1];
    $e = $row[2];
    $t = $row[3];
    $a = $row[4];

    if ($u) echo "username=".$u;
    if ($n) echo ";nickname=".$n;
    if ($e) echo ";email=".$e;
    if ($t) echo ";tel=".$t;
    if ($a) echo ";avatar=".$a;
}

mysql_close($con);
?>
