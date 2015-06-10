<?php
include "common.php";

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $label = input_check($_GET['l']);
    if (strlen($label) == 0) die("error: label is empty");
    if (strlen($_COOKIE[$label]) == 0) die("error: no cookie: ".$label);
    echo $_COOKIE[$label];
}
?>
