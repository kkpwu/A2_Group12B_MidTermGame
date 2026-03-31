function drawGameScreen() {
  drawLevelHUD(); // Found in grid.js
  drawTimerUI(); // Found in game.js
  drawActiveGrid(); // Found in grid.js
  drawTargetPreview(); // Found in targetgrid.js
  drawHomeButton(); // Found in grid.js

  if (timer !== null && timer <= 0) {
    gameState = "lose";
    if (timerInterval) clearInterval(timerInterval);
  }

  // Target Grid (Top Right)
  fill(255);
  textSize(14);
  text("TARGET", width * 0.85 + 15, height * 0.2 - 55);
}

function drawTimerUI() {
  push();
  noStroke();
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);

  let m = floor(timer / 60);
  let s = timer % 60;
  let displayTime = m + ":" + (s < 10 ? "0" + s : s);

  text(displayTime, width / 2, 100);
  pop();
}
