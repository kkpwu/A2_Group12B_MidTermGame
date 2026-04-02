let activePopups = [];
let nextPopupTime = 10000; // First popup after 5 seconds

function handlePopups() {
  let config = LEVEL_CONFIG[currentLevelKey];

  // 1. Only run if we are in game and popups are enabled for this level
  if (gameState === "game" && config && config.popupsEnabled) {
    if (millis() > nextPopupTime && activePopups.length < 8) {
      spawnPopup();

      // 2. Use the frequency from your config
      let baseFreq = config.popupFrequency;
      let variance = baseFreq * 0.2;

      nextPopupTime =
        millis() + random(baseFreq - variance, baseFreq + variance);
    }
  } else if (gameState !== "game") {
    // Clear popups if we go back to the menu or lose
    activePopups = [];
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

  // Play a random error sound when a popup appears!
  if (random() > 0.5) sfxError1.play();
  else sfxError2.play();

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
  // Loop backwards (top-most popup first)
  for (let i = activePopups.length - 1; i >= 0; i--) {
    let p = activePopups[i];

    // --- BUTTON HITBOX MATH ---
    let btnW = 120;
    let btnH = 30;
    let btnX = p.x - btnW / 2; // Center X minus half width
    let btnY = p.y + p.h / 2 - 35 - btnH / 2; // Local btnY converted to global

    // Check if mouse is inside the OVERRIDE button
    if (
      mouseX > btnX &&
      mouseX < btnX + btnW &&
      mouseY > btnY &&
      mouseY < btnY + btnH
    ) {
      activePopups.splice(i, 1); // Remove the popup

      if (sfxError2) {
        sfxError2.setVolume(0.4);
        sfxError2.play();
      }
      return true;
    }
  }
  return false;
}
