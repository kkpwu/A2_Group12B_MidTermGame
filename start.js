/**
 * start.js - Handles the Title Screen and Mouse Interactions
 */

function drawStartScreen() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

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
    return; // STOP HERE so we don't click the grid under the popup
  }

  if (gameState === "start") {
    // 1. Play Button Hitbox (Centered at 400, 300)
    if (mouseX > 300 && mouseX < 500 && mouseY > 270 && mouseY < 330) {
      startGame();
    }

    // 2. Instructions Button Hitbox (Centered at 400, 380)
    if (mouseX > 300 && mouseX < 500 && mouseY > 350 && mouseY < 410) {
      gameState = "instructions";
    }
  } else if (gameState === "instructions") {
    checkInstructionClicks();
  } else if (gameState === "game") {
    if (mouseX > 20 && mouseX < 100 && mouseY > 20 && mouseY < 60) {
      exitToHome();
    } else {
      // Only handle swaps if the Home button WASN'T clicked
      handleSwapInteraction();
    }
  } else if (gameState === "win" || gameState === "lose") {
    let btnX = width / 2;
    let btnY = height / 2 + 70;

    if (
      mouseX > btnX - 100 &&
      mouseX < btnX + 100 &&
      mouseY > btnY - 25 &&
      mouseY < btnY + 25
    ) {
      firstSelected = -1;
      gameState = "start";
    }
  }
}

// Helper function to reset the game state when leaving
function exitToHome() {
  firstSelected = -1;
  if (timerInterval) clearInterval(timerInterval); // Stop the clock!
  gameState = "start";
}

function handleSwapInteraction() {
  let wholeWidth = width - 220 * 2;
  let gridSize = wholeWidth / 5;
  let startX = width / 2 - wholeWidth / 2;
  let startY = height / 2 - wholeWidth / 2 + 50;

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
            checkWin();
          }
          firstSelected = -1;
        }
      }
    }
  }
}

function startGame() {
  timer = 60;
  isPopupActive = false; // Reset popups
  nextPopupTime = millis() + 5000; // First popup happens after 5 seconds

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(timeIt, 1000);

  randomizeTarget();
  randomizePlayerGrid();
  gameState = "game";
}
