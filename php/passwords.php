<?php

require_once "functions.php";

//Checking that the request method is GET
if($request_method != "GET"){
    $error = ["error" => "The method must be GET"]; 
    sendJSON($error, 400);
}

//Checking that the request data includes password, also checking that the data isn't empty
if(isset($r_data["password"])){
    //The r_data can't be empty
    if(empty($r_data["password"])){
        $error = ["error" => "Please fill in all of the information."];
        sendJSON($error, 404);
    }

//Looping the places and verifying the location name in the dataBase is the same as the requested data password. 

foreach($places as $place){
    if($place["location_name"] == $r_data["location_name"] and    
    $place["password"] == $r_data["password"])
            sendJSON($place);
    }
}

    //Else send error 
    $error = ["error" => "Incorrect password"];
    sendJSON($error, 400);

    ?>
