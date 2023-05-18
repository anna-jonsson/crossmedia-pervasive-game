// async function showQuestion() {
//   let all_questions = await get_finale_questions();

//   all_questions.forEach((location) => {
//     let finale_div = document.createElement("div");
//     finale_div.classList.add("finale_question");
//     finale_div.innerHTML = `
//     <div id = finale_wrapper>
//     <h2>${location.location_name}</h2>
//     <div id = answers>
//         <form>
//         <input type="radio" value = 'question' checked />
//         <label>${location.incorrectAnswer1}</label>

//         </form>
//     </div>
//     `;

//     document.getElementById("mainContent").append(finale_div);
//   });
// }

function selectQuiz() {
  document.getElementById("clock").style.visibility = "hidden";
  let btnPlayQuiz = document.createElement("div");
  btnPlayQuiz.id = "button-play";
  btnPlayQuiz.innerHTML = `
      <button id = "btnPlayQuiz"> Play quiz </button>`;
  document.body.appendChild(btnPlayQuiz);
  //When you click on the play button
  let click = document.getElementById("button-play");
  click.addEventListener("click", function () {
    playQuiz();
  });
}

let categoryName = "";

let selectList = null;
let questionNumber = 1;

function playQuiz() {
  document.querySelector(".title").remove();
  document.getElementById("clock").style.visibility = "visible";
  document.getElementById("wrapper-category").style.display = "none";
  document.getElementById("input-fields").style.display = "none";
  document.getElementById("button-play").style.display = "none";

  let clockDiv = document.getElementById("clock");
  let clock = document.createElement("SPAN");
  clock.id = "seconds";
  clock.innerHTML = "5";
  clockDiv.appendChild(clock);

  timeLeft = 5;
  //Countdown timer on the quiz
  function countdown() {
    timeLeft--;
    document.getElementById("seconds").innerHTML = String(timeLeft);
    if (timeLeft > 0) {
      setTimeout(countdown, 1000);
    } else if (timeLeft == 0) {
      document.getElementById("clock").style.display = "none";
      let overviewQuiz = document.getElementById("wrapper-quiz");
      let infoQuiz = document.getElementById("info-quiz");
      let timer = document.createElement("div");
      timer.className = "timer";
      infoQuiz.appendChild(timer);
      let time_txt = document.createElement("div");
      time_txt.className = "time_left_txt";
      time_txt.innerHTML = "Timer";
      timer.appendChild(time_txt);
      let timer_sec = document.createElement("div");
      timer_sec.className = "timer_sec";
      timer_sec.innerHTML = "20";
      timer.appendChild(timer_sec);

      startTimer(20);

      let quizTitle = document.createElement("div");
      quizTitle.id = "quiz-title";
      infoQuiz.appendChild(quizTitle);

      let questionCount = document.createElement("div");
      questionCount.id = "question-count";
      infoQuiz.appendChild(questionCount);

      let question = document.createElement("div");
      question.id = "question";
      infoQuiz.appendChild(question);

      let userScore = 0;
      //Create each div of the answers
      for (let i = 0; i < 4; i++) {
        let answerBox = document.createElement("div");
        answerBox.className = "box-answer";
        answerBox.id = "box-answer" + `${i}`;
        overviewQuiz.appendChild(answerBox);
        let input = document.createElement("input");
        input.id = "input";
        input.type = "radio";

        input.name = "radio";
        answerBox.appendChild(input);

        let label = document.createElement("label");
        label.id = "label" + `${i}`;
        answerBox.appendChild(label);

        let radioButtons = document.querySelectorAll('input[name="radio"]');
        console.log(radioButtons.length);

        input.addEventListener("click", () => {
          let i = 0;
          for (let radioButton of radioButtons) {
            if (radioButton.checked) {
              let label = document.getElementById("label" + `${i}`);
              let color = document.getElementById("box-answer" + `${i}`);

              clearInterval(counter);
              if (correctAnswer == label.textContent) {
                color.style.backgroundColor = "green";
                userScore += 1;
                console.log(userScore);

                let radioButtons = document.querySelectorAll(
                  'input[name="radio"]'
                );
                for (let radioButton of radioButtons) {
                  radioButton.disabled = true;
                }
              } else {
                color.style.backgroundColor = "red";
                setCorrectAnswer();
              }
              nextQuestion.style.visibility = "visible";
            }
            if (`${questionNumber}` == `${data.length}`) {
              let finish = document.getElementById("results");
              finish.style.visibility = "visible";
              nextQuestion.style.visibility = "hidden";
            }
            i++;
          }
        });
      }
      let nextQuestion = document.createElement("button");
      nextQuestion.id = "next-question";
      nextQuestion.innerHTML = "Next Question";
      overviewQuiz.appendChild(nextQuestion);
      nextQuestion.style.visibility = "hidden";

      nextQuestion.addEventListener("click", () => {
        clearInterval(counter);
        startTimer(timeValue);
        questionNumber++;
        nextQuestion.style.visibility = "hidden";
        clearAnswerColor();
        clearButtonSelect();
        showQuestion();
      });
      getQuizQuestion();

      let showResults = document.createElement("button");
      showResults.id = "results";
      showResults.innerHTML = "Finish";
      overviewQuiz.appendChild(showResults);
      showResults.style.visibility = "hidden";

      showResults.addEventListener("click", () => {
        let hiddenTimer = document.getElementsByClassName("timer");
        hiddenTimer[0].style.visibility = "hidden";
        let hiddenQuestion = document.getElementById("question");
        hiddenQuestion.style.visibility = "hidden";
        let hiddenWrapperQuiz = document.getElementById("wrapper-quiz");
        hiddenWrapperQuiz.style.visibility = "hidden";
        showResults.style.visibility = "hidden";
        document.getElementById("quiz-title").innerHTML =
          "Quiz with user questions";

        let results_box = document.getElementById("question-count");
        results_box.innerHTML =
          "Score: " + `${userScore}` + " of " + `${data.length}`;

        let pictureFinish = document.createElement("div");
        pictureFinish.id = "Finish-logo";
        pictureFinish.innerHTML = `
              
             `;
        infoQuiz.appendChild(pictureFinish);

        function addZero(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        //Results - date and time
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        let h = addZero(date.getHours());
        let m = addZero(date.getMinutes());
        let s = addZero(date.getSeconds());
        let time = h + ":" + m + ":" + s;

        let current_time = console.log(currentDate);

        let dateInfo = document.createElement("div");
        dateInfo.id = "date";
        dateInfo.innerHTML = "Date" + ": " + currentDate;
        infoQuiz.appendChild(dateInfo);

        let timeInfo = document.createElement("div");
        timeInfo.id = "time";
        timeInfo.innerHTML = "Time" + ": " + time;
        infoQuiz.appendChild(timeInfo);

        let backToMenu = document.createElement("button");
        backToMenu.id = "back-menu";
        backToMenu.innerHTML = "Back to menu";
        infoQuiz.appendChild(backToMenu);

        backToMenu.addEventListener("click", () => {
          location.href = "home-account.html";
        });
      });
    }
  }
  let timeTex = document.getElementsByClassName("time_left_txt");
  let timeCount = document.getElementsByClassName("timer_sec");

  let timeValue = 20;
  let counter = 0;
  //The big time of the white page
  function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
      timeCount[0].textContent = time;
      time--;
      if (time < 9) {
        timeCount[0].textContent = "0" + timeCount[0].textContent;
      }

      if (time < 0 && questionNumber < data.length) {
        clearInterval(counter);
        timeTex[0].textContent = "Timer";
        setCorrectAnswer();
        let showNextQuestion = document.getElementById("next-question");
        showNextQuestion.style.visibility = "visible";
      } else if (questionNumber == data.length && time < 0) {
        clearInterval(counter);
        timeTex[0].textContent = "Timer";
        setCorrectAnswer();
        let findShowResults = document.getElementById("results");
        findShowResults.style.visibility = "visible";
      }
    }
  }

  //Check if answer is correct
  function setCorrectAnswer() {
    for (i = 0; i < 4; i++) {
      let label = document.getElementById("label" + `${i}`);
      let color = document.getElementById("box-answer" + `${i}`);
      if (correctAnswer == label.textContent) {
        color.style.backgroundColor = "green";
      }
    }

    let radioButtons = document.querySelectorAll('input[name="radio"]');
    for (let radioButton of radioButtons) {
      radioButton.disabled = true;
    }
  }
  //Answer-color resets
  function clearAnswerColor() {
    for (i = 0; i < 4; i++) {
      let color = document.getElementById("box-answer" + `${i}`);
      color.style.backgroundColor = "";
    }
  }
  //Button resets
  function clearButtonSelect() {
    let radioButtons = document.querySelectorAll('input[name="radio"]');
    for (let radioButton of radioButtons) {
      radioButton.checked = false;
      radioButton.disabled = false;
    }
  }

  setTimeout(countdown, 1000);
}
let data = [];
let correctAnswer = "";

//Find the local API with questions
async function getQuizQuestion() {
  let response = await fetch(`../json/final.json`);
  data = await response.json();

  showQuestion();
}
// Show the question from the local API with questions
function showQuestion() {
  let questionCounter = document.getElementById("question-count");
  questionCounter.innerText = `${questionNumber}` + "/" + `${data.length}`;

  let question = document.getElementById("question");
  question.innerHTML = data[questionNumber - 1].question;
  let quizTitle = document.getElementById("quiz-title");
  quizTitle.innerHTML = data[questionNumber - 1].location_name.toUpperCase();
  console.log(data);

  let answers = [
    data[questionNumber - 1].incorrectAnswer1,
    data[questionNumber - 1].incorrectAnswer2,
    data[questionNumber - 1].incorrectAnswer3,
  ];
  answers.push(data[questionNumber - 1].correctAnswer);
  console.log(answers);
  correctAnswer = data[questionNumber - 1].correctAnswer;

  let shuffledArray = answers.sort((a, b) => 0.8 - Math.random());
  console.log(shuffledArray);

  for (let i = 0; i < 4; i++) {
    let addAnswer = document.getElementById("label" + `${i}`);
    addAnswer.textContent = shuffledArray[i];
  }
}

selectQuiz();
