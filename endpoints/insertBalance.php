<?php 
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;

    $q = "INSERT INTO account VALUES(:username, 100.0)";
    $query = $db->prepare($q);
    $execute = $query->execute(array(
             ":username" => $username
            ));
    //echo $username;
    echo json_encode(100.0."inserted for ".$username); 

	
?>