<? php 
    include("../connection.php");
    // Function for basic field validation (present and neither empty nor only white space
    function IsNullOrEmptyString($question){
        return (!isset($question) || trim($question)==='');
    } 
?>