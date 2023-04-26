<?php

// Handles user CHECK-IN and CHECK-OUT at specific location
require_once "functions.php";

//Checking that the method is PATCH, if it's not, send an error. 
if($request_method != "PATCH"){
    $error = ["error" => "The method must be PATCH"]; 
    sendJSON($error, 400);
}

foreach($places as $placeIndex => $place) {

// if requested place matches place in JSON & has NOT been checked in to before, set checked_in to true.

    if(isset($r_data["checked_in"])) {
        if($place["location_name"] == $r_data["location_name"] and $place["checked_in"] == false) {
            $place["checked_in"] = true; 
            $updatedPlace = $place;

            array_splice($places, $placeIndex, 1);
            $places[] = $updatedPlace;
            array_multisort($places);
            
            
            $placeJSON = json_encode($places, JSON_PRETTY_PRINT);
            $placesData = file_put_contents($placeDatabase, $placeJSON);
        
            sendJSON($updatedPlace);
        }
    }

// if requested place matches place in JSON & has NOT been checked out, set checked_out to true.
    elseif(isset($r_data["checked_out"])) {
        if($place["location_name"] == $r_data["location_name"] and $place["checked_out"] == false) {
            $place["checked_out"] = true; 
            $updatedPlace = $place;

            array_splice($places, $placeIndex, 1);
            $places[] = $updatedPlace;
            array_multisort($places);
            
            
            $placeJSON = json_encode($places, JSON_PRETTY_PRINT);
            $placesData = file_put_contents($placeDatabase, $placeJSON);
        
            sendJSON($updatedPlace);
        }
    }  

}

$error = ["error" => "Required parameters ('Checked in' OR 'Checked out' are not set OR 'Location_name' does not match."]; 
sendJSON($error, 400);

?>