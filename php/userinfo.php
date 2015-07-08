<?php
include "common.php";
include "mysql.php";

if ($_SERVER['REQUEST_METHOD'] == "GET" || $_SERVER['REQUEST_METHOD'] == "POST") {
    if ($_GET['f'] == "lu") loadUserInfo($con);
    else if ($_GET['f'] == "ca") changeAvatar($con);
}

function loadUserInfo($con) {
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

function changeAvatar($con) {
    if ($_FILES['i-ca-file']['error'] > 0)
        die("error: return code: ". $_FILES['i-ca-file']['error']);
    if (!strstr($_FILES['i-ca-file']['type'], 'image'))
        die("error: invalid file type: ". $_FILES['i-ca-file']['type']);
    if ($_FILES['i-ca-file']['size'] > 5000000)
        die("error: file > 5M");
    if (!$_POST['i-ca-uid'])
        die("error: no user specified");

    $path = dirname(__FILE__)."/../user/".$_POST['i-ca-uid'];
    if (!file_exists($path)) {
        if (!mkdir($path, 0777, true))
            die("error: create user dir failed");
    }
    $path .= "/".$_FILES['i-ca-file']['name'];
    move_uploaded_file($_FILES['i-ca-file']['tmp_name'], $path);
    /*
    echo "Name: ". $_FILES['i-ca-file']['name']. "<br/>";
    echo "Type: ". $_FILES['i-ca-file']['type']. "<br/>";
    echo "Size: ". $_FILES['i-ca-file']['size']. "<br/>";
    echo "Temp name: ". $_FILES['i-ca-file']['tmp_name']. "<br/>";
    echo "Error: ". $_FILES['i-ca-file']['error']. "<br/>";
    */
    echo "/user/".$_POST['i-ca-uid']."/".$_FILES['i-ca-file']['name'];
}

mysql_close($con);
?>
