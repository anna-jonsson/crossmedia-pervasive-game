async function fill_content(placeName, div_id, type) {

    let location = await place_request(placeName);
    let wrapper = document.getElementById(div_id);
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
                <input type=${type}></input>
                <button class='taskBtn'>Skicka svar</button>
            </div>
            `;
        });

    });
}

