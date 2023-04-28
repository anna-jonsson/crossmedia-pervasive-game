<?php

require_once "functions.php";

//Checking that the request method is GET
if($request_method != "GET"){
    $error = ["error" => "The method must be GET"]; 
    sendJSON($error, 400);
}

//Checking that the request data includes location, also checking that the data isn't empty
if(isset($_GET["location_name"])){
    //The r_data can't be empty
    if(empty($_GET["location_name"])){
        $error = ["error" => "Please fill in all of the information."];
        sendJSON($error, 404);
    }

//Looping the places and verifying the location name in the dataBase is the same as the requested data password. 

    foreach($places as $place){
        if($place["location_name"] == $_GET["location_name"])
            sendJSON($place);
        }
}

if(isset($_GET["all_locations"])) {
    sendJSON($places);
}

//Else send error 
$error = ["error" => "Incorrect place request"];
sendJSON($error, 400);

?>