<?php

//Request method
$request_method = $_SERVER["REQUEST_METHOD"];

//Requested JSON 
$r_json = file_get_contents("php://input");

//Requested data 
$r_data = json_decode($r_json, true);

//Array of places 
$places = [];

//The database for locations/places, and their information 
$placeDatabase = "../json/placeDatabase.json";

//If the placeDatabase.json exists update and decode it

if(file_exists($placeDatabase)){
    $places_json = file_get_contents($placeDatabase);
    $places = json_decode($places_json, true);
}


//Allows all methods, Origins and Methods to acess the API  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//General function for sending the data + statusCode (default 200). Run the exit() method in the end so this doesn't have to be done in the other code. 
function sendJSON($data, $statusCode = 200) {
   header('Content-Type: application/json');
   http_response_code($statusCode);
   echo json_encode($data);
   exit();
}


?>



