var gameSequence = [];
var userClickedSequence = [];
var buttonFruits = ["apple", "banana", "orange", "grapes"];
var level = 0;
var started = false;


$(document).on("keydown",function startGame () {

if(!started==true){

  $("h1").text("Level " + level );

  nextSequence();

  started = true;
}
});



function nextSequence(){
  level++;

  $("h1").text("Level " + level );

  var randomNumber = Math.floor(Math.random()* 4);

  var randomFruit = buttonFruits[randomNumber];

  gameSequence.push(randomFruit);

  $("." + randomFruit).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomFruit);

  userClickedSequence = [];

}

$(".fruit-button").on("tap", function(){

var userChosenFruit = $(this).attr("id");

userClickedSequence.push(userChosenFruit);

animatePress(userChosenFruit);

playSound(userChosenFruit);

checkAnswer(userClickedSequence.length - 1);

});


$(".fruit-button").on("click", function(){

var userChosenFruit = $(this).attr("id");

userClickedSequence.push(userChosenFruit);

animatePress(userChosenFruit);

playSound(userChosenFruit);

checkAnswer(userClickedSequence.length - 1);

});


function animatePress(fruitName){

$("#" + fruitName).addClass("pressed");

$("#" + fruitName).removeClass("hoverClass");

setTimeout(function(){

    $("#" + fruitName).removeClass("pressed");

    $("#" + fruitName).addClass("hoverClass");

  }, 100);

}

function playSound (fruit) {

  var audio = new Audio("sounds/" + fruit + ".mp3");
  audio.play();
}

function checkAnswer (levelNumber){
  if (gameSequence[levelNumber]==userClickedSequence[levelNumber]){

    if(gameSequence.length == userClickedSequence.length){
      setTimeout(function(){
          nextSequence();
      }, 1000);

    }

  }else{

    $("h1").text("Game Over! Press any key to restart!")

    $("body").addClass("wrong-answer");

    setTimeout(function(){$("body").removeClass("wrong-answer");}, 200);

    playSound("wrong");

    started = false;

    level = 0;

    gameSequence = [];
    }
}


// Responsiveness

function mobileScreen (x) {
  if (x.matches) {
    $(document).on("tap", function startGame () {

    if(!started==true){

      $("h1").text("Level " + level );

      nextSequence();

      started = true;
    }
    });

  $("h1").text("Test Your memory! Tap the screen to start");
  } else {
  $("h1").text("Test Your Memory! Press any key to start.");
  }
}

var x = window.matchMedia("(max-width: 1000px)");
mobileScreen(x);
x.addListener(mobileScreen);
