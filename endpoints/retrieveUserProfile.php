<?php 
    include("../connection.php");
//    $jsonData = array();
//    $userInfo = $db->query("SELECT u.firstName, u.lastName, u.email, a.balance FROM users u INNER JOIN account a ON u.email = a.email");
//    while($result = $userInfo->fetchObject()){
////        $fName = $result->firstName;
////        $lName = $result->lastName;
////        $email = $result->email;
////        $balance = $result->balance;
////        $jsonData = array("fName"=>$fName, "lName"=>$lName, "email"=>$email, "balance"=>$balance);
//        $jsonData[] = $result;
//    };
//    echo json_encode(array_values($jsonData));


$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sth = $db->prepare("SELECT u.firstName, u.lastName, u.email, a.balance FROM users u INNER JOIN account a ON u.email = a.email");
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$stmt = $conn->prepare("SELECT id, firstname, lastname FROM MyGuests"); 
$sth->execute();

// set the resulting array to associative
    $result = $sth->setFetchMode(PDO::FETCH_ASSOC); 
    foreach(new TableRows(new RecursiveArrayIterator($sth->fetchAll())) as $k=>$v) { 
        echo $v;
    }

/* Exercise PDOStatement::fetch styles */
//print("PDO::FETCH_ASSOC: ");
//print("Return next row as an array indexed by column name\n");
//$result = $sth->fetch(PDO::FETCH_ASSOC);
//print_r($result);
//print("\n");

?>