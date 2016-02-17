<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $userInfo = $db->query("SELECT email FROM users WHERE email='$username'");
    $userInfo = $userInfo->fetchAll();
    if (count($userInfo) != 0) echo "unique";
    else echo "duplicate";
?>