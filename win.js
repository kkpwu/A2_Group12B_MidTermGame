function drawWinScreen() {
  // 1. Draw your custom win background loaded in sketch.js
  if (winBG) {
    image(winBG, 0, 0, width, height);
  } else {
    background(46, 204, 113); // Fallback green if image fails
  }

  // 2. Add an overlay for readability
  rectMode(CENTER);
  fill(0, 150);
  rect(width / 2, height / 2, 400, 200, 20);

  // 3. Victory Text
  fill(255);
  noStroke();
  textSize(48);
  textAlign(CENTER, CENTER);
  text("VICTORY!", width / 2, height / 2 - 30);

  // 4. Play Again Button
  drawRestartButton();
}

function drawRestartButton() {
  let btnX = width / 2;
  let btnY = height / 2 + 70;

  // Hover effect: Change color if the mouse is over the button
  if (
    mouseX > btnX - 100 &&
    mouseX < btnX + 100 &&
    mouseY > btnY - 25 &&
    mouseY < btnY + 25
  ) {
    fill(255, 100, 100); // Lighter red on hover
    cursor(HAND);
  } else {
    fill(255);
    cursor(ARROW);
  }

  rectMode(CENTER); // Ensure the button draws from the center
  rect(btnX, btnY, 200, 50, 10);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER); // Ensure text is perfectly centered in the rect
  textSize(20);
  text("RESTART", btnX, btnY);
}
