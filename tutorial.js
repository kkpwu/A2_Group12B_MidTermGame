function drawTutorialScreen() {
  let cx = width / 2;
  let cy = height / 2;

  // --- UI TEXT ---
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  textStyle(BOLD);
  text("TUTORIAL", cx, 80);

  textSize(18);
  textStyle(NORMAL);
  text(
    "Click two tiles to swap them.\nMatch the pattern to the target grid on the right to win!",
    cx,
    125,
  );

  drawActiveGrid(); // found in grid.js, but will use the 4x4 playerGrid for the tutorial
  drawTargetPreview(width * 0.85, 120, 120);
  drawSkipButton();
  drawHomeButton();
}

function drawSkipButton() {
  let bx = width - 100;
  let by = height / 2;
  let bw = 120;
  let bh = 50;

  push();
  rectMode(CENTER);

  // Check for hover
  if (
    mouseX > bx - bw / 2 &&
    mouseX < bx + bw / 2 &&
    mouseY > by - bh / 2 &&
    mouseY < by + bh / 2
  ) {
    fill(200); // Gray on hover
    cursor(HAND);
  } else {
    fill(255, 150); // Semi-transparent white normally
  }

  // Draw the button shape
  stroke(0);
  strokeWeight(2);
  rect(bx, by, bw, bh, 10);

  // Draw the text
  noStroke();
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("SKIP", bx, by);
  pop();
}

function checkTutorialWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }

  if (match) {
    startRealGame(); // This moves them to the 5x5 game
  }
}

function drawHomeButton() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // Position: Top left corner (adjust as needed for your Game.Page.png)
  let btnX = 60;
  let btnY = 40;
  let btnW = 80;
  let btnH = 40;

  // Hover Effect
  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2
  ) {
    fill(200); // Gray on hover
    cursor(HAND);
  } else {
    fill(255); // White normally
    cursor(ARROW);
  }

  stroke(0);
  strokeWeight(2);
  rect(btnX, btnY, btnW, btnH, 10);

  // Home Button
  noStroke();
  fill(0);
  textSize(16);
  text("HOME", btnX, btnY);
  pop();
}

function exitToHome() {
  gameState = "start";
  if (timerInterval) clearInterval(timerInterval);
  cursor(ARROW);
}
