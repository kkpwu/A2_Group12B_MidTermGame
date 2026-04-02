let rules =
  "• Click the colored squares in the main grid to match the pattern on the target grid on the right side.\n" +
  "• You have 60 seconds to finish each level.\n" +
  "• Pop-ups will distract you as your progress - click them to dismiss!\n" +
  "• Press SPACE to take a deep breath (Pause).\n" +
  "• Press R to restart the game level.\n" +
  "• Match the grid perfectly to win.";

function drawInstructionsScreen() {
  image(instructionsBG, 0, 0, width, height);

  // Semi-transparent overlay to make text readable
  fill(0, 180);
  rectMode(CENTER);
  rect(width / 2, height / 2, 900, 500, 20);

  // Title text
  fill(255);
  textSize(80);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("How To Play:", width / 2, height / 2 - 250);

  // Rules text
  textStyle(NORMAL);
  textSize(28);
  fill(240);
  textAlign(CENTER, CENTER);

  // Display the rules string you created
  text(rules, width / 2, height / 2, 800, 400);

  // Back Button
  textAlign(CENTER, CENTER);
  drawButton(width / 2 - 150, height / 2 + 220, "BACK");
  drawButton(width / 2 + 150, height / 2 + 220, "START");
}

function checkInstructionClicks() {
  if (gameState === "instructions") {
    let btnY = height / 2 + 220; // This must match the draw call exactly!
    let backX = width / 2 - 150;
    let startX = width / 2 + 150;

    // CHECK BACK BUTTON
    if (
      mouseX > backX - 100 &&
      mouseX < backX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      gameState = "start";
      cursor(ARROW);
    }

    // CHECK START BUTTON
    if (
      mouseX > startX - 100 &&
      mouseX < startX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      startLevel("tutorial"); // Jump straight into the game
      cursor(ARROW);
    }
  }
}

function drawButton(x, y, label) {
  push();
  rectMode(CENTER);

  // Hit detection for hover effect
  if (
    mouseX > x - 100 &&
    mouseX < x + 100 &&
    mouseY > y - 40 &&
    mouseY < y + 40
  ) {
    fill(255, 200);
    cursor(HAND);
  } else {
    fill(255, 100);
  }

  noStroke();
  rect(x, y, 200, 80, 15);

  fill(0);
  textSize(32);
  textStyle(BOLD);
  text(label, x, y);
  pop();
}
