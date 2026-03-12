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

  // --- TUTORIAL STATE ---
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
      handleSwapInteractionTutorial(); // This now handles the 3x3 grid
    }
  }
  // --- START STATE ---
  else if (gameState === "start") {
    let cx = width / 2;
    let cy = height / 2;
    // Updated to use relative positioning for the start buttons
    if (
      mouseX > cx - 100 &&
      mouseX < cx + 100 &&
      mouseY > cy - 30 &&
      mouseY < cy + 30
    ) {
      startGame();
    }
    if (
      mouseX > cx - 100 &&
      mouseX < cx + 100 &&
      mouseY > cy + 50 &&
      mouseY < cy + 110
    ) {
      gameState = "instructions";
    }
  }
  // --- INSTRUCTIONS STATE ---
  else if (gameState === "instructions") {
    checkInstructionClicks();
  }
  // --- GAME STATE ---
  else if (gameState === "game") {
    if (mouseX > 20 && mouseX < 100 && mouseY > 20 && mouseY < 60) {
      exitToHome();
    } else {
      handleSwapInteraction(); // Main 5x5 logic
    }
  }
  // --- END STATES ---
  else if (gameState === "win" || gameState === "lose") {
    let btnX = width / 2;
    let btnY = height / 2 + 70;

    // Check if the mouse click is within the "TRY AGAIN" button boundaries
    if (
      mouseX > btnX - 100 &&
      mouseX < btnX + 100 &&
      mouseY > btnY - 25 &&
      mouseY < btnY + 25
    ) {
      firstSelected = -1;
      cursor(ARROW); // Reset the cursor immediately

      // THE FIX: Direct the player to the game, not the start menu
      if (gameState === "lose") {
        startRealGame();
      } else {
        gameState = "start"; // Wins can still go back to menu
      }
    }
  }
}

function startRealGame() {
  gameState = "game";
  timer = 60; // Reset the clock to full time
  firstSelected = -1;

  // This uses your 5x5 layout logic
  initGrid(5);

  // Start the timer countdown
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(timeIt, 1000);
}

// Helper function to reset the game state when leaving
function exitToHome() {
  firstSelected = -1;
  if (timerInterval) clearInterval(timerInterval); // Stop the clock!
  gameState = "start";
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

function startGame() {
  gameState = "tutorial";
  isPopupActive = false;
  timer = 60; // Or whatever tutorial time you want
  firstSelected = -1;

  initGrid(5); // Initialize the 5x5 tutorial grid
}

function initGrid(size) {
  let totalTiles = size * size;
  targetGrid = [];
  for (let i = 0; i < totalTiles; i++) {
    targetGrid.push(floor(random(palette.length)));
  }
  randomizePlayerGrid();
}

function startRealGame() {
  gameState = "game";
  timer = 60;
  firstSelected = -1;

  initGrid(5); // This handles both randomizeTarget and randomizePlayerGrid

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(timeIt, 1000);
}
