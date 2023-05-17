<?php

require_once "functions.php";

//Verification that the request method is PATCH 
//If not send error 
if($request_method != "PATCH" && $request_method != "GET") {
    $error = ["error" => "The method must be PATCH or GET"];  
    sendJSON($error, 400);
}

if($request_method == "PATCH") {
    //Checking that the request data includes the parameter current balance
    if(isset($r_data["current_balance"]) && isset($r_data["user_id"])) {
        //Loops through the array /json and using index 
        foreach($users as $userIndex => $user){
            //Checking if request data location is the same as the current location 
            if ($r_data["user_id"] == $user["user_id"]) {
                //Updates the current balance 
                $sum = $user["current_balance"] + $r_data["current_balance"];
                $user["current_balance"] = $sum;

                $updatedUser = $user;

                //Deletes the old object in the array and replaces it with the new one
                array_splice($users, $userIndex, 1);
                $users[] = $updatedUser;
                array_multisort($users);
                
                //Encodes the json and writes to placesDatabase
                $UsJSON = json_encode($users, JSON_PRETTY_PRINT);
                $UsData = file_put_contents($userDatabase, $UsJSON);
            
                //Sends status 200, and data 
                sendJSON($updatedUser);
            }
        }
    }
}

// if($request_method == "GET") {
//     if(isset($_GET["location_name"])) {
//         foreach($places as $place) {
//             if($_GET["location_name"] == $place["location_name"]) {
//                 sendJSON($place["current_balance"]);
//             }
//         }
//     }
// }

// //ALL LOCATIONS FOR COUNTING TOTAL BALANCE 

// if($request_method == "GET") {
//     if(isset($_GET["all_locations"])) {
//         sendJSON($places);
       
//     }
// }






$error = ["error" => "Did not work."];  
    sendJSON($error, 500);
?>