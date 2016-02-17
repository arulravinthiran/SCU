<?php 
    include("../connection.php");
    //include("endpoints/util.php");
    //ini_set('display_errors', 1);
    $data = json_decode(file_get_contents("php://input"));
    $fName = $data->fName;
    $lName = $data->lName;
    $username = $data->username;
    $password = $data->password;
    $passwordR = $data->passwordR;
    $error = false;
    
    if(!isset($fName) || trim($fName)===''){
        $error = true;
        echo json_encode("Please fill first name!");
    }

    if(!isset($lName) || trim($lName)===''){
        $error = true;
        echo json_encode("Please fill last name!");
    }

    if(!isset($username) || trim($username)===''){
        $error = true;
        echo json_encode("Please fill email!");
    } else{
        // Remove all illegal characters from email
        $username = filter_var($username, FILTER_SANITIZE_EMAIL);
        // Validate e-mail
        if (filter_var($username, FILTER_VALIDATE_EMAIL) === false) {
            $error = true;
            echo json_encode("Invalid email address!");
        } 
    }

    if(!isset($password) || trim($password)==='' || !isset($passwordR) || trim($passwordR)===''){
        $error = true;
        echo json_encode("Please fill password!");
    } else if($passwordR != $password){
        $error = true;
        echo json_encode("Passwords do not match!");
    } else if(strlen($password) < 6){
        $error = true;
        echo json_encode("Password length should be at least 6!");
    }
    
    if(!$error){
//        if($passwordR === $password){
           $userInfo = $db->query("SELECT email FROM users WHERE email='$username'");
           $userInfo = $userInfo->fetchAll();
           if (count($userInfo) == 1){ echo json_encode("This email address already exists! Please try another!");}
           else{
               $token = $username . " | " . uniqid() . uniqid() . uniqid();
               $q = "INSERT INTO users (firstName, lastName, email, password, token) VALUES (:fName, :lName, :email, :password, :token)";
               $query = $db->prepare($q);
               $execute = $query->execute(array(
               ":fName" => $fName,
               ":lName" => $lName,
               ":email" => $username,
               ":password" => sha1($password),
               ":token" => $token
             ));
             echo json_encode($token); 
           }
           
//        } else{
//            echo json_encode("Passwords do not match");
//        }
    } 
    
?>