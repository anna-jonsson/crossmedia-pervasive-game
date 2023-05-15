async function showQuestion() {
  let all_questions = await get_finale_questions();

  all_questions.forEach((location) => {
    let finale_div = document.createElement("div");
    finale_div.classList.add("finale_question");
    finale_div.innerHTML = `
    <div id = finale_wrapper> 
    <h2>${location.location_name}</h2>
    <div id = answers> 
        <form>
        <input type="radio" value = 'question' checked />
        <label>${location.incorrectAnswer1}</label>

        </form>
    </div>
    `;

    document.getElementById("mainContent").append(finale_div);
  });
}
