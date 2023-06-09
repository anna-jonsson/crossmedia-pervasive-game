// re-useable fn to fill div content based on the location_name, div id and type ("text, password, checkbox etc ")

async function fill_content(placeName, div_id, type) {
  let location = await place_request(placeName.replace("_", " "));
  let userId = localStorage.getItem("user_id");
  checked_in(userId, placeName, true);

  let wrapper = document.getElementById(div_id);

  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";
  wrapper.style.backgroundSize = "cover";
  wrapper.style.backgroundPosition = "center";

  if (placeName == "finalen") {
    wrapper.style.backgroundImage = 'url(../images/startpage.jpeg)';
    wrapper.innerHTML = `
    <div class='location' id='styling_${placeName}'>
        <div class='locationText'>Ni möts av ett meddelande som ljuder ur informationssystemet i staden: "Vänligen bege er mot startplatsen, där ni började dagen, för att erhålla lösenordet till finalen"...</div>
        <button class='nextBtn'>Vi är på startplatsen</button>
    </div>
`;

    let btnNext = document.querySelector(".nextBtn");
    btnNext.addEventListener("click", function () {
      wrapper.innerHTML = `
        <div class='finalPW'>
            <input type="password"></input>
            <button class='final_pw_btn'>Skicka</button>
        </div>
    `;
      let btnFinalPW = document.querySelector('.final_pw_btn');
      console.log(btnFinalPW);
      btnFinalPW.addEventListener('click', function () {
        if (document.querySelector('.finalPW input').value == "anarki") {
          window.location.href = "../html/final.html";
        } else {
          user_feedback(400, "finalen");
        }
      });
    });


  } else {
    wrapper.style.backgroundImage = `url(../images/${location.background_picture})`;
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
                <button class='giveUpBtn'>Jag ger upp</button>
            </div>
        `;

      // Button for giving up and returning to the map
      let btnGiveUp = document.querySelector(".giveUpBtn").addEventListener("click", function () {
        let popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
      <div class="feedbackPopup">
        <p>Är du säker att du vill ge upp?</p>
        <div class="popup-buttons">
          <button class="popup-confirm">Ja</button>
          <button class="popup-cancel">Nej</button>
        </div>
      </div>
    `;

        let confirmBtn = popup.querySelector(".popup-confirm");
        let cancelBtn = popup.querySelector(".popup-cancel");

        confirmBtn.addEventListener("click", function () {
          popup.remove();
          let userId = localStorage.getItem("user_id");
          checked_out(userId, placeName, true);
          show_map();
        });

        cancelBtn.addEventListener("click", function () {
          popup.remove();
        });

        document.body.appendChild(popup);

      });

      //Button for showing the task text with the type (password, checkbox etc.)
      let btnTask = document.querySelector(".taskBtn").addEventListener("click", async function () {
        if (placeName == "möllan") {
          wrapper.innerHTML = "";
          startup();

          document.getElementById("wordleBtn").addEventListener("click", function () {
            document.querySelector(".grid").style.backgroundColor = "black";
            document.querySelector(".grid").style.backgroundImage = "none";

            document.getElementById("keyboard-cont").style.display = "flex";

            document.getElementById("wordleBtn").style.display = "none";

            document.getElementById("game").style.flexDirection = "column-reverse";

            const boxes = document.querySelectorAll(".box");
            boxes.forEach((box) => {
              box.style.visibility = "visible";
            });
          });
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
                  <button class='giveUpBtn'>Jag ger upp</button>
              </div>
              `;
          // Button for giving up and returning to the map
          let btnGiveUp = document.querySelector(".giveUpBtn").addEventListener("click", function () {
            let popup = document.createElement("div");
            popup.className = "popup";
            popup.innerHTML = `
      <div class="feedbackPopup">
        <p>Är du säker att du vill ge upp?</p>
        <div class="popup-buttons">
          <button class="popup-confirm">Ja</button>
          <button class="popup-cancel">Nej</button>
        </div>
      </div>
    `;

            let confirmBtn = popup.querySelector(".popup-confirm");
            let cancelBtn = popup.querySelector(".popup-cancel");

            confirmBtn.addEventListener("click", function () {
              popup.remove();
              let userId = localStorage.getItem("user_id");
              checked_out(userId, placeName, true);
              show_map();
            });

            cancelBtn.addEventListener("click", function () {
              popup.remove();
            });

            document.body.appendChild(popup);
          });

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
}

//Function for user feedback based on the response status connected to the location name.
function user_feedback(response, location_name) {
  let wrong_input = "Det är fel lösenord. Vänligen försök igen";
  let server_error,
    default_error = "Ooops! Något gick fel, prova igen!";
  let correct_input = "Grattis, ni klarade det!";
  let triangeln_highscore = `Bra jobbat! Din högsta poäng blev: ${localStorage.getItem(
    "high-score"
  )}`;

  let intro = "Klicka på platsikonen \n för att läsa mer om platsen.";
  let p = document.createElement("p");
  let newDiv = document.createElement("div");
  let newSpan = document.createElement("span");

  if (response == 200 && location_name == "logIn") {
    startpage("introduction", "mainContent");
  } else {
    newDiv.classList.add("feedbackPopup");
    if (response == 200 && location_name == "triangeln") {
      p.textContent = triangeln_highscore;
    } else {
      p.textContent =
        response == 200
          ? correct_input
          : response == 400
            ? wrong_input
            : response == 500
              ? server_error
              : default_error;

    }
  }

  if (
    response == 400 ||
    response == 500 ||
    response == default_error ||
    location_name == "introduction"
  ) {
    newSpan.classList.add("close");
    newDiv.appendChild(newSpan);
    newSpan.textContent = "x";

    // When the user clicks on <span> (x), close the modal
    newSpan.onclick = function () {
      newDiv.style.display = "none";
    };
  }

  newDiv.appendChild(p);
  document.body.appendChild(newDiv);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == document.querySelector("#main")) {
      newDiv.style.display = "none";
    }
  };

  if (response == 200 && location_name != "logIn") {
    if (location_name == "introduction") {
      show_map();
      p.textContent = intro;
    } else {
      let mapButton = document.createElement("button");
      mapButton.innerHTML = "Till kartan";
      mapButton.addEventListener("click", function () {
        show_map();
        newDiv.style.display = "none";
      });
      newDiv.appendChild(mapButton);
      let userId = localStorage.getItem("user_id");
      checked_out(userId, location_name, true);
    }
  }
}
