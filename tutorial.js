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

  drawTutorialMainGrid();
  drawTargetPreview(width * 0.85, 120, 120);

  drawSkipButton();
  drawHomeButton();
}

function drawTutorialMainGrid() {
  push();
  // 1. Math (Matches your Main Game exactly)
  let gap = 220;
  let wholeWidth = width - gap * 2;
  let gridSize = wholeWidth / 5;
  let startX = width / 2 - wholeWidth / 2;
  let startY = height / 2 - wholeWidth / 2 + 50;

  // 2. Container
  rectMode(CENTER);
  fill(255);
  noStroke();
  rect(width / 2, height / 2 + 50, wholeWidth + 20, wholeWidth + 20, 15);

  // 3. Draw the Grid
  rectMode(CORNER);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let index = i + j * 5;
      let xpos = startX + i * gridSize;
      let ypos = startY + j * gridSize;

      strokeWeight(5);
      stroke(0);
      fill(palette[playerGrid[index]]);
      square(xpos, ypos, gridSize);
    }
  }

  // 4. Draw Highlight ON TOP
  if (firstSelected !== -1) {
    let i = firstSelected % 5;
    let j = floor(firstSelected / 5);
    let xpos = startX + i * gridSize;
    let ypos = startY + j * gridSize;

    strokeWeight(6);
    stroke(255, 255, 0); // Bright Yellow
    fill(palette[playerGrid[firstSelected]]);

    // We draw it slightly larger or with CORNER mode to match
    square(xpos, ypos, gridSize);
  }
  pop();
}

function drawTargetPreview(x, y, size) {
  push();
  let targetSize = 20;
  let margin = 60;

  // Matches your specific layout logic
  let startX = width - targetSize * 5 - margin;

  stroke(255);
  strokeWeight(2);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let index = i + j * 5;
      if (targetGrid[index] !== undefined) {
        fill(palette[targetGrid[index]]);
        // Using the 80 offset from your code
        rect(
          startX + i * targetSize,
          80 + j * targetSize,
          targetSize,
          targetSize,
        );
      }
    }
  }
  // Label for the target grid
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("TARGET", startX + targetSize * 2.5, 70);
  pop();
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
    // Note: Don't set cursor(ARROW) here if you have multiple buttons,
    // it might flicker. Usually, it's better to set cursor(ARROW)
    // at the very start of your main draw() loop.
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

  // Home Icon or Text
  noStroke();
  fill(0);
  textSize(16);
  text("HOME", btnX, btnY);
  pop();
}
