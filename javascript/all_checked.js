//Function for checking that the user has checked in at all 7 places ("introduction" is included)
async function allChecked() {
  //User id from localstorage
  let userId = localStorage.getItem("user_id");
  //Gets all the users
  const all_users = await get_all_users();
  //Empty array for the checked in status
  let checked_in_locations = [];
  //Loops through the user array and checks that the id from localstorage is the same
  //as the id in the request
  all_users.forEach((user) => {
    if (user.user_id == userId)
      //Loopingg through the array of locations in the selected user
      user["locations"].forEach((location) => {
        //Checked in status
        let check = location.checked_in;
        //If its set to true the value will be pushed in the empty array
        if (check == true) {
          //do something here!
          checked_in_locations.push(check);
        }
      });
  });

  //Checks so that the array lengh is 7 (all values checked_in = true)
  if (checked_in_locations.length === 7) {
    //Here the code to enter the  final will run
    //-----------------FINAL CODE HERE-----------------------

    console.log("klart välkommen till finalen");
  } else {
    //Returns nothing /does nothing . maybe delete the else
    console.log("du är inte klar ännu, utan måste checka in på alla platser för att nå finalen.");
  }
  //Returns the array of checked_in status
  return checked_in_locations;
}

async function finalPin(parent) {
  let div = document.createElement("div");
  div.classList.add("pin");
  // if (placeName.includes("_")) {
  //   ;
  // }

  let placeName = "Final!";
  div.innerHTML = `
          <div id='pin_final' class='location_pin' >
              <img class='pin_img' src='../images/pin.png'>
              <p>${placeName}</p>
          </div>
      `;

  parent.append(div);
}

//Direct code - this will run all the time
