<?php
include "mysql.php";

$sql_create = "CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    username varchar(16) NOT NULL,
    nickname varchar(16),
    password binary(41) NOT NULL,
    email varchar(32),
    tel varchar(16) )";
if (!mysql_query($sql_create, $con)) die("error: create table failed: ".mysql_error());

echo "ok";
?>
