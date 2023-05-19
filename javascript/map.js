//Function for showing the map and pins on it.
async function show_map() {
  // add bg image in css using id #map
  await get_all_locations();
  (async () => {
    await allChecked();
  })();
}

//Function for creating the pins on the map and eventListners   on the pins
// TODO: hitta sätt att placera ut pins på ett bra sätt
async function createPin(placeName, parent, state) {
  let div = document.createElement("div");
  div.classList.add("pin");
  // if (placeName.includes("_")) {
  //   ;
  // }
  div.innerHTML = `
        <div id='pin_${placeName.replace(" ", "_")}' class='location_pin'>
            <img class='pin_img' src='../images/pin.png'>
            <p>${placeName.replace("_", " ")}</p>
        </div>
    `;

  parent.append(div);

  if (state == true) {
    div.querySelector(".pin_img").classList.add("done");
  }
}

//Function for getting all of the locations and creates a pin
//for each location using the createPin function
async function get_all_locations() {
  //Clears the mainContent befor filling it again.
  let mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
  mainContent.style.backgroundImage = "url('../images/Map3.png')";
  mainContent.style.backgroundSize = "107% 114%";
  mainContent.style.backgroundRepeat = "no-repeat";
  mainContent.style.position = "relative";

  mainContent.style.backgroundPositionX = "-17px";
  mainContent.style.backgroundPositionY = "-20px";
  //<img  src = "../images/Map3.png">
  // let all_places = await all_places_request();
  let user_id = localStorage.getItem("user_id");
  let user = await get_one_user(user_id);

  user["locations"].forEach((user_location) => {
    if (user_location.checked_out == true && user_location.location_name != "introduction") {
      createPin(user_location.location_name, document.getElementById("mainContent"), true);
    } else if (user_location.location_name != "introduction") {
      createPin(user_location.location_name, document.getElementById("mainContent"), false);
    }
  });

  let background = document.createElement("div");
  background.classList.add("background");
  document.getElementById("mainContent").appendChild(background);

  let all_pins = document.querySelectorAll(".location_pin");
  all_pins.forEach((pin) => {
    pin.querySelector("img").addEventListener("click", function checkPin(event) {
      if (event.target == this) {
        if (this.classList.contains("done")) {
          pin.removeEventListener("click", checkPin, true);
        } else {
          // background.style.backgroundColor="red";
          let placeName = this.nextElementSibling.innerText;
          create_pop_up(placeName, this.parentNode);
        }
      }
    });
  });
}

//Creates the pop_up for the location.
function create_pop_up(placeName, parent) {
  let overlay = document.createElement("div");
  overlay.id = "pop_up_div";

  overlay.innerHTML = `
                <p>${placeName.toUpperCase()}</p>
                <button class='check_in'>Jag är här!</button>
            `;

  // NOTE: change type with switch or if on location name depending on location
  parent.append(overlay); // TODO: this creates multiple overlays if clicked more than once!
  overlay.querySelector("button").addEventListener("click", function () {
    console.log(overlay.querySelector("p").innerText);
    fill_content(
      overlay.querySelector("p").innerText.toLocaleLowerCase(),
      "mainContent",
      "password"
    );
  });

  let newSpan = document.createElement("span");
  newSpan.classList.add("close");
  newSpan.textContent = "x";
  overlay.appendChild(newSpan);
  newSpan.onclick = function () {
    overlay.style.display = "none";
    // document.querySelector(".background").backgroundColor = "blue";
  };

  window.onclick = function (event) {
    if (event.target == document.querySelector("#main")) {
      overlay.style.display = "none";
    }
  };

  document.querySelector(".background").addEventListener("click", function () {
    overlay.style.display = "none";
  });

  // window.onclick = function (event) {
  //   if (event.target == document.querySelector("#main")) {
  //     overlay.style.display = "none";
  //   }
  // };
}
