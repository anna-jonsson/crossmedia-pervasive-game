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

  //Checks so that the array lengh is 6 (all values checked_in = true) OBS the
  //checked in and out on introduction doesnt change thats why its 6 and not 7
  if (checked_in_locations.length === 6) {
    //Awaits the pin for the final and appending it to mainContent
    await finalPin(document.querySelector("#mainContent"));
    console.log("klart välkommen till finalen");
  } else {
    //Returns nothing /does nothing .
    console.log("du är inte klar ännu, utan måste checka in på alla platser för att nå finalen.");
  }
  //Returns the array of checked_in status
  return checked_in_locations;
}

//Creates the extra pin for the finale when all of the places are checked in
async function finalPin(parent) {
  let div = document.createElement("div");
  div.classList.add("pin");

  //HTML for the finale pin
  let placeName = "FINAL";
  div.innerHTML = `
          <div id='pin_final' class='location_pin' >
              <img class='pin_img' src='../images/pin.png'>
              <p>${placeName} </p>
          </div>
      `;
  //Appending it to parent (maminContent) when calling it.
  parent.append(div);

  //Adds event to the pin
  document.querySelector("#pin_final").addEventListener("click", async function () {
    //-----------------FINALE CODE HERE!---------------------
    //When clicking - goes to the final page in html
    fill_content("finalen", "mainContent", "password");

    //-----------------FINALE CODE HERE!---------------------
  });
}

//RUN THIS WHEN THE GAME IS OVER TO GET TO THE "BRA SPELAT" in the end of the final

//Creates the page for the end
async function endGame() {
  //HTML for the last page after the final
  let wrapper = document.querySelector("#info-quiz");
  wrapper.classList.add('final-scoreboard');
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

  //Score button event
  document.querySelector(".score_button").addEventListener("click", async function () {
    //SCOREBOARD FUNCTION
    await scoreBoard();
  });
}

//Function for the scoreboard
async function scoreBoard() {
  //awaits all the users
  let allUsers = await get_all_users();

  allUsers.sort((a, b) => b.current_balance - a.current_balance);
  //HTML for the list
  // let wrapper = document.querySelector("#mainContent");
  let wrapper = document.querySelector("#info-quiz");
  wrapper.style.backgroundImage = `url(../images/startpage.jpeg)`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";
  wrapper.innerHTML = `
  <div id ="scoreWrapper" class='locationText logInWrapper'>
  <h2>SCOREBOARD</h2>
  <ol type = "1"></ol>
  <button class='exit_button'>Uppdatera scoreboard</button>
  </div>
  `;

  document.querySelector(".exit_button").addEventListener("click", async function () {
    console.log("test");
    await scoreBoard();
  });
  //Loops the users and adds the name + score /current balance to an li element
  allUsers.forEach((user) => {
    let item = document.createElement("li");
    item.innerHTML = `
    <div><h4> Team: <span class='scoreSpan'>${user.username.toUpperCase()}</span> <br> Score: <span class='scoreSpan'>${user.current_balance}</span><h4>
    </div>
    `;

    if (user.user_id == localStorage.getItem("user_id")) {
      if (item.innerText.includes(user.username.toUpperCase())) {
        item.classList.add('current_user');
        console.log(item);
      }
    }

    ///Appends it to parent (ol)
    document.querySelector("ol").append(item);
  });
}
