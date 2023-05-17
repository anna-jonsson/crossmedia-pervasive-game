<?php

// Handles user CHECK-IN and CHECK-OUT at a specific location
require_once "functions.php";

// Checking that the method is PATCH; if not, send an error.
if ($request_method !== "PATCH") {
    $error = ["error" => "The method must be PATCH"];
    sendJSON($error, 400);
}

// Checking for missing r_data
if (empty($r_data["user_id"]) || empty($r_data["location_name"])) {
    $error = ["error" => "Required r_data is missing!"];
    sendJSON($error, 404);
}

// Iterating over users
foreach ($users as &$user) {
    // Finding the right user by user_id
    if ($user["user_id"] === $r_data["user_id"]) {
        // Iterating over user's locations
        foreach ($user["locations"] as &$location) {
            // Checking if location name matches and updating status
            if ($location["location_name"] === $r_data["location_name"]) {
                if (!$location["checked_in"] && !$location["checked_out"]) {
                    $location["checked_in"] = true;
                    // Update the user in the users array
                    sendJSON($location);
                } elseif ($location["checked_in"] && !$location["checked_out"]) {
                    $location["checked_out"] = true;
                    // Update the user in the users array
                    sendJSON($location);
                }
            }
        }
        // If matching location is not found, send an error
        $error = ["error" => "Required parameters ('Checked in' OR 'Checked out') are not set OR 'Location_name' does not match."];
        sendJSON($error, 400);
    }
}

$error = ["error" => "User not found"];
sendJSON($error, 404);
?>