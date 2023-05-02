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

  document
    .querySelector(".location_pin")
    .addEventListener("click", create_pop_up(placeName, document.querySelector(".location_pin")));
}

//Function for getting all of the locations and creates a pin
//for each location using the createPin function
async function get_all_locations() {
  let all_places = await all_places_request();
  //all_places.map(place => { if (place.location_name != "introduction") { console.log(place.location_name); } });

  all_places.forEach((place) => {
    createPin(place.location_name, document.querySelector("#mainContent"));
  });
}

//Creates the pop_up for the location.
function create_pop_up(placeName, parent) {
  let overlay = document.createElement("div");
  overlay.innerHTML = `
                <p>${placeName}</p>
                <button class='check_in'>Jag är här!</button>
            `;
  //TO DO : add this.
  parent.addEventListener("click", function () {
    // NOTE: change type with switch or if on location name depending on location
    parent.append(overlay);
    fill_content(placeName, "#mainContent", "password");
  });
}
