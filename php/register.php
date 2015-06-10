<?php
$php_ret = "ok";

$con = mysql_connect("localhost", "root", "nufront");

if (!$con)
	die("error: cannot connect: ".mysql_error());

if (!mysql_select_db("testdb", $con))
	die("error: cannot select db: ".mysql_error());

$sql_query = "SELECT * FROM Users";
if (!mysql_query($sql_query, $con)) {
	$sql_create = "CREATE TABLE Users (
		ID int NOT NULL AUTO_INCREMENT,
		PRIMARY KEY(ID),
		Username varchar(16),
		Nickname varchar(16),
		Password varchar(20),
		Email varchar(32),
		Tel varchar(16) )";
	if (!mysql_query($sql_create, $con))
		die("Cannot create table: ".mysql_error());
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$sql_query = "SELECT Username FROM Users WHERE Username='".input_check($_POST['iusername'])."'";
	if (mysql_num_rows(mysql_query($sql_query, $con))) {
		$php_ret = "exist";
		echo $php_ret;
		return;
	}
	$sql_insert = "INSERT INTO Users (Username, Nickname, Password, Email, Tel) "."VALUES ('".
		input_check($_POST['iusername'])."', '".
		input_check($_POST['inickname'])."', password('".
		input_check($_POST['ipassword'])."'), '".
		input_check($_POST['iemail'])."', '".
		input_check($_POST['itel'])."')";
	if (!mysql_query($sql_insert, $con)) die("error: insert failed: ".mysql_error());
}

mysql_close($con);
echo $php_ret;
return;

function input_check($str) {
	$str = trim($str);
	$str = stripslashes($str);
	$str = htmlspecialchars($str);
	$str = mysql_real_escape_string($str);
	return $str;
}
?>
