<?php
//File for the final questions 
require_once "functions.php";


if ($request_method  != "GET") {
    $error = ["error"=>"Invalid method"];
    sendJSON($error,400);
}


if(isset($_GET["all_users"])) {
    sendJSON($users);
}

?>