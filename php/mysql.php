<?php
$con = mysql_connect("localhost", "root", "xhdhr19900108");
if (!$con) die("error: cannot connect: ".mysql_error());
if (!mysql_select_db("xhdhr10000", $con)) die("error: cannot select db: ".mysql_error());
?>
