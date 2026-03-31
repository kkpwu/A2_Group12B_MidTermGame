function drawStartScreen() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  cursor(ARROW); // Reset cursor each frame

  // --- GAME TITLE ---
  noStroke();
  fill(30, 30, 30);
  rect(400, 175, 655, 80, 10);
  fill(255);
  textSize(70);
  textStyle(BOLD);
  text("PIXEL ALIGNMENT", 400, 180);

  textSize(45);
  fill(200);
  text("A Stability Crisis", 400, 235);

  // --- PLAY BUTTON ---
  let playX = 400, playY = 320, playW = 200, playH = 60;
  
  if (mouseX > playX - playW/2 && mouseX < playX + playW/2 && 
      mouseY > playY - playH/2 && mouseY < playY + playH/2) {
    fill(200); // Hover color
    cursor(HAND);
  } else {
    fill(255, 150); // Normal color
  }
  
  noStroke();
  rect(playX, playY, playW, playH, 10);
  fill(0);
  textSize(32);
  text("PLAY", playX, playY);

  // --- HOW TO PLAY BUTTON ---
  let howX = 400, howY = 400, howW = 200, howH = 60;

  if (mouseX > howX - howW/2 && mouseX < howX + howW/2 && 
      mouseY > howY - howH/2 && mouseY < howY + howH/2) {
    fill(200);
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

  // Set the state so the draw() loop knows which screen to show
  if (levelKey === "tutorial") {
    gameState = "tutorial";
  } else {
    gameState = "game"; // or "playing"
  }

  // Setup Timer
  if (config.timer) {
    timer = config.timer;
    timerInterval = setInterval(timeIt, 1000);
  } else {
    if (timerInterval) clearInterval(timerInterval);
    timer = null;
  }
}

function handleMouseClicks() {
  if (activePopups.length > 0) {
    checkPopupClicks();
    return;
  }

  // --- 1. TUTORIAL STATE ---
  if (gameState === "tutorial") {
    if (mouseX > 20 && mouseX < 100 && mouseY > 20 && mouseY < 60) {
      exitToHome();
    } else if (
      mouseX > width - 160 &&
      mouseX < width - 40 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 + 25
    ) {
      let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
      startLevel(nextLevel); // Move to the next state defined in the config
    } else {
      handleUniversalSwap();
    }
  }
  // --- 2. START STATE ---
  else if (gameState === "start") {
    let leftEdge = 400 - 100;
    let rightEdge = 400 + 100;

    // PLAY BUTTON
    if (
      mouseX > leftEdge &&
      mouseX < rightEdge &&
      mouseY > 320 - 30 &&
      mouseY < 320 + 30
    ) {
      startLevel("tutorial");
    }
    // HOW TO PLAY BUTTON
    else if (
      mouseX > leftEdge &&
      mouseX < rightEdge &&
      mouseY > 400 - 30 &&
      mouseY < 400 + 30
    ) {
      gameState = "instructions";
    }
  }
  // --- 3. INSTRUCTIONS STATE ---
  else if (gameState === "instructions") {
    checkInstructionClicks();
  }
  // --- 4. GAME STATE ---
  else if (gameState === "game") {
    // Check Home Button
    if (mouseX > 20 && mouseX < 100 && mouseY > 20 && mouseY < 60) {
      exitToHome();
    } else {
      handleUniversalSwap();
    }
  }
  // --- 5. END STATES ---
  else if (gameState === "win" || gameState === "lose") {
    let btnX = width / 2;
    let btnY = height / 2 + 70;

    if (
      mouseX > btnX - 100 &&
      mouseX < btnX + 100 &&
      mouseY > btnY - 25 &&
      mouseY < btnY + 25
    ) {
      // RESET LOGIC
      firstSelected = -1;
      if (timerInterval) clearInterval(timerInterval); // Kill the old timer

      gameState = "start"; // Take them back to the Menu
      cursor(ARROW); // Fix the cursor

      console.log("Returning to Main Menu...");
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
  // Use our new universal starter!
  startLevel("tutorial");

  // Close any leftovers
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

function timeIt() {
  if (timer > 0) {
    timer--;
  } else {
    // Timer hit zero
    clearInterval(timerInterval);
  }
}