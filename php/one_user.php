<?php
//File for the final questions 
require_once "functions.php";


if ($request_method  != "GET") {
    $error = ["error"=>"Invalid method"];
    sendJSON($error,400);
}



if(isset($_GET["user_id"])) {
    foreach($users as $user){
        if($_GET["user_id"] == $user["user_id"]){
            sendJSON($user);

        }

    }
    
        $error = ["error"=>"User not found."];
        sendJSON($error,400);
}




?>