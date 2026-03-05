function drawMainGrid() {
  push();

  // 1. Precise Centering Math
  let gap = 220;
  let wholeWidth = width - gap * 2; // 360px
  let gridSize = wholeWidth / 5;

  // These must be calculated exactly like this to stay centered
  let startX = width / 2 - wholeWidth / 2;
  let startY = height / 2 - wholeWidth / 2 + 50;

  // 2. Draw the Container (White background box)
  rectMode(CENTER);
  fill(255);
  noStroke();
  // Centered at 400, 350 to match your Game.Page.png layout
  rect(400, 350, wholeWidth + 20, wholeWidth + 20, 15);

  // 3. Draw the Squares
  rectMode(CORNER);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let xpos = startX + i * gridSize;
      let ypos = startY + j * gridSize;
      let index = i + j * 5;

      if (index !== firstSelected) {
        strokeWeight(5);
        stroke(0);
        fill(palette[playerGrid[index]]);
        square(xpos, ypos, gridSize);
      }
    }
  }

  // 4. Draw Highlighted Square last (so all 4 yellow lines show)
  if (firstSelected !== -1) {
    let i = firstSelected % 5;
    let j = Math.floor(firstSelected / 5);
    let xpos = startX + i * gridSize;
    let ypos = startY + j * gridSize;

    strokeWeight(6);
    stroke(255, 255, 0); // Solid yellow
    fill(palette[playerGrid[firstSelected]]);
    square(xpos, ypos, gridSize);
  }

  pop();
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
