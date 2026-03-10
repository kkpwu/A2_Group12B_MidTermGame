let activePopups = [];
let nextPopupTime = 10000; // First popup after 5 seconds

function handlePopups() {
  if (gameState === "game") {
    if (millis() > nextPopupTime) {
      spawnPopup();
      nextPopupTime = millis() + random(650, 2500);
    }
  }
}

function spawnPopup() {
  let w = random(250, 400);
  let h = random(150, 250);

  let newPopup = {
    x: random(w / 2, width - w / 2),
    y: random(h / 2, height - h / 2),
    w: w,
    h: h,
    title: random([
      "SYSTEM ERROR",
      "CRITICAL OVERLOAD",
      "UNSTABLE PIXELS",
      "MEMORY LEAK",
    ]),
    shakeOffset: 0,
  };

  activePopups.push(newPopup);
}

function drawPopups() {
  for (let p of activePopups) {
    push();
    translate(p.x + random(-2, 2), p.y + random(-2, 2));
    rectMode(CENTER);

    // 1. Box Body
    fill(240);
    stroke(200, 0, 0);
    strokeWeight(4);
    rect(0, 0, p.w, p.h, 5);

    // 2. Flashing Title Bar
    if (frameCount % 20 < 10) fill(180, 0, 0);
    else fill(255, 0, 0);
    rect(0, -p.h / 2 + 20, p.w, 40, 5, 5, 0, 0);

    // 3. Text
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textSize(16);
    textStyle(BOLD);
    text(p.title, 0, -p.h / 2 + 20);

    fill(0);
    textStyle(NORMAL);
    textSize(13);
    text("Multiple errors detected!\nManual override required.", 0, 0);

    // 4. Button
    drawOverrideButton(p.h);
    pop();
  }
}

function drawOverrideButton(popupHeight) {
  let btnY = popupHeight / 2 - 35;
  fill(200);
  stroke(0);
  rect(0, btnY, 120, 30, 3);
  fill(0);
  noStroke();
  text("OVERRIDE", 0, btnY);
}

function checkPopupClicks() {
  // Check from the top (end of array) to bottom so we close the one on top first
  for (let i = activePopups.length - 1; i >= 0; i--) {
    let p = activePopups[i];
    let btnY = p.y + p.h / 2 - 35;

    if (
      mouseX > p.x - 60 &&
      mouseX < p.x + 60 &&
      mouseY > btnY - 15 &&
      mouseY < btnY + 15
    ) {
      activePopups.splice(i, 1); // Remove this specific popup
      return true; // Indicate that we handled a popup click
    }
  }
  return false;
}
