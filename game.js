var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        // $("#level-title").text("Level " + level);
        nextSequence()
        started = true;
    }
});

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}
);


function nextSequence (){
 userClickedPattern = [];
 level++;
 $("h1").text("Level " + level);

 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColour = buttonColours[randomNumber];
 console.log(randomChosenColour)
 gamePattern.push(randomChosenColour);

animatePress(randomChosenColour);
playSound(randomChosenColour);
}
function animatePress (currentColour){
    $("#"+currentColour).addClass("pressed")

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
        },100);
    
}

function playSound(name){
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    //userClickedPattern == gamePattern
   
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
     console.log("success"); 

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()},1000);
        }
     
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over")

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").text("Game-Over,Press Any Key To Restart")
        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





