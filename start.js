function drawStartScreen() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // --- GAME TITLE ---
  fill(255);
  textSize(70);
  textStyle(BOLD);
  text("PIXEL ALIGNMENT", 400, 180);

  textSize(45);
  fill(200);
  text("A Stability Crisis", 400, 235);

  // --- PLAY BUTTON ---
  fill(255, 150); // Semi-transparent white
  noStroke();
  rect(400, 300, 200, 60, 10); // Centered on canvas

  fill(0); // Black text
  textSize(32);
  text("PLAY", 400, 300);

  // --- HOW TO PLAY BUTTON ---
  fill(255, 150);
  rect(400, 380, 200, 60, 10); // Positioned 80px below Play

  fill(0);
  textSize(24);
  text("HOW TO PLAY", 400, 380);
  pop();
}

function handleMouseClicks() {
  if (activePopups.length > 0) {
    checkPopupClicks();
    return;
  }

  // --- 1. TUTORIAL STATE ---
  if (gameState === "tutorial") {
    let skipX = width - 100;
    let skipY = height / 2;
    if (
      mouseX > skipX - 60 &&
      mouseX < skipX + 60 &&
      mouseY > skipY - 25 &&
      mouseY < skipY + 25
    ) {
      startRealGame();
    } else {
      handleSwapInteractionTutorial();
    }
  }
  // --- 2. START STATE ---
  else if (gameState === "start") {
    // Added 'else' here
    let cx = width / 2;
    let cy = height / 2;
    if (
      mouseX > cx - 100 &&
      mouseX < cx + 100 &&
      mouseY > cy - 30 &&
      mouseY < cy + 30
    ) {
      startGame();
    } else if (
      mouseX > cx - 100 &&
      mouseX < cx + 100 &&
      mouseY > cy + 50 &&
      mouseY < cy + 110
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
      handleSwapInteraction();
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
      firstSelected = -1;
      cursor(ARROW);
      startRealGame(); // This takes you straight to 5x5
    }
  }
}

function handleSwapInteraction() {
  let dim = 5;
  let size = 400; // Keep this consistent with your tutorial grid size
  let cellSize = size / dim;

  // Center the hitbox exactly like the drawGridAt(width/2, height/2 + 50) call
  let startX = width / 2 - size / 2;
  let startY = height / 2 + 50 - size / 2;

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
            let temp = playerGrid[firstSelected];
            playerGrid[firstSelected] = playerGrid[clickedIndex];
            playerGrid[clickedIndex] = temp;

            checkWin(); // Make sure this function exists to check for 5x5 win
          }
          firstSelected = -1;
        }
      }
    }
  }
}

function handleSwapInteractionTutorial() {
  let gap = 220;
  let wholeWidth = width - gap * 2;
  let gridSize = wholeWidth / 5;
  let startX = width / 2 - (width - 220 * 2) / 2;
  let startY = height / 2 - (width - 220 * 2) / 2 + 50;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let xpos = startX + i * gridSize;
      let ypos = startY + j * gridSize;

      if (
        mouseX > xpos &&
        mouseX < xpos + gridSize &&
        mouseY > ypos &&
        mouseY < ypos + gridSize
      ) {
        let clickedIndex = i + j * 5;

        if (firstSelected === -1) {
          firstSelected = clickedIndex;
        } else {
          if (firstSelected !== clickedIndex) {
            let temp = playerGrid[firstSelected];
            playerGrid[firstSelected] = playerGrid[clickedIndex];
            playerGrid[clickedIndex] = temp;
            checkTutorialWin();
          }
          firstSelected = -1;
        }
      }
    }
  }
}

function checkTutorialWin() {
  let isMatch = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      isMatch = false;
      break;
    }
  }
  if (isMatch) {
    startRealGame();
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
  gameState = "tutorial";
  isPopupActive = false;
  timer = 60;
  firstSelected = -1;

  initGrid(5); // Initialize the 5x5 tutorial grid
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
  console.log("Restarting Real Game..."); // This helps you see if the click worked

  gameState = "game"; // 1. Change the screen to the 5x5 game
  timer = 60; // 2. Reset the clock
  firstSelected = -1; // 3. Clear any selected tiles

  // 4. Create the 5x5 grid (25 tiles)
  initGrid(5);

  // 5. Reset and restart the timer interval
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(timeIt, 1000);

  cursor(ARROW); // 6. Fix the cursor so it's not a 'hand' anymore
}
