//GET
//PLACE REQUEST
async function all_places_request() {
    const placesRequest = new Request("../php/get_location.php?all_locations");
    const placesResp = await fetch(placesRequest);
    const placesRsc = await placesResp.json();
    return placesRsc;
}

async function place_request(placeName) {
    const placeRequest = new Request("../php/get_location.php?location_name=" + placeName);
    const placeResp = await fetch(placeRequest);
    const placeRsc = await placeResp.json();
    return placeRsc;
}

//CHECK PASSWORD
async function check_password(placeName, password) {
    const passwordRequest = new Request(
        "../php/passwords.php?password=" + password + "&location_name=" + placeName
    );
    const passwordResp = await fetch(passwordRequest);

    return passwordResp.status;
}

//PATCH
//CHECKING IN
async function checked_in(placeName, checked_status) {
    const checked_in_request = new Request("../php/checked_in_out.php");
    const checked_in_resp = await fetch(checked_in_request, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            location_name: placeName,
            checked_in: checked_status,
        }),
    });
    return checked_in_resp;
}

//CHECKING OUT
async function checked_out(placeName, checked_status) {
    const checked_out_request = new Request("../php/checked_in_out.php");
    const checked_out_resp = await fetch(checked_out_request, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            location_name: placeName,
            checked_out: checked_status,
        }),
    });
    return checked_out_resp;
}

//ADD BALANCE
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
        .then((resp) => resp.json())
        // TODO: switch console.log to actual action
        .then((rsc) => console.log(rsc));
}
