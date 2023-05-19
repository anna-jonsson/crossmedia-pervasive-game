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
  if (checked_in_locations.length === 6) {
    //Here the code to enter the  final will run
    //-----------------FINAL CODE HERE-----------------------
    await finalPin(document.querySelector("#mainContent"));
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

  let placeName = "FINAL";
  div.innerHTML = `
          <div id='pin_final' class='location_pin' >
              <img class='pin_img' src='../images/pin.png'>
              <p>${placeName} </p>
          </div>
      `;

  parent.append(div);

  document.querySelector("#pin_final").addEventListener("click", async function () {
    ////F-----------------FINALE CODE HERE!----------
  });
}

//RUN THIS WHEN THE GAME IS OVER TO GET TO THE "BRA SPELAT";
async function endGame() {
  let wrapper = document.querySelector("#mainContent");
  wrapper.style.backgroundImage = `url(../images/startpage.jpeg)`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";
  wrapper.innerHTML = `
  <div id ="endWrapper" class='locationText logInWrapper'>
  <h2>BRA SPELAT!</h2>
  <p>Klicka på knappen för att se hur ni ligger till.</p>
  <button class='score_button'>SCOREBOARD</button>
  </div>
  `;

  document.querySelector(".score_button").addEventListener("click", async function () {
    //SCOREBOARD FUNCTION
    await scoreBoard();
  });
}

async function scoreBoard() {
  let userID = localStorage.getItem("user_id");
  let allUsers = await get_all_users();
  let wrapper = document.querySelector("#mainContent");
  wrapper.style.backgroundImage = `url(../images/startpage.jpeg)`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";
  wrapper.innerHTML = `
  <div id ="scoreWrapper" class='locationText logInWrapper'>
  <h2>SCOREBOARD</h2>
  <ol type = "1"></ol>
  <button class='exit_button'>Exit</button>

  
  </div>
  `;
  allUsers.forEach((user) => {
    // list.innerHTML = `
    //     <li>${user.current_balance}</li>
    // `;

    let item = document.createElement("li");
    item.innerHTML = `
    <div><h4> Team: ${user.username}   Score: ${user.current_balance}<h4>
    </div>
    `;

    // item.innerHTML = user.current_balance;
    document.querySelector("ol").append(item);
  });
}
