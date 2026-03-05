function drawTargetGrid() {
  push();
  // 1. Make the target squares bigger (changed from 12 to 20)
  let targetSize = 20;
  let margin = 60;

  // Calculate start position so it stays tucked in the top right
  let startX = width - targetSize * 5 - margin;
  let startY = margin;

  // 2. Set the stroke weight as requested
  stroke(255); // White border for each small square
  strokeWeight(2); // Requested weight

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let index = i + j * 5;

      // Fill based on the randomized target data
      if (targetGrid[index] !== undefined) {
        fill(palette[targetGrid[index]]);
        rect(
          startX + i * targetSize,
          80 + j * targetSize,
          targetSize,
          targetSize,
        );
      }
    }
  }
  pop();
}
