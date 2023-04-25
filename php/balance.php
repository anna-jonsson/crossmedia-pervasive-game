<?php

if($request_method != "PATCH") {
    $error = ["error" => "The method must be PATCH"];  
    sendJSON($error, 400);
}

foreach($places as $place){

    if ($r_data["location_name"] == $place["location_name"]) {
        $place["balance"] = $r_data["balance"];
    }
}

?>