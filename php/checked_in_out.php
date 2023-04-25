<?php

// Handles user CHECK-IN and CHECK-OUT at specific location
require_once "functions.php";

//Checking that the method is PATCH, if it's not, send an error. 
if($request_method != "PATCH"){
    $error = ["error" => "The method must be PATCH"]; 
    sendJSON($error, 400);
}

// if requested place matches place in JSON & has NOT been checked in to before, set checked_in to true.
<<<<<<< Updated upstream
if($place["location_name"] == $request_data["location_name"] and    
$place["checked_in"] == false) {
=======
if($place["location_name"] == $r_data["location_name"] and    
    $place["checked_in"] == false) {
>>>>>>> Stashed changes
	$place["checked_in"] == true; 
    sendJSON($place);
}

// if requested place matches place in JSON & has NOT been checked out, set checked_out to true.
<<<<<<< Updated upstream
if($place["location_name"] == $request_data["location_name"] and    
$place["checked_out"] == false) {
	place["checked_out"] == true; 
=======
if($place["location_name"] == $r_data["location_name"] and    
    $place["checked_out"] == false) {
	$place["checked_out"] == true; 
>>>>>>> Stashed changes
    sendJSON($place);
}

?>