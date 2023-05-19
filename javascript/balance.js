//SHOWING THE CURRENT BALANCE IN HTML for all of the locations
async function show_current_balance() {
  let users = await get_all_users();
  let saldo;

  users.forEach((user) => {
    if (user.user_id == localStorage.getItem("user_id")) {
      saldo = user.current_balance;
      return (document.querySelector("#balance").innerText = "Saldo: " + saldo + " kr");
    }

    // document.querySelector("#balance").appendChild(balanceElement);
  });
  //Deletes the first value in tha array with slice because it's undefined.
  //Then adding all of the values in the array to one with reduce()
  // let total = sum.slice(1).reduce((a, b) => a + b + 0);
  // document.querySelector("#balance").innerText = "Saldo: " + total + " kr";
}

//Function for adding to balance and also in the singel objects
//to the individual current_balance
async function add_to_balance(placeName, password) {
  //awaits the password_check and the place_request
  let password_check = await check_password(placeName, password);

  let userId = localStorage.getItem("user_id");
  //If the response is OK (200) the place(current_balance) will add the new sum to the objecs, and alo updates the current_balance for all of the places
  if (password_check === 200) {
    let addedSum = 1000;
    let updatedBalance = await patch_balance(userId, addedSum);

    return show_current_balance(), updatedBalance;
    //Returns the updatedObjectBalance (place current_balance)
    // return updateObjectBalance;
  } // else {
  //Sends error incase the input is wrong.
  //  user_feedback(400, placeName);
  //}
}

async function add_custom_balance(placeName, amount, password) {
  //If the response is OK (200) the place(current_balance) will add the new sum to the objecs, and alo updates the current_balance for all of the places
  let password_check = await check_password(placeName, password);

  let userId = localStorage.getItem("user_id");
  //If the response is OK (200) the place(current_balance) will add the new sum to the objecs, and alo updates the current_balance for all of the places
  if (password_check === 200) {
    let updatedBalance = await patch_balance(userId, amount);

    return show_current_balance(), updatedBalance;
  }
}
//DIRECT CODE
//Running the function to show the current balance all the time.
show_current_balance();
