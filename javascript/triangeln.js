"use strict";

// NOTE: The following bugs are present at this time: 

// * Game over when playing from a previous game over can generate game over pop ups in the middle of the game, even if the game was not lost
// * On the second play turn, the speed from last score (e.g. speed increase from score 5) starts from the beginning of next turn (incorrect)

function countDown(elementName, minutes, seconds, interval_id, highScoreElm) {
    var element, endTime, hours, mins, msLeft, time;
    let balance, totalScore;
    function twoDigits(n) { return (n <= 9 ? "0" + n : n); }

    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();


    function updateTimer() {
        msLeft = endTime - (+new Date);

        if (msLeft < 1000) {
            element.innerHTML = "Time is up!";
            clearInterval(interval_id);
            highScoreElm.classList.add('finished');
            totalScore = localStorage.getItem("high-score");
            if (totalScore > 30) {
                console.log("Your highest score was: " + totalScore);
                add_custom_balance("triangeln", 1200);
            }
            else if (totalScore <= 30 && totalScore >= 20) {
                console.log("Your highest score was: " + totalScore);
                add_custom_balance("triangeln", 1000);
            } else if (totalScore < 20 && totalScore >= 10) {
                console.log("Your highest score was: " + totalScore);
                add_custom_balance("triangeln", 600);
            } else {
                console.log("Your highest score was: " + totalScore);
                add_custom_balance("triangeln", 300);
            }
            setTimeout(() => {
                user_feedback(200, "triangeln");
            }, 1000);
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }
}

function init_snake_game() {
    console.log("Game started");

    document.querySelector('#mainContent').innerHTML = `
    <div class="wrapper snake_game" id="snakeWrapper">
        <div class="game-details snake_game">
            <span class="score">Score: 0</span>
            <span id="countdown"></span>
            <span class="high-score">High Score: 0</span>
        </div>
        <div class="play-board snake_game"></div>
        <div class="controls snake_game">
            <i data-key="ArrowLeft" class="fa-solid fa-arrow-left-long"></i>
            <i data-key="ArrowUp" class="fa-solid fa-arrow-up-long"></i>
            <i data-key="ArrowRight" class="fa-solid fa-arrow-right-long"></i>
            <i data-key="ArrowDown" class="fa-solid fa-arrow-down-long"></i>
        </div>
    </div>
`;

    let gameOver = false;
    let foodX, foodY;
    let snakeX = 5, snakeY = 5;
    let velocityX = 0, velocityY = 0;
    let snakeBody = [];
    let setIntervalId;
    let score = 0;
    let t = 150;
    let timer = 120;
    // let reset = false;

    const playBoard = document.querySelector(".play-board");
    const scoreElement = document.querySelector(".score");
    const highScoreElement = document.querySelector(".high-score");
    const controls = document.querySelectorAll(".controls i");

    // Getting high score from the local storage
    let highScore = localStorage.getItem("high-score") || 0;
    highScoreElement.innerText = `High Score: ${highScore}`;

    const updateFoodPosition = () => {

        // Passing a random 1 - 30 value as food position
        foodX = Math.floor(Math.random() * 30) + 1;
        foodY = Math.floor(Math.random() * 30) + 1;

        // if (score % 1 == 0 && score >= 1) {
        //     // setInterval(initGame, this.interval);
        //     // clearInterval(setIntervalId);
        //     if (!reset) {
        //         t = (t - 5);
        //         setIntervalId = setInterval(initGame, t);

        //     } else {
        //         // clearInterval(setIntervalId);
        //         t = 150;
        //         clearInterval(setIntervalId);
        //         setIntervalId = setInterval(initGame, t);
        //     }
        // }
    };

    // function reset_game() {
    //     gameOver = false;
    //     foodX, foodY;
    //     snakeX = 5, snakeY = 5;
    //     velocityX = 0, velocityY = 0;
    //     snakeBody = [];
    //     score = 0;
    //     t = 150;
    //     init_snake_game();


    //     updateFoodPosition();
    //     setIntervalId = setInterval(initGame, t);
    // }

    const handleGameOver = () => {
        // Clearing the timer and reloading the page on game over
        // clearInterval(setIntervalId);
        // console.log("Game over: " + gameOver);
        // reset_game();
        clearInterval(setIntervalId);

        gameOver = false;
        foodX, foodY;
        snakeX = 5, snakeY = 5;
        velocityX = 0, velocityY = 0;
        snakeBody = [];
        setIntervalId;
        score = 0;
        t = 150;

        // alert("Game Over! Press OK to replay...");
        return setIntervalId = setInterval(initGame, t);
        // score = 0;
        // t = 150;
        // gameOver = false;
        // location.reload();
        // if (confirm) {
        //     console.log("Confirmed pressed");
        // }
    };

    const changeDirection = e => {
        // Changing velocity value based on key press
        if (e.key === "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        } else if (e.key === "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        } else if (e.key === "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        } else if (e.key === "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }

    };

    // Calling changeDirection on each key click and passing key dataset value as an object
    controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

    const initGame = () => {
        if (gameOver) {
            console.log(score);
            return handleGameOver(), scoreElement.innerText = `Score: ${score}`;
        }

        let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

        // Checking if the snake hit the food
        if (snakeX === foodX && snakeY === foodY) {
            updateFoodPosition();
            snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
            score++; // increment score by 1
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            scoreElement.innerText = `Score: ${score}`;
            highScoreElement.innerText = `High Score: ${highScore}`;
        }
        // Updating the snake's head position based on the current velocity
        snakeX += velocityX;
        snakeY += velocityY;

        // Shifting forward the values of the elements in the snake body by one
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

        // Checking if the snake's head is out of wall, if so setting gameOver to true
        if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
            return gameOver = true;
        }

        for (let i = 0; i < snakeBody.length; i++) {
            // Adding a div for each part of the snake's body
            html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
            // Checking if the snake head hit the body, if so set gameOver to true
            if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
                gameOver = true;
            }
        }

        playBoard.innerHTML = html;
    };

    updateFoodPosition();
    setIntervalId = setInterval(initGame, t);
    countDown("countdown", 0, 10, setIntervalId, highScoreElement);
    document.addEventListener("keyup", changeDirection);
};

function reset_game() {
    init_snake_game();
}