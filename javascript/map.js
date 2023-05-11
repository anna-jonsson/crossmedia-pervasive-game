//Function for showing the map and pins on it.
async function show_map() {
  // add bg image in css using id #map
  await get_all_locations();
}

//Function for creating the pins on the map and eventListners   on the pins
// TODO: hitta sätt att placera ut pins på ett bra sätt
async function createPin(placeName, parent) {
  let div = document.createElement("div");
  div.classList.add("pin");
  div.innerHTML = `
        <div class='location_pin'>
            <img class='pin_img' src='../images/pin.png'>
            <p>${placeName}</p>
        </div>
    `;

  parent.append(div);
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

  mainContent.style.backgroundPositionX = "-17px";
  mainContent.style.backgroundPositionY = "-20px";
  //<img  src = "../images/Map3.png">
  let all_places = await all_places_request();

  all_places.forEach((place) => {
    if (place.location_name !== "introduction") {
      createPin(place.location_name, document.getElementById("mainContent"));
    }
  });

  let all_pins = document.querySelectorAll(".location_pin");
  all_pins.forEach((pin) => {
    pin.querySelector("img").addEventListener("click", function (event) {
      if (event.target == this) {
        let placeName = this.nextElementSibling.innerText;
        create_pop_up(placeName, this.parentNode);
      }
    });
  });
}

//Creates the pop_up for the location.
function create_pop_up(placeName, parent) {
  let overlay = document.createElement("div");
  overlay.innerHTML = `
                <p>${placeName}</p>
                <button class='check_in'>Jag är här!</button>
            `;

  // NOTE: change type with switch or if on location name depending on location
  parent.append(overlay); // TODO: this creates multiple overlays if clicked more than once!
  overlay.querySelector("button").addEventListener("click", function () {
    console.log(overlay.querySelector("p").innerText);
    fill_content(overlay.querySelector("p").innerText, "mainContent", "password");
  });
}
