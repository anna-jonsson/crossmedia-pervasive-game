// import startup from "wordle.js";

// re-useable fn to fill div content based on the location_name, div id and type ("text, password, checkbox etc ")
async function fill_content(placeName, div_id, type) {
  let location = await place_request(placeName);
  checked_in(placeName, true);

  let wrapper = document.getElementById(div_id);

  wrapper.style.backgroundImage = `url(../images/${location.background_picture})`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";

  wrapper.innerHTML = `
        <div class='location'>
            <div class='locationText'>${location.intro_text}</div>
            <button class='nextBtn'>Gå vidare</button>
        </div>
    `;

  //Button for the riddle, showing the riddle text when clicking it
  let btnRiddle = document
    .querySelector(".nextBtn")
    .addEventListener("click", function () {
      wrapper.innerHTML = `
            <div class='riddle'>
                <div class='riddleText'>${location.riddle_text}</div>
                <button class='taskBtn'>Jag har hittat dit!</button>
            </div>
        `;
      //Button for showing the task text with the type (password, checkbox etc.)
      let btnTask = document
        .querySelector(".taskBtn")
        .addEventListener("click", function () {
          if (placeName == "möllan") {
            wrapper.innerHTML="";
            startup();
          }
          else{

            wrapper.innerHTML = ` 
              <div class='task'>
                  <div class='taskText'>${location.task_text}</div>
                  <input class='pw_input' type=${type}></input>
                  <button class='pwBtn'>Skicka svar</button>
              </div>
              `;
            //Checking that the password for the task is correct with funciton check_password.
            let btnPassword = document.querySelector(".pwBtn");
            btnPassword.addEventListener("click", async function () {
              let password = document.querySelector(".pw_input").value;
              let passwordCheck = await check_password(placeName, password);
              //Sending feedback to the user based on the input (correct/incorrect)
              user_feedback(passwordCheck, placeName);
  
              await add_to_balance(placeName, password);
            });
          }
        });
    });
}

//Function for user feedback based on the response status connected to the location name.
function user_feedback(response, location_name) {
  let wrong_input = "Det är fel lösenord. Vänligen försök igen";
  let server_error,
    default_error = "Ooops! Något gick fel, prova igen!";
  let correct_input = "Grattis, ni klarade det!";

  if (response == 500) {
    alert(server_error);
  } else if (response == 400) {
    alert(wrong_input);
  } else if (response == 200) {
    alert(correct_input);
    checked_out(location_name, true);
  } else {
    alert(default_error);
  }
}