<?php
    include("../connection.php");
    //include("../util.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $userInfo = $db->query("SELECT u.firstName, u.lastName, u.email, a.balance FROM users u INNER JOIN account a ON u.email = a.email AND u.email='$email'");
    $userInfo = $userInfo->fetchObject();
    $fName = $userInfo->firstName;
    $lName = $userInfo->lastName;
    $email = $userInfo->email;
    $balance = $userInfo->balance;
    $userProfile = array("fName"=>$fName, "lName"=>$lName, "email"=>$email, "balance"=>$balance);
    echo json_encode($userProfile);
?>