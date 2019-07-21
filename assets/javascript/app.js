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
  var game = $("#game");
  var gameResults = $("#gameResults");
  var timerRunning = false;
  var time = 90;
  var timerInterval;
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var unanswered = 0;
  var questionNumber = 0;
  var triviaQuestions = [
    {
      question:
        "Which store did Rachel and Ross both buy the same apothecary table from?",
      choices: ["Crate & Barrel", "West Elm", "Pottery Barn", "Anthropologie"],
      correctAnswer: "Pottery Barn"
    },
    {
      question:
        "Monica’s apartment number was originally 5. What number was it later changed to for the rest of the series?",
      choices: ["10", "15", "6", "20"],
      correctAnswer: "20"
    },
    {
      question:
        "In 'The One Where No Ones Ready,' what does Phoebe spill on her dress?",
      choices: ["Wine", "Hummus", "Guacamole", "Diet Coke"],
      correctAnswer: "Hummus"
    },
    {
      question:
        'Who said it? "From now on, the only person whos going to enjoy these bad boys is me."',
      choices: ["Rachel", "Chandler", "Ross", "Phoebe"],
      correctAnswer: "Ross"
    },
    {
      question:
        "Why is Joey's character, Dr. Drake Ramoray, killed off on Days of Our Lives?",
      choices: [
        "Joey refused to audition for the part of Drake's brother, Striker Ramoray",
        "Joey released spoilers about the show to Soap Opera Digest",
        "Joey refused to sleep with the show's producer",
        "Joey stated that he wrote his own lines in an interview"
      ],
      correctAnswer: "Joey stated that he wrote his own lines in an interview"
    },
    {
      question: "How long is the letter Rachel writes Ross at the beach house?",
      choices: [
        "10 pages, front and back",
        "18 pages, front and back",
        "15 pages, front and back",
        "9 pages, front and back"
      ],
      correctAnswer: "18 pages, front and back"
    },
    {
      question: "What was the name of Ross and Chandler's college band?",
      choices: [
        "Way, No Way",
        "Emotional Knapsack",
        "She Feels Weird Since I've Been Gone",
        "Betrayal In The Common Room"
      ],
      correctAnswer: "Way, No Way"
    },
    {
      question:
        "Who said it? 'So it seems like this internet thing is here to stay, huh?'",
      choices: ["Rachel", "Joey", "Chandler", "Phoebe"],
      correctAnswer: "Chandler"
    },
    {
      question:
        "What are the made-up names of the guitar chords Phoebe tries to teach to Joey?",
      choices: [
        "Bear Claw, Turkey Leg, and Old Lady",
        "Rabbit Foot, Stapler, and Olympic Gymnast",
        "Spider, Anteater, and Smiley Face",
        "Chandler, Rachel, and Monica"
      ],
      correctAnswer: "Bear Claw, Turkey Leg, and Old Lady"
    }
  ];

  //function to begin the game
  function startGame() {
    $("#questions").empty();
    if (!timerRunning) {
      timerInterval = setInterval(countDown, 1000);
      timerRunning = true;
    }
    for (var i = 0; i < triviaQuestions.length; i++) {
      // var container_div = $("<div class='container'>");
      $("#questions").append(
        "<div class='container'>" +
          "<h2>" +
          triviaQuestions[i].question +
          "</h2>" +
          '<input type="radio" name="questionChoice' +
          i +
          '" value="' +
          triviaQuestions[i].choices[0] +
          '">' +
          triviaQuestions[i].choices[0] +
          "  </input>" +
          '<input type="radio" name="questionChoice' +
          i +
          '" value="' +
          triviaQuestions[i].choices[1] +
          '">' +
          triviaQuestions[i].choices[1] +
          "  </input>" +
          '<input type="radio" name="questionChoice' +
          i +
          '" value="' +
          triviaQuestions[i].choices[2] +
          '">' +
          triviaQuestions[i].choices[2] +
          "  </input>" +
          '<input type="radio" name="questionChoice' +
          i +
          '" value="' +
          triviaQuestions[i].choices[3] +
          '">' +
          triviaQuestions[i].choices[3] +
          "</input>" +
          "</div>"
      );
      console.log(triviaQuestions[i]);
    }
    gameResults.hide();
  }

  function countDown() {
    time--;
    var counter = timeConversion(time);
    $("#timeLeft").text(counter);
    if (time === 0) {
      clearInterval(timerInterval);
      game.hide();
      gameResults.show();
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
    game.hide();
    gameResults.show();
    $("#correct").text(correctAnswers);
    $("#incorrect").text(incorrectAnswers);

    if (correctAnswers > 5) {
      $("#gif").html(
        '<img src="https://media.giphy.com/media/ubpB6XcvpYMF2/giphy.gif" />'
      );
    } else {
      $("#gif").html(
        '<img src="https://thumbs.gfycat.com/UnhealthyIcyConey-size_restricted.gif"/>'
      );
    }
  }

  //Event Listeners

  //hides game and game results from player
  game.hide();
  gameResults.hide();

  //start button will hide start page and begin the game
  $("#startButton").on("click", function() {
    game.show();
    $("#startGame").hide();
    startGame();
  });

  //Click submit to check answers and end the game
  $("#submit").on("click", function() {
    for (j = 0; j < triviaQuestions.length; j++) {
      var answerValue = $("input[name= questionChoice" + j + "]:checked").val();
      var unansweredValue = $(
        "input[name= questionChoice" + j + "]:not(:checked)"
      ).val();
      if (answerValue === triviaQuestions[j].correctAnswer) {
        correctAnswers++;
      } else if (answerValue !== triviaQuestions[j].correctAnswer) {
        incorrectAnswers++;
      }
      console.log(triviaQuestions[j].correctAnswer);
      console.log(answerValue);
    }
    endGame();
  });

  //Reset button at the end to begin the game again
  $("#resetButton").on("click", function() {
    game.show();
    time = 90;
    $("#timeLeft").text("01:30");
    timerRunning = false;
    correctAnswers = 0;
    incorrectAnswers = 0;

    startGame();
  });
});
