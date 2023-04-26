function place_request(placeName) {
    const placeRequest = new Request("../php/get_location.php?location_name=" + placeName);

    fetch(placeRequest)
        .then(resp => resp.json())
        // TODO: switch console.log to actual action
        .then(rsc => console.log(rsc));

}

function check_password(placeName, password) {
    const passwordRequest = new Request("../php/passwords.php?password=" + password + "&location_name=" + placeName);

    fetch(passwordRequest)
        .then(resp => resp.json())
        // TODO: switch console.log to actual action
        .then(rsc => console.log(rsc));
}