//GET
//Function for place_request with the placeName as parameter.
function place_request(placeName) {
    const placeRequest = new Request("../php/get_location.php?location_name=" + placeName);

    fetch(placeRequest)
        .then((resp) => resp.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}
//Function for check_password with the placeName and password as parameter.
function check_password(placeName, password) {
    const passwordRequest = new Request(
        "../php/passwords.php?password=" + password + "&location_name=" + placeName
    );

    fetch(passwordRequest)
        .then((resp) => resp.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}

//PATCH
//Function checking in - PATCH method
function checked_in(placeName, checked_status) {
    const checked_inRequest = new Request("../php/checked_in_out.php");
    fetch(checked_inRequest, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            location_name: placeName,
            checked_in: checked_status,
        }),
    })
        .then((r) => r.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}
//Function for checking out - PATCH method
function checked_out(placeName, checked_status) {
    const checked_outRequest = new Request("../php/checked_in_out.php");
    fetch(checked_outRequest, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            location_name: placeName,
            checked_out: checked_status,
        }),
    })
        .then((r) => r.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}

//FUNDERING!!! - ska inte checked status vara nyckeln så att det är den som ändras och inte out och in som olika??

//Function for balance request
function patch_balance(placeName, balance) {
    const balanceRequest = new Request("../php/balance.php");
    fetch(balanceRequest, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            location_name: placeName,
            current_balance: balance,
        }),
    })
        .then((r) => r.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}

// CURRENT BALANCE
function get_current_balance(placeName) {
    const balanceRequest = new Request("../php/balance.php?location_name=" + placeName);

    fetch(balanceRequest)
        .then(resp => resp.json())
        // TODO: switch console.log to actual action
        .then(rsc => console.log(rsc));
}
