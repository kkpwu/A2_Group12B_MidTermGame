function drawActiveGrid() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  push();
  let totalGridArea = 350;
  let cellSize = totalGridArea / dim;
  let centerX = width / 2;
  let centerY = height / 2 + 50;

  // 1. Draw the Background Container
  rectMode(CENTER);
  fill(255);
  noStroke();
  rect(centerX, centerY, totalGridArea + 20, totalGridArea + 20, 15);

  // 2. Calculate Top-Left Start Point
  let startX = centerX - totalGridArea / 2;
  let startY = centerY - totalGridArea / 2;

  // 3. Draw the Colored Tiles
  rectMode(CORNER);
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      let index = i + j * dim;
      let xpos = startX + i * cellSize;
      let ypos = startY + j * cellSize;

      strokeWeight(5);
      stroke(0);

      if (playerGrid[index] !== undefined) {
        fill(palette[playerGrid[index]]);
        rect(xpos, ypos, cellSize, cellSize);
      }
    }
  }

  // 4. Draw the Highlight (Drawn AFTER the loops so it's on top)
  if (firstSelected !== -1) {
    let col = firstSelected % dim;
    let row = floor(firstSelected / dim);
    let hX = startX + col * cellSize;
    let hY = startY + row * cellSize;

    noFill();
    stroke(255, 255, 0); // Bright Yellow
    strokeWeight(6);
    // Draw the highlight rectangle
    rect(hX, hY, cellSize, cellSize);

    // Optional: Add a second inner stroke for better visibility on white/yellow tiles
    stroke(0);
    strokeWeight(1);
    rect(hX + 3, hY + 3, cellSize - 6, cellSize - 6);
  }

  pop();
}

function drawTargetPreview() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  push();
  rectMode(CORNER); // <--- ADD THIS LINE TO FIX ALIGNMENT

  let targetTileSize = 20;
  let margin = 60;

  let totalWidth = dim * targetTileSize;
  let startX = width - totalWidth - margin;
  let startY = 80;

  // 1. Draw Background Box
  fill(0, 100);
  noStroke();
  rect(startX - 5, startY - 5, totalWidth + 10, totalWidth + 10, 5);

  // 2. Draw Mini Tiles
  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      let index = i + j * dim;

      if (targetGrid[index] !== undefined) {
        fill(palette[targetGrid[index]]);
        // Drawing squares in CORNER mode
        rect(
          startX + i * targetTileSize,
          startY + j * targetTileSize,
          targetTileSize,
          targetTileSize,
        );
      }
    }
  }

  // --- LABEL ---
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("TARGET", startX + totalWidth / 2, startY - 10);
  pop();
}

function drawLevelHUD() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  // Replaces underscores with spaces for the screen (e.g. "super_easy" -> "SUPER EASY")
  let displayName = currentLevelKey.replace("_", " ").toUpperCase();

  push();
  textAlign(CENTER, TOP);

  // Draw Level Title
  fill(255);
  textSize(28);
  textStyle(BOLD);
  text(displayName, width / 2, 20);

  // Draw Timer
  if (timer !== null) {
    textSize(32);
    if (timer <= 10) fill(255, 100, 100); // Turn red when low
    text(timer + "s", width / 2, 60);
  }
  pop();
}
