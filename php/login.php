<?php
include "common.php";
include "mysql.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $u = mysql_real_escape_string(input_check($_POST['iusername']));
    $p = mysql_real_escape_string(input_check($_POST['ipassword']));

    $sql_query = "SELECT password('".$p."')";
    $row = mysql_fetch_row(mysql_query($sql_query, $con));
    $p = $row[0];

    $sql_query = "SELECT username,nickname,password,email,tel,id FROM user WHERE password='".$p."'";
    $ret = mysql_query($sql_query, $con);
    $row = mysql_fetch_row($ret);
    $du = $row[0];
    $dn = $row[1];
    $dp = $row[2];
    $de = $row[3];
    $dt = $row[4];
    $di = $row[5];

    if ($u != $du && $u != $de && $u != $dt || $p != $dp) {
        echo "error";
        return;
    }

    echo "id=".$di.";username=".$du.";nickname=".$dn.";";
}

mysql_close($con);
echo "ok";
?>
