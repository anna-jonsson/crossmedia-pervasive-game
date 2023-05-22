//SHOWING THE CURRENT BALANCE IN HTML for all of the locations
async function show_current_balance() {
  let userID = localStorage.getItem("user_id");
  let users = await get_all_users();
  let saldo;

  users.forEach((user) => {
    if (user.user_id == userID) {
      saldo = user.current_balance;
      document.querySelector("#balance").innerText = "Saldo: " + saldo + " kr";
    }
  });
}

//Function for adding to balance and also in the singel objects
//to the individual current_balance
async function add_to_balance(placeName, password) {
  //awaits the password_check and the place_request
  let password_check = await check_password(placeName, password);

  //user id from local storage
  let userId = localStorage.getItem("user_id");
  //If the response is OK (200) the place(current_balance) will add the new sum to the objecs, and alo updates the current_balance for the user
  if (password_check === 200) {
    //Added sum - IS GOING TO CHANGE TO AN HIGHGER SUM
    let addedSum = 1000;
    //updated balance with the userId and the addedSum
    let updatedBalance = await patch_balance(userId, addedSum);
    //returns the current_balance and updated balance
    return show_current_balance(), updatedBalance;
  }
}

//Add balance - with no set balance
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
