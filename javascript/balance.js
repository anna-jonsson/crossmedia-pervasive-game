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
  console.log(total);
  document.querySelector("#balance").innerText = "Saldo: " + total + " kr";
}

show_current_balance();
