// export {test}

//GET
//PLACE REQUEST
//Getter for all of the places in the array (all objects)
async function all_places_request() {
  const placesRequest = new Request("../php/get_location.php?all_locations");
  const placesResp = await fetch(placesRequest);
  const placesRsc = await placesResp.json();
  return placesRsc;
}

//Getter for one place baserd on the location name.
async function place_request(placeName) {
  const placeRequest = new Request("../php/get_location.php?location_name=" + placeName);
  const placeResp = await fetch(placeRequest);
  const placeRsc = await placeResp.json();
  return placeRsc;
}

//Getter function for all final questions
async function get_finale_questions() {
  const questionsRequest = new Request("../php/finale.php?all_questions");
  const questionResponse = await fetch(questionsRequest);
  const questionResource = await questionResponse.json();

  return questionResource;
}

//CHECK PASSWORD
//getter for the password for the location.
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
async function patch_balance(placeName, balance) {
  const balanceRequest = new Request("../php/balance.php");
  const balance_response = await fetch(balanceRequest, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location_name: placeName,
      current_balance: balance,
    }),
  });
  const balance_resource = await balance_response.json();
  return balance_resource;
}

//POST
//Post_request for logIn
async function logIn_request(username, password) {
  const logInRequest = new Request("../php/logIn.php");
  const logInResponse = await fetch(logInRequest, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  return logInResponse.status;
}
