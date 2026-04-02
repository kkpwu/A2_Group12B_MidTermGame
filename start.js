function drawStartScreen() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  cursor(ARROW); // Reset cursor each frame

  // --- GAME TITLE ---
  noStroke();
  fill(30, 30, 30);
  rect(720, 240, 1500, 120, 10);
  fill(255);
  textSize(125);
  textStyle(BOLD);
  text("PIXEL ALIGNMENT", 720, 250);

  textSize(85);
  fill(200);
  text("A Stability Crisis", 720, 350);

  // --- PLAY BUTTON ---
  let playX = 720,
    playY = 450,
    playW = 500,
    playH = 80;

  if (
    mouseX > playX - playW / 2 &&
    mouseX < playX + playW / 2 &&
    mouseY > playY - playH / 2 &&
    mouseY < playY + playH / 2
  ) {
    fill("#75F74A"); // Hover color
    cursor(HAND);
  } else {
    fill(255, 150); // Normal color
  }

  noStroke();
  rect(playX, playY, playW, playH, 10);
  fill(0);
  textSize(50);
  text("PLAY", playX, playY);

  // --- HOW TO PLAY BUTTON ---
  let howX = 720,
    howY = 550,
    howW = 500,
    howH = 60;

  if (
    mouseX > howX - howW / 2 &&
    mouseX < howX + howW / 2 &&
    mouseY > howY - howH / 2 &&
    mouseY < howY + howH / 2
  ) {
    fill("#EEF777"); // Hover color
    cursor(HAND);
  } else {
    fill(255, 150);
  }

  noStroke();
  rect(howX, howY, howW, howH, 10);
  fill(0);
  textSize(24);
  text("HOW TO PLAY", howX, howY);

  pop();
}

function startLevel(levelKey) {
  currentLevelKey = levelKey;
  let config = LEVEL_CONFIG[levelKey];

  initGrid(config.gridSize); // Creates the 4x4 or 5x5 array
  gameState = levelKey === "tutorial" ? "tutorial" : "game";

  // Set the state so the draw() loop knows which screen to show
  if (levelKey === "tutorial") {
    gameState = "tutorial";
  } else {
    gameState = "game"; // Level 1 (super_easy) hits this line
  }

  // --- RESET POPUP TIMER ---
  if (config.popupsEnabled) {
    // Set the first popup to happen after the first frequency interval
    nextPopupTime = millis() + config.popupFrequency;
  }

  // Setup Timer
  if (timerInterval) clearInterval(timerInterval);
  if (config.timer) {
    timer = config.timer;
    timerInterval = setInterval(timeIt, 1000);
  }
}

function handleMouseClicks() {
  if (activePopups && activePopups.length > 0) {
    checkPopupClicks();
    return;
  }

  // --- 1. START STATE (Main Menu) ---
  if (gameState === "start") {
    let playX = width / 2; // Was 720, now dynamic center
    let playY = 450;
    let playW = 500;
    let playH = 80;

    // PLAY BUTTON CLICK
    if (
      mouseX > playX - playW / 2 &&
      mouseX < playX + playW / 2 &&
      mouseY > playY - playH / 2 &&
      mouseY < playY + playH / 2
    ) {
      startLevel("tutorial");
    }

    // HOW TO PLAY CLICK
    let howY = 550;
    let howH = 60;
    if (
      mouseX > playX - playW / 2 &&
      mouseX < playX + playW / 2 &&
      mouseY > howY - howH / 2 &&
      mouseY < howY + howH / 2
    ) {
      gameState = "instructions";
    }
  }

  // --- 2. INSTRUCTIONS SCREEN ---
  else if (gameState === "instructions") {
    let btnY = height / 2 + 220;
    let backX = width / 2 - 150;
    let startX = width / 2 + 150;

    // BACK BUTTON
    if (
      mouseX > backX - 100 &&
      mouseX < backX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      gameState = "start";
      cursor(ARROW);
    }

    // START BUTTON
    if (
      mouseX > startX - 100 &&
      mouseX < startX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      startLevel("tutorial");
      cursor(ARROW);
    }
  }

  // --- 3. TUTORIAL STATE ---
  else if (gameState === "tutorial") {
    // Home Button (Top Left)
    if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 70) {
      exitToHome();
    }
    // Skip Button (Right Side)
    else if (
      mouseX > width - 160 &&
      mouseX < width - 40 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 + 25
    ) {
      let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
      startLevel(nextLevel);
    } else {
      handleUniversalSwap();
    }
  }

  // --- 4. GAME STATE ---
  else if (gameState === "game") {
    // Home Button check
    if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 70) {
      exitToHome();
    } else {
      handleUniversalSwap();
    }
  }

  // --- 5. WIN / LOSE RESET ---
  else if (gameState === "win" || gameState === "lose") {
    let btnX = width / 2;
    let btnY = height / 2 + 70;
    if (
      mouseX > btnX - 100 &&
      mouseX < btnX + 100 &&
      mouseY > btnY - 25 &&
      mouseY < btnY + 25
    ) {
      exitToHome();
    }
  }
}

function handleUniversalSwap() {
  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  let totalGridArea = 350;
  let cellSize = totalGridArea / dim;
  let startX = width / 2 - totalGridArea / 2;
  let startY = height / 2 + 50 - totalGridArea / 2;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      let xpos = startX + i * cellSize;
      let ypos = startY + j * cellSize;

      if (
        mouseX > xpos &&
        mouseX < xpos + cellSize &&
        mouseY > ypos &&
        mouseY < ypos + cellSize
      ) {
        let clickedIndex = i + j * dim;

        if (firstSelected === -1) {
          firstSelected = clickedIndex;
        } else {
          if (firstSelected !== clickedIndex) {
            // Perform the swap
            let temp = playerGrid[firstSelected];
            playerGrid[firstSelected] = playerGrid[clickedIndex];
            playerGrid[clickedIndex] = temp;

            checkLevelWin(); // Check if they finished this specific level
          }
          firstSelected = -1;
        }
      }
    }
  }
}

function checkLevelWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }

  if (match) {
    let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;

    if (nextLevel === "win_screen") {
      gameState = "win"; // They beat the whole game!
    } else {
      // Move to the next level in the config
      startLevel(nextLevel);
    }
  }
}

function checkWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }
  if (match) {
    clearInterval(timerInterval);
    gameState = "win";
  }
}

function startGame() {
  startLevel("tutorial");

  isPopupActive = false;
  firstSelected = -1;
}

function initGrid(size) {
  let totalTiles = size * size;
  targetGrid = [];

  // Create a new random target pattern
  for (let i = 0; i < totalTiles; i++) {
    targetGrid.push(floor(random(palette.length)));
  }

  // Copy target to player grid so the puzzle is solvable
  playerGrid = [...targetGrid];

  // Scramble the player's tiles (Fisher-Yates Shuffle)
  for (let i = playerGrid.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let temp = playerGrid[i];
    playerGrid[i] = playerGrid[j];
    playerGrid[j] = temp;
  }
}

function startRealGame() {
  console.log("Restarting Real Game...");

  // 1. Force stop ANY existing timer before doing anything else
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // 2. Reset the data
  timer = 60;
  firstSelected = -1;
  initGrid(5); // Sets up the 25 tiles

  // 3. Set the state
  gameState = "game";

  // 4. Restart the timer only AFTER the state has changed
  timerInterval = setInterval(timeIt, 1000);

  // 5. Cleanup visuals
  cursor(ARROW);

  console.log("State is now: " + gameState);
}
