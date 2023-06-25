//

var gamePattern = [];
var userClickedPattern = [];
var gameLevel = 0;
var gameStatus = "not started";
var colorList = ["green", "red", "yellow", "blue"];

$(document).on("keypress", function (event) {
  if (gameStatus === "game over" || gameStatus === "not started") {
    mainGame();
  }
});

$(".btn").click(function () {
  var button = this;
  if (gameStatus === "playing") {
    animatePress(button.id);
    userClickedPattern.push(button.id);
    var result = checkResult();
    if (result) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
          nextMove();
        }, 1000);
      }
    } else {
      gameOverScreen();
    }
  } else {
    animatePress(button.id);
    gameOverScreen();
  }
});

function gameOverScreen() {
  gameStatus = "game over";
  $("h1").html("Game Over, Press Any Key to Restart");
  gameLevel = 0;
  gamePattern = [];
  userClickedPattern = [];

  $("body").css("backgroundColor", "red");
  setTimeout(function () {
    $("body").css("backgroundColor", "");
  }, 100);

  playSound("wrong");
}

function playSound(buttonColor) {
  var audio = new Audio("./sounds/" + buttonColor + ".mp3");
  audio.play();
}

function mainGame() {
  gameStatus = "playing";
  nextMove();
}

function nextMove() {
  var randomNumber = Math.floor(Math.random() * 4);
  userClickedPattern = [];

  gameLevel++;

  $("h1").html("Level " + gameLevel);
  animatePress(colorList[randomNumber]);
  gamePattern.push(colorList[randomNumber]);
}

function animatePress(buttonColor) {
  $("#" + buttonColor).addClass("pressed");

  playSound(buttonColor);

  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, 100);
}

function checkResult() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      return false;
    }
  }
  return true;
}
