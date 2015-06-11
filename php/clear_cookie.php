<?php
    setcookie("c_nickname", "", time()-1);
    setcookie("c_username", "", time()-1);
?>

<html>
    <head>
        <!--<script>location.href="/";</script>-->
    </head>
    <body>
    <?php
        print_r($_COOKIE);
    ?>
    </body>
</html>
