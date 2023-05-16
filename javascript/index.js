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
        <div class='location' id='styling_${placeName}'>
            <div class='locationText'>${location.intro_text}</div>
            <button class='nextBtn'>Gå vidare</button>
        </div>
    `;

  //Button for the riddle, showing the riddle text when clicking it
  let btnRiddle = document.querySelector(".nextBtn").addEventListener("click", function () {
    wrapper.innerHTML = `
            <div class='riddle'>
                <div class='riddleText'>${location.riddle_text}</div>
                <button class='taskBtn'>Jag har hittat dit!</button>
            </div>
        `;

    //Button for showing the task text with the type (password, checkbox etc.)
    let btnTask = document.querySelector(".taskBtn").addEventListener("click", async function () {
      if (placeName == "möllan") {
        wrapper.innerHTML = "";
        startup();
      } else if (placeName == "triangeln") {
        document.querySelector("#mainContent").classList.add("snakeContain");
        init_snake_game();
      } else if (placeName == "friisgatan") {
        window.location.href = "../html/pattern.html";
      } else {
        wrapper.innerHTML = ` 
              <div class='task' >
                  <div class='taskText'>${location.task_text}</div>
                  <input class='pw_input' type=${type}></input>
                  <button class='pwBtn'>Skicka svar</button>
              </div>
              `;

        if (placeName != "knarkrondellen") {
          //Checking that the password for the task is correct with funciton check_password.
          let btnPassword = document.querySelector(".pwBtn");
          btnPassword.addEventListener("click", async function () {
            let password = document.querySelector(".pw_input").value;

            let passwordCheck = await check_password(placeName, password);
            //Sending feedback to the user based on the input (correct/incorrect)
            user_feedback(passwordCheck, placeName);

            await add_to_balance(placeName, password);
          });
        } else {
          document.querySelector("#mainContent");
          // input_fields();
          document.querySelector(".pw_input").style.display = "none";
          await createInputs();
          await input_fields();

          let btnPassword = document.querySelector(".pwBtn");
          btnPassword.addEventListener("click", async function () {
            // document.querySelector("#input_wrapper").innerHTML = "";
            await input_fields();

            let password = localStorage.getItem("knarkrondellen");
            console.log(password);
            let passwordCheck = await check_password(placeName, password);
            //Sending feedback to the user based on the input (correct/incorrect)
            user_feedback(passwordCheck, placeName);

            await add_to_balance(placeName, password);
          });
        }
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
  let intro = "Klicka på platsikonen \n för att läsa mer om platsen.";

  let newDiv = document.createElement("div");
  let newSpan = document.createElement("span");
  let p = document.createElement("p");
  newDiv.classList.add("feedbackPopup");
  newSpan.classList.add("close");
  newDiv.appendChild(newSpan);
  newSpan.textContent = "x";
  newDiv.appendChild(p);
  p.textContent =
    response == 200
      ? correct_input
      : response == 400
        ? wrong_input
        : response == 500
          ? server_error
          : default_error;

  console.log(response);
  console.log("user_feedback");

  // When the user clicks on <span> (x), close the modal
  newSpan.onclick = function () {
    newDiv.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == document.querySelector("#main")) {
      newDiv.style.display = "none";
    }
  };

  document.body.appendChild(newDiv);

  if (response == 200) {
    if (location_name == "introduction") {
      show_map();
      p.textContent = intro;
    } else {
      let mapButton = document.createElement("button");
      mapButton.innerHTML = "Tillbaka till kartan";
      mapButton.addEventListener("click", function () {
        show_map();
        newDiv.style.display = "none";
      });
      newDiv.appendChild(mapButton);
      checked_out(location_name, true);
    }
  }
}
