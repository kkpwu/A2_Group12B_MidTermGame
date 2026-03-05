function drawPauseScreen() {
  push();
  if (pauseBG) {
    image(pauseBG, 0, 0, width, height);
  }

  // 2. The Text Box
  rectMode(CENTER);
  fill(255, 150);
  noStroke();
  rect(400, 235, 400, 180, 20);

  // 3. Text - Adjusted to stay inside the higher box
  textAlign(CENTER, CENTER);
  fill(50); // Dark grey text
  noStroke();

  textSize(40);
  text("PAUSED", 400, 190);

  textSize(22);
  text("Take a deep breath...", 400, 235);

  fill(120);
  textSize(14);
  text("Press SPACE to Resume", 400, 275);
  fill(150, 50, 50);
  text("Press 'R' to Restart Challenge", 400, 300);
  pop();
}
