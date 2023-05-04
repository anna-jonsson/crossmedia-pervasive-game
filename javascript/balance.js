//SHOWING THE CURRENT BALANCE IN HTML for all of the locations
async function show_current_balance() {
  let sum = [];
  let places = await all_places_request();

  places.forEach((place) => {
    let one_sum = place.current_balance;
    sum.push(one_sum);
  });
  //Deletes the first value in tha array with slice because it's undefined.
  //Then adding all of the values in the array to one with reduce()
  let total = sum.slice(1).reduce((a, b) => a + b + 0);
  document.querySelector("#balance").innerText = "Saldo: " + total + " kr";
  return total;
}

//Function for adding to balance and also in the singel objects
//to the individual current_balance
async function add_to_balance(placeName, password) {
  //awaits the password_check and the place_request
  let password_check = await check_password(placeName, password);
  let place = await place_request(placeName);

  //If the response is OK (200) the place(current_balance) will add the new sum to the objecs, and alo updates the current_balance for all of the places
  if (password_check === 200) {
    let placeBalance = (place.current_balance = 1000);
    let updateObjectBalance = await patch_balance(placeName, placeBalance);
    show_current_balance();
    //Returns the updatedObjectBalance (place current_balance)
    return updateObjectBalance;
  }// else {
    //Sends error incase the input is wrong.
  //  user_feedback(400, placeName);
  //}
}

//DIRECT CODE
//Running the function to show the current balance all the time.
show_current_balance();
