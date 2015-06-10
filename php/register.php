<?php
include "common.php";
include "mysql.php";

$php_ret = "ok";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $u = mysql_real_escape_string(input_check($_POST['iusername']));
    $n = mysql_real_escape_string(input_check($_POST['inickname']));
    $p = mysql_real_escape_string(input_check($_POST['ipassword']));
    $e = mysql_real_escape_string(input_check($_POST['iemail']));
    $t = mysql_real_escape_string(input_check($_POST['itel']));

	$sql_query = "SELECT Username FROM user WHERE username='".$u."'";
	if (mysql_num_rows(mysql_query($sql_query, $con))) {
		$php_ret = "exist";
		echo $php_ret;
		return;
	}
	$sql_insert = "INSERT INTO user (username, nickname, password, email, tel) ".
        "VALUES ('".$u."', '".$n."', password('".$p."'), '".$e."', '".$t."')";
	if (!mysql_query($sql_insert, $con)) die("error: insert failed: ".mysql_error());

    setcookie("c_nickname", $n, time()+3600);
}

mysql_close($con);
echo $php_ret;
return;
?>
