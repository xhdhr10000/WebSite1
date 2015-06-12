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
if (!mysql_query($sql_create, $con))
    echo "error: create table failed: ".mysql_error()."<br/>";

$sql_create = "CREATE TABLE article (
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    title varchar(1024),
    content longtext,
    keyword varchar(1024),
    owner int )";
if (!mysql_query($sql_create, $con))
    echo "error: create table failed: ".mysql_error()."<br/>";

mysql_close($con);
echo "ok";
?>
