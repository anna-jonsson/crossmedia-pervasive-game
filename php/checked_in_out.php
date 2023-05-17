<?php

// Handles user CHECK-IN and CHECK-OUT at specific location
require_once "functions.php";

//Checking that the method is PATCH, if it's not, send an error. 
if($request_method != "PATCH"){
    $error = ["error" => "The method must be PATCH"]; 
    sendJSON($error, 400);
}

//Empty r_data
if(($r_data["user_id"] == "" and $r_data["location_name"] == "")){
    $error = ["error" => "Needed r_data is missing!"]; 
    sendJSON($error, 404);
}

// If paramaters are missing (fetch)
if(!isset($r_data["user_id"], $r_data["location_name"])){
    $error = ["error" => "One or more paramaters are missing"]; 
    sendJSON($error, 400);
}

foreach ($users as $user_index => $user) {
    //Finding the right user_id in the userdatabase
    if($user["user_id"] == $r_data["user_id"]){
        //looping through the array of locations
        foreach($user["locations"] as $location){
            if($location["location_name"] == $r_data["location_name"] and $location["checked_in"] == false){
                $location["checked_in"] == true; 
                $updateLocation = $location;
                array_splice($user["locations"], $user_index, 1);
                $locations[] = $updateLocation;
                array_multisort($locations);

                sendJSON($updateLocation);
            }
        }
    
    
    }elseif(isset($r_data["checked_out"])){
        if($location["location_name"] == $r_data["location_name"] and $location["checked_out"] == false){
            $location["checked_out"] == true; 
            $updateLocation = $location;
            array_splice($user["locations"], $user_index, 1);
            $locations[] = $updateLocation;
            array_multisort($locations);

            sendJSON($updateLocation);
        }
    }

    $error = ["error" => "Required parameters ('Checked in' OR 'Checked out' are not set OR 'Location_name' does not match."]; 
    sendJSON($error, 400);  

}
// foreach($places as $placeIndex => $place) {

// // // if requested place matches place in JSON & has NOT been checked in to before, set checked_in to true.

// //     if(isset($r_data["checked_in"])) {
// //         if($place["location_name"] == $r_data["location_name"] and $place["checked_in"] == false) {
// //             $place["checked_in"] = true; 
// //             $updatedPlace = $place;

// //             array_splice($places, $placeIndex, 1);
// //             $places[] = $updatedPlace;
// //             array_multisort($places);
            
            
// //             $placeJSON = json_encode($places, JSON_PRETTY_PRINT);
// //             $placesData = file_put_contents($placeDatabase, $placeJSON);
        
// //             sendJSON($updatedPlace);
// //         }
// //     }

// if requested place matches place in JSON & has NOT been checked out, set checked_out to true.
//     elseif(isset($r_data["checked_out"])) {
//         if($place["location_name"] == $r_data["location_name"] and $place["checked_out"] == false) {
//             $place["checked_out"] = true; 
//             $updatedPlace = $place;

//             array_splice($places, $placeIndex, 1);
//             $places[] = $updatedPlace;
//             array_multisort($places);
            
            
//             $placeJSON = json_encode($places, JSON_PRETTY_PRINT);
//             $placesData = file_put_contents($placeDatabase, $placeJSON);
        
//             sendJSON($updatedPlace);
//         }
//     }  

// }



?>