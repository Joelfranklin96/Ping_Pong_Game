var gameStart = true;
var collide = false;
var randomLeftSpeed;
var randomLeftDirection;
var randomBottomSpeed;
var id;
var playerTurn = 2;
var screenWidth = vwToPx(100);
var screenHeight = vhToPx(100);

var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var ball = document.getElementById('ball');
var score1 = document.getElementById('score1');
var score2 = document.getElementById('score2');


document.addEventListener('keydown', moveRod);
document.addEventListener('keydown', startBall);

alert("Press enter to start play");

function display(){
    if (playerTurn == 1){
        alert("Player 2 wins the point");
        alert("Now it's player 1's turn. Press Enter to start")
    }
    else{
        alert("Player 1 wins the point");
        alert("Now it's player 2's turn. Press Enter to start")
    }
}

function initialize(){ 
    rod1.style.left = '50vw';
    rod2.style.left = '50vw';
    rod1.style.top = '0px';
    rod2.style.bottom = '0px';
    if (playerTurn == 2){
        let num = parseInt(score1.innerText);
        num = String(num+1);
        score1.innerText = num; 
        ball.style.bottom = '10px';
    }
    else{
        let num = parseInt(score2.innerText);
        num = String(num+1);
        score2.innerText = num; 
        ball.style.bottom = (screenHeight - 10) + 'px';
    }
    ball.style.left = '53vw';
    gameStart = true;
    display();
}

function vwToPx(value) {
    return value * window.innerWidth / 100;
}

function vhToPx(value) {
    return value * window.innerHeight / 100;
}

function moveRodLeft(){

    let leftMargin = window.getComputedStyle(rod1).getPropertyValue('left');
    leftMargin = Number(leftMargin.slice(0,-2));
    if (leftMargin > 0){
        leftMargin -= 10;
        leftMargin += 'px'
        rod1.style.left = leftMargin;
        rod2.style.left = leftMargin;
    }   
}

function moveRodRight(){

    let leftMargin = window.getComputedStyle(rod1).getPropertyValue('left');
    leftMargin = Number(leftMargin.slice(0,-2));
    if (leftMargin < (screenWidth - 100)){
        leftMargin += 10;
        leftMargin += 'px'
        rod1.style.left = leftMargin;
        rod2.style.left = leftMargin;
    }
}

function moveRod(e){
    if (e.key == "ArrowLeft"){
        moveRodLeft();
    }
    else if (e.key == "ArrowRight"){
        moveRodRight();
    }
}

function startBall(e){
    if ((gameStart == true) && (e.key == "Enter")){
        gameStart = false;
        randomLeftSpeed = Math.random() * 10;
        randomLeftDirection = Math.random();
        randomBottomSpeed = Math.sqrt(600 - Math.pow(randomLeftSpeed, 2));

        id = setInterval(moveBall, 100);
    }
}

function moveBall(){
    moveBallHorizontally();
    moveBallVertically();
}

function inContact(element1, element2){
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();
    if (((rect1.top + rect1.height) > (rect2.top)) && 
        (rect1.left < (rect2.left + rect2.width)) && 
        ((rect1.left + rect1.width) > (rect2.left))){
        return true;
    }
    else{
        return false;
    }
}

function moveBallHorizontally(){
    let leftMargin = window.getComputedStyle(ball).getPropertyValue('left');
    leftMargin = Number(leftMargin.slice(0,-2));

    if ((leftMargin < 0) || (leftMargin > (screenWidth-10))){
        if (randomLeftDirection < 0.5){
            leftMargin += randomLeftSpeed;
            randomLeftSpeed = -1 * randomLeftSpeed;
        }
        else{
            leftMargin -= randomLeftSpeed;
            randomLeftSpeed = -1 * randomLeftSpeed;
        }
    }
    else{
        if (randomLeftDirection < 0.5){
            leftMargin -= randomLeftSpeed;
        }
        else{
            leftMargin += randomLeftSpeed;
        }
    }

    leftMargin += "px";
    ball.style.left = leftMargin;
}

function moveBallVertically(){
    let bottomMargin = window.getComputedStyle(ball).getPropertyValue('bottom');
    bottomMargin = Number(bottomMargin.slice(0,-2));

    if (inContact(rod1, ball)){
        bottomMargin -= randomBottomSpeed;
        randomBottomSpeed = -1 * randomBottomSpeed;
    }

    else if (inContact(ball, rod2)){
        bottomMargin -= randomBottomSpeed;
        randomBottomSpeed = -1 * randomBottomSpeed;
    }

    else if(bottomMargin < 0){
        playerTurn = 2;
        initialize();
        clearInterval(id);
        return;
    }

    else if (bottomMargin > screenHeight - 10){
        playerTurn = 1;
        initialize();
        clearInterval(id);
        return;
    }

    else{
        bottomMargin += randomBottomSpeed;
    }
    bottomMargin += "px";
    ball.style.bottom = bottomMargin;
}