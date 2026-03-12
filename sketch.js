let gameState = "start";
let startBG, instructionsBG, gameBG, winBG, loseBG, pauseBG;
let timer = 60;
let timerInterval;

let palette = ["#FF4136", "#2ECC40", "#0074D9", "#FFDC00", "#F012BE"];
let targetGrid = [];
let playerGrid = [];
let firstSelected = -1;

function preload() {
  startBG = loadImage("assets/Title.Page.png");
  instructionsBG = loadImage("assets/Instructions.Page.png");
  gameBG = loadImage("assets/Game.Page.png");
  winBG = loadImage("assets/Win.Page.png");
  loseBG = loadImage("assets/Lose.Page.png");
  pauseBG = loadImage("assets/Pause.Page.png");
}

function setup() {
  createCanvas(800, 600);
  randomizeTarget();
  randomizePlayerGrid();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(20);

  if (gameState === "start") {
    if (startBG) image(startBG, 0, 0, width, height);
    drawStartScreen();
  } else if (gameState === "tutorial") {
    if (gameBG) image(gameBG, 0, 0, width, height);
    drawTutorialScreen();
  } else if (gameState === "game") {
    if (gameBG) image(gameBG, 0, 0, width, height);
    drawGameScreen();
    handlePopups();
    drawPopups();
  } else if (gameState === "instructions") {
    if (instructionsBG) image(instructionsBG, 0, 0, width, height);
    drawInstructionsScreen();
  } else if (gameState === "win") {
    if (winBG) image(winBG, 0, 0, width, height);
    drawWinScreen();
  } else if (gameState === "lose") {
    if (loseBG) image(loseBG, 0, 0, width, height);
    drawLoseScreen();
  } else if (gameState === "pause") {
    drawPauseScreen();
  }
}

function mousePressed() {
  handleMouseClicks();
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameState === "game") {
      gameState = "pause";
    } else if (gameState === "pause") {
      gameState = "game";
    }
    return false;
  }

  if (key === "r" || key === "R") {
    if (gameState === "game") {
      startRealGame();
    } else if (gameState === "tutorial") {
      startGame();
    }
  }
}

function randomizeTarget() {
  targetGrid = [];
  for (let i = 0; i < 25; i++) {
    targetGrid.push(floor(random(palette.length)));
  }
}

function randomizePlayerGrid() {
  playerGrid = [...targetGrid];

  for (let i = playerGrid.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let temp = playerGrid[i];
    playerGrid[i] = playerGrid[j];
    playerGrid[j] = temp;
  }
}

function timeIt() {
  if (gameState === "game") {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(timerInterval);
      gameState = "lose";
    }
  }
}
