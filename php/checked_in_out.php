<?php
// Handles user CHECK-IN and CHECK-OUT at a specific location
require_once "functions.php";


// Checking that the method is PATCH; if not, send an error.
if ($request_method !== "PATCH") {
    $error = ["error" => "The method must be PATCH"];
    sendJSON($error, 400);
}

if (!isset($r_data["user_id"], $r_data["location_name"])) {
    // The r_data can't be empty
    if (empty($r_data["user_id"]) || empty($r_data["location_name"])) {
        $error = ["error" => "Required r_data is missing!"];
        sendJSON($error, 404);
    }
}

// Iterating over users
foreach ($users as $userIndex => $user) {
    // Finding the right user by user_id
    if ($user["user_id"] == $r_data["user_id"]) {
        // Iterating over user's locations
        foreach ($user["locations"] as $locationIndex => $location) {
            // Checking if location name matches and updating status
            if ($location["location_name"] == $r_data["location_name"]) {
                if ($location["checked_in"] == false) {
                    $location["checked_in"] = true;
                    $location["checked_out"] = false;
                    // Update the user in the users array
                    $user["locations"][$locationIndex] = $location;

                    $users[$userIndex] = $user; // Update the user in the users array

                    $UsJSON = json_encode($users, JSON_PRETTY_PRINT);
                    file_put_contents($userDatabase, $UsJSON); // Write the updated data to the JSON file
                    sendJSON($location);
                    
                } elseif ($location["checked_in"] == true) {
                    $location["checked_out"] = true;
                    $location["checked_in"] = false;
                    
                    // Update the user in the users array
                    $user["locations"][$locationIndex] = $location;

                    $users[$userIndex] = $user; // Update the user in the users array

                    $UsJSON = json_encode($users, JSON_PRETTY_PRINT);
                    file_put_contents($userDatabase, $UsJSON); // Write the updated data to the JSON file

                    sendJSON($location);
                }
            }
        }
            // If matching location is not found, send an error
            $error = ["error" => "Required parameters ('Checked in' OR 'Checked out') are not set OR 'Location_name' does not match."];
            sendJSON($error, 400);
        }
        $error = ["error" => "User not found"];
        sendJSON($error, 404);
    }


?>



