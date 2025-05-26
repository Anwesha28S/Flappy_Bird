// var pipe = document.querySelector(".pipe");
// var topPipe = document.querySelector(".top_pipe");
// var bottomPipe = document.querySelector(".bottom_pipe");
// var hole = document.getElementById("hole");
// var result=document.getElementById("result");
// var text=document.getElementById("text");
// var game=document.getElementById("game");
// var bird=document.getElementById("bird");
// var score=0;
// var jumping=0;

// pipe.addEventListener("animationiteration", moveHoleRandomly);

// function moveHoleRandomly() {
//   var gameHeight = 500;
//   var holeHeight = 150;

//   // Setting a random top pipe height (between 50 and 300 using random function i.e till 200)
//   var topHeight = Math.floor(Math.random() * 150) + 50;
//   var bottomHeight = gameHeight - topHeight - holeHeight;

//   // Applying new heights
//   topPipe.style.height = topHeight + "px";
//   bottomPipe.style.height = bottomHeight + "px";
//   hole.style.marginTop = topHeight + "px";
//   score++;
// }
// // now seeing scenarios for fall and game over
// var fall=setInterval(function(){
//   var birdTop=parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
//   if(jumping==0){
//     if(birdTop<460)
//     bird.style.top=(birdTop+2)+"px";
//     else{
//       endGame();
//     }
//   }
//   var topPipeHeight = parseInt(window.getComputedStyle(topPipe).getPropertyValue("height"));
//   var bottomPipeTop = topPipeHeight + 150; // Gap is 150px
//   var pipesLeft = parseInt(window.getComputedStyle(topPipe).getPropertyValue("left"));
//   var pipeWidth = parseInt(window.getComputedStyle(topPipe).getPropertyValue("width"));
//   var birdHeight = parseInt(window.getComputedStyle(bird).getPropertyValue("height"));

//   // Collision detection
//   if (
//     pipesLeft < 50 && 
//     pipesLeft > -pipeWidth && 
//     (
//       birdTop < topPipeHeight || 
//       birdTop + birdHeight > bottomPipeTop
//     )
//   ) {
//     endGame();
//   }
// },10);
// document.addEventListener("keydown", function (e) {
//   if (e.code === "Space") {
//     jump();
//   }
// });
// // jump() function for hopping of the bird on pressing spacebar
// function jump() {
//   jumping = 1;
//   let jumpCount = 0;
//   let jumpInterval = setInterval(function () {
//     var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
//     if (birdTop > 6 && jumpCount < 15) {
//       bird.style.top = (birdTop - 4) + "px";
//     }
//     jumpCount++;
//     if (jumpCount > 20) {
//       clearInterval(jumpInterval);
//       jumping = 0;
//     }
//   }, 10);
// }

// function endGame() {
//   result.style.display = "block";
//   text.innerText = `Your final score is: ${score}`;
//   game.style.display = "none";
//   clearInterval(fall);
//   score = 0;
// }

var pipe = document.querySelector(".pipe");
var topPipe = document.querySelector(".top_pipe");
var bottomPipe = document.querySelector(".bottom_pipe");
var hole = document.getElementById("hole");
var result = document.getElementById("result");
var text = document.getElementById("text");
var game = document.getElementById("game");
var bird = document.getElementById("bird");
var score = 0;
var jumping = 0;
var gameRunning = true;

// Set initial pipe position
moveHoleRandomly();

pipe.addEventListener("animationiteration", moveHoleRandomly);

function moveHoleRandomly() {
    var gameHeight = 500;
    var holeHeight = 150;

    // Random top pipe height (between 50 and 250)
    var topHeight = Math.floor(Math.random() * 200) + 50;
    var bottomHeight = gameHeight - topHeight - holeHeight;

    // Apply new heights
    topPipe.style.height = topHeight + "px";
    bottomPipe.style.height = bottomHeight + "px";
    hole.style.height = holeHeight + "px";
    score++;
}

var fall = setInterval(function() {
    if (!gameRunning) return;
    
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    var birdLeft = 50; // Bird's fixed horizontal position
    
    // Gravity - make bird fall when not jumping
    if (jumping == 0) {
        if (birdTop < 450) {
            bird.style.top = (birdTop + 3) + "px";
        } else {
            endGame();
        }
    }
    
    // Get pipe dimensions
    var pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue("left"));
    var pipeWidth = parseInt(window.getComputedStyle(pipe).getPropertyValue("width"));
    var topPipeHeight = parseInt(window.getComputedStyle(topPipe).getPropertyValue("height"));
    var bottomPipeTop = topPipeHeight + 150; // Gap is 150px
    
    // Bird dimensions
    var birdHeight = parseInt(window.getComputedStyle(bird).getPropertyValue("height"));
    var birdWidth = parseInt(window.getComputedStyle(bird).getPropertyValue("width"));
    
    // Collision detection
    if (
        // Horizontal collision (bird is within pipe width)
        pipeLeft < birdLeft + birdWidth && 
        pipeLeft + pipeWidth > birdLeft &&
        (
            // Vertical collision with top pipe
            birdTop < topPipeHeight ||
            // Vertical collision with bottom pipe
            birdTop + birdHeight > bottomPipeTop
        )
    ) {
        endGame();
    }
}, 20);

// Jump control
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && gameRunning) {
        jump();
    }
});

function jump() {
    if (!gameRunning) return;
    
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function() {
        var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        if (birdTop > 20 && jumpCount < 15) {
            bird.style.top = (birdTop - 5) + "px";
        }
        jumpCount++;
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
        }
    }, 10);
}

function endGame() {
    gameRunning = false;
    result.style.display = "block";
    text.innerText = `Your final score is: ${score}`;
    game.style.display = "none";
    clearInterval(fall);
}