<?php

require_once "functions.php";

//Verification that the request method is PATCH 
//If not send error 
if($request_method != "PATCH") {
    $error = ["error" => "The method must be PATCH"];  
    sendJSON($error, 400);
}


//Checking that the request data includes the parameter current balance
if(isset($r_data["current_balance"]) && isset($r_data["location_name"])) {
    //Loops through the array /json and using index 
    foreach($places as $placeIndex => $place){
        //Checking if request data location is the same as the current location 
        if ($r_data["location_name"] == $place["location_name"]) {
            //Updates the current balance 
            $sum = $place["current_balance"] + $r_data["current_balance"];
            $place["current_balance"] = $sum;

            $updatedPlace = $place;

            //Deletes the old object in the array and replaces it with the new one
            array_splice($places, $placeIndex, 1);
            $places[] = $updatedPlace;
            array_multisort($places);
            
            //Encodes the json and writes to placesDatabase
            $placeJSON = json_encode($places, JSON_PRETTY_PRINT);
            $placesData = file_put_contents($placeDatabase, $placeJSON);
        
            //Sends status 200, and data 
            sendJSON($updatedPlace);
        }
    }
}

?>