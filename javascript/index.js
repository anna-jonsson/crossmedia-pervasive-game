// re-useable fn to fill content with 
async function fill_content(placeName, div_id, type) {

    let location = await place_request(placeName);
    let wrapper = document.getElementById(div_id);
    wrapper.style.backgroundImage = `url(../images/${location.background_picture})`;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.width = '400px';
    wrapper.style.height = '600px';

    wrapper.innerHTML = `
        <div class='location'>
            <div class='locationText'>${location.intro_text}</div>
            <button class='nextBtn'>Gå vidare</button>
        </div>
    `;

    let btnRiddle = document.querySelector('.nextBtn').addEventListener('click', function () {
        wrapper.innerHTML = `
            <div class='riddle'>
                <div class='riddleText'>${location.riddle_text}</div>
                <button class='taskBtn'>Jag har hittat dit!</button>
            </div>
        `;

        let btnTask = document.querySelector('.taskBtn').addEventListener('click', function () {
            wrapper.innerHTML = ` 
            <div class='task'>
                <div class='taskText'>${location.task_text}</div>
                <input class='pw_input' type=${type}></input>
                <button class='pwBtn'>Skicka svar</button>
            </div>
            `;

            let btnPassword = document.querySelector('.pwBtn');
            btnPassword.addEventListener('click', async function () {
                let password = document.querySelector('.pw_input').value;
                let passwordCheck = await check_password(placeName, password);
                user_feedback(passwordCheck);

            });
        });

    });

}

function user_feedback(response) {

    let wrong_input = "Det är fel lösenord. Vänligen försök igen";
    let server_error, default_error = "Ooops! Något gick fel, prova igen!";
    let correct_input = "Grattis, ni klarade det!";

    //Kanske byta ut response till type

    if (response == 500) {
        alert(server_error);
    } else if (response == 400) {
        alert(wrong_input);
    } else if (response == 200) {
        alert(correct_input);
    } else {
        alert(default_error);
    }
}


