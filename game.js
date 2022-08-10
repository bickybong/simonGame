buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;

$(".btn").click(function(){
    userColor = this.id;
    userClickedPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAns(userClickedPattern.length-1);
});
gameStart();

function checkAns(arrayIndex){
    if (gamePattern[arrayIndex] === userClickedPattern[arrayIndex]){
        //check if user has copied whole sequence
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                // toggle back after 1000 milisecond
                nextSequence();
              },1000);
              userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        //game-over effect
        $(`body`).toggleClass("game-over");
        setTimeout(function(){
        // toggle back after 200 milisecond
        $(`body`).toggleClass("game-over");  
        },200);
        $("h1").text("Game Over, Press Any Key To Restart");
        reset();
    }
}

function reset(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart();
}

function gameStart(){
        $("body").on("keypress",function(){
            nextSequence();
            //off the button
            $("body").off("keypress");
        });
        
    
}

function animatePress(color){
    $(`.${color}`).toggleClass("pressed");
    setTimeout(function(){
        // toggle back after 100 milisecond
        $(`.${color}`).toggleClass("pressed");  
      },100)
}

function nextSequence(){
    var randomNo = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNo];
    gamePattern.push(randomColor);
    $(`.${randomColor}`).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    level++;
    $("h1").text(`Level ${level}`);
}

function playSound(color){
    var sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}