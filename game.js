function drawGameScreen() {
  drawTimerUI();
  drawMainGrid(); // Found in grid.js
  drawTargetGrid(); // Found in targetgrid.js
  drawHomeButton(); // Found in grid.js
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

function checkWin() {
  let match = true;
  for (let i = 0; i < 25; i++) {
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
