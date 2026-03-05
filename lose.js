function drawLoseScreen() {
  if (loseBG) {
    image(loseBG, 0, 0, width, height);
  } else {
    background(192, 57, 43); // Fallback red if image fails
  }

  // 2. Add a semi-transparent overlay for readability
  rectMode(CENTER);
  fill(0, 180);
  noStroke();
  rect(width / 2, height / 2, 450, 250, 20);

  // 3. Game Over Text
  fill(255, 50, 50); // Bright red text
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 40);

  // 4. Subtext
  fill(255);
  textSize(20);
  text("The hourglass has run out...", width / 2, height / 2 + 10);

  // 5. Try Again Button
  drawTryAgainButton();
}

function drawTryAgainButton() {
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

  rect(btnX, btnY, 200, 50, 10);

  fill(0);
  textSize(20);
  text("TRY AGAIN", btnX, btnY);
}
