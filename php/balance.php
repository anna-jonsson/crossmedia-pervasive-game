<?php

if($request_method != "PATCH") {
    $error = ["error" => "The method must be PATCH"];  
    sendJSON($error, 400);
}

foreach($places as $place){

    if(file_exists($placeDatabase, $r_data["place"], $r_data["balance"])){
        $places_json = file_get_contents($placeDatabase);
        $places = json_decode($places_json, true);

    if ($r_data["location_name"] == $place["location_name"]) {
        $place["balance"] = $r_data["balance"];
    }

    }
}

?>