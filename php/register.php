<?php
include "common.php";
include "mysql.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $u = mysql_real_escape_string(input_check($_POST['iusername']));
    $n = mysql_real_escape_string(input_check($_POST['inickname']));
    $p = mysql_real_escape_string(input_check($_POST['ipassword']));
    $e = mysql_real_escape_string(input_check($_POST['iemail']));
    $t = mysql_real_escape_string(input_check($_POST['itel']));

    $sql_query = "SELECT username FROM user WHERE
        username='".$u."' || email='".$u."' || tel='".$u."'";
    if (mysql_num_rows(mysql_query($sql_query, $con))) {
        echo "exist: username";
        mysql_close($con);
        return;
    }

    if (strlen($e) != 0) {
        $sql_query = "SELECT username FROM user WHERE
            username='".$e."' || email='".$e."' || tel='".$e."'";
        if (mysql_num_rows(mysql_query($sql_query, $con))) {
            echo "exist: email";
            mysql_close($con);
            return;
        }
    }

    if (strlen($t) != 0) {
        $sql_query = "SELECT username FROM user WHERE
            username='".$t."' || email='".$t."' || tel='".$t."'";
        if (mysql_num_rows(mysql_query($sql_query, $con))) {
            echo "exist: tel";
            mysql_close($con);
            return;
        }
    }

    $sql_insert = "INSERT INTO user (username, nickname, password, email, tel) ".
        "VALUES ('".$u."', '".$n."', password('".$p."'), '".$e."', '".$t."')";
    if (!mysql_query($sql_insert, $con)) die("error: insert failed: ".mysql_error());

    echo "username=".$u.";nickname=".$n.";";
}

mysql_close($con);
echo "ok";
?>
