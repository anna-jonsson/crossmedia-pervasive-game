// fill_content('introduction', 'mainContent', 'text')

// re-useable fn to fill content with
async function startpage(placeName, div_id, response) {
  let location = await place_request(placeName);
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

  document.querySelector(".nextBtn").addEventListener("click", function () {
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
      }
    });
  });

  if (localStorage.getItem("friisgatan") !== null) {
    localStorage.clear();
    await show_map();
  }
}

startpage("introduction", "mainContent");
