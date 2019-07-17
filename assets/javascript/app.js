//Basic:
//Page loads with a start button - click on the start button to begin the game
//on start it will display several trivia questions
//the answers will be selectable below the questions, only one answer can be selected
//A timer displays how much longer you have to answer the questions
//When timer runs out it will automatically end the game
//Once you've answered all the questions click the finish bottom to calculate total
//Finished screen will show how many correct, incorrect, and unanswered questions
//The end will a restart button as well
//
//Advanced:
//Page loads with a start button - click on the start button to begin the game
//first question and answers will load with a timer
//timer counts down with how much time to answer the question
//Only one answer is selectable, choose one answer and submit
//if answer is correct display a correct phrase and image
//if answer is incorrect display an incorrect phrase and image
//If timer runs out display an out of time message and image
//after a few seconds move to the next question
//once all questions have been answered display how many correct, incorrect and unanswered
//provide a restart button as well at the end

$(document).ready(function() {
  //Global Variables
  var timerRunning = false;
  var time = 90;
  var timerInterval;
  var triviaQuestions = [];

  //function to begin the game
  function startGame() {
    if (!timerRunning) {
      timerInterval = setInterval(countDown, 1000);
      timerRunning = true;
    }
    $("#gameResults").hide();
  }

  function countDown() {
    time--;
    var counter = timeConversion(time);
    $("#timeLeft").text(counter);
    if (time === 0) {
      clearInterval(timerInterval);
      $("#game").hide();
      $("#gameResults").show();
    }
  }

  //converts the time into a display format of 00:00
  function timeConversion(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }

  //function to stop the timer, hide the game and show the results
  function endGame() {
    clearInterval(timerInterval);
    $("#game").hide();
    $("#gameResults").show();
  }

  //Event Listeners

  //hides game and game results from player
  $("#game").hide();
  $("#gameResults").hide();

  //start button will hide start page and begin the game
  $("#startButton").on("click", function() {
    $("#game").show();
    $("#startGame").hide();
    startGame();
  });

  //Click submit to check answers and end the game
  $("#submit").on("click", function() {
    endGame();
  });

  //Reset button at the end to begin the game again
  $("#resetButton").on("click", function() {
    $("#game").show();
    time = 90;
    $("#timeLeft").text("01:30");
    timerRunning = false;

    startGame();
  });
});
