// fill_content('introduction', 'mainContent', 'text')
// re-useable fn to fill content with
async function startpage(userId, placeName, div_id, response) {
  let balance = document.getElementById("balance")
balance.style.display = "none"
  let location = await place_request(placeName);
  let wrapper = document.getElementById(div_id);
  wrapper.style.backgroundImage = `url(../images/${location.background_picture})`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.width = "400px";
  wrapper.style.height = "600px";

  wrapper.innerHTML = `
  <div id ="logInWrapper" class='locationText'>
  <h2>VÄLKOMMEN!</h2>
  <p>Använd ditt familjenamn och <br> lösenord för att logga in.</p>
  <input class = "username_input" type=text placeholder = "username"></input>
  <input class = "logIn_PW" type=password placeholder = "password"></input>
  <button class='logInBtn'>Logga in</button>
  </div>
  `;

  document.querySelector(".logInBtn").addEventListener("click", async function () {
    let username = document.querySelector(".username_input").value;
    let logIn_PW = document.querySelector(".logIn_PW").value;

    let logInCheck = await logIn_request(username, logIn_PW);

    if (logInCheck == 200) {
      
 balance.style.display = "inline" 
      wrapper.innerHTML = `
        <div class='location'>
        <div class='locationText'>${location.intro_text}</div>
        <button class='nextBtn'>Gå vidare</button>
        </div>
        `;

      document.querySelector(".nextBtn").addEventListener("click", async function () {
        wrapper.innerHTML = `
          <div class='task'>
            <div class='taskTextIntro'>${location.task_text}</div>
            <input type=password></input>
            <button class='taskBtn'>Skicka svar</button>
          </div>
          `;
        document.querySelector(".taskBtn").addEventListener("click", async function () {
          let password = document.querySelector("input").value;
          let passwordCheck = await check_password(placeName, password);

          if (response != 200) {
            user_feedback(passwordCheck, placeName);
          }else {
            show_current_balance(); // Show balance after successful login
          }
          // if (localStorage.getItem("friisgatan") !== null) {
          //   localStorage.clear();
          await show_map();
        });
      });
    } else {
      user_feedback(logInCheck, "logIn");
    }
  });
}

startpage("user_id", "introduction", "mainContent");
