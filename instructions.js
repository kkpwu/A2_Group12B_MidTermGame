let rules =
  "• Click the colored squares into the grid to match the pattern on the target.\n" +
  "• You have 60 seconds to finish.\n" +
  "• Pop-ups will distract yo - click them to dismiss!\n" +
  "• Press SPACE to take a deep breath (Pause).\n" +
  "• Press R to restart the game.\n" +
  "• Match the grid perfectly to win.";

function drawInstructionsScreen() {
  image(instructionsBG, 0, 0, width, height);

  // Semi-transparent overlay to make text readable
  fill(0, 150);
  rectMode(CENTER);
  rect(width / 2, height / 2, 600, 400, 10);

  // Title text
  fill(255);
  textSize(42);
  text("How To Play:", width / 2, height / 2 - 150);

  // Rules text
  textSize(20);
  textAlign(CENTER, CENTER);

  // Display the rules string you created
  text(rules, width / 2, height / 2, 500, 300);

  // Back Button
  textAlign(CENTER, CENTER);
  drawButton(width / 2, height / 2 + 150, "Back");
}

function checkInstructionClicks() {
  if (gameState === "instructions") {
    // Check if Back button is clicked
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 150 - 25 &&
      mouseY < height / 2 + 150 + 25
    ) {
      gameState = "start";
    }
  }
}

function drawButton(x, y, label) {
  fill(255, 100);
  noStroke();
  rectMode(CENTER);
  rect(x, y, 150, 50, 10);
  fill(255);
  textSize(20);
  text(label, x, y);
}
