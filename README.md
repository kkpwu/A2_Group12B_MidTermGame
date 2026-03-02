# Title of Game

## Authors

**Group 12B, Karen Wu (21020152), Matthew Spong (21089661) and Frank Le (21068318)**

## Description

### Key Features:

-

---

-
- ***

## Controls

---

## Technical Overview

### Collision Logic

The game uses **AABB (Axis-Aligned Bounding Box)** logic. To allow the player to "slide" along walls, the collision check is performed twice per frame: once for the X-axis and once for the Y-axis.

### Coordinate Systems

- **World Coordinates**: The $4000 \times 3000$ arena where the player lives.
- **Screen Coordinates**: The static overlay where the "Use WASD" instructions are displayed.

---

## Project Structure

- `sketch.js` - Core logic: input handling, camera, and the main draw loop.
- `style.css` - Basic styling to center the canvas and remove scrollbars.

---

## Assets

**N/A**

## GenAI

The code was written by **Karen Wu**, with the following AI assistance:

- **Grammarly**: Used to refine and clarify code comments.
- **Gemini AI**: Used to debug logical errors and fix code bugs.

---

## 🛠️ Tech Stack & Concepts

- **p5.js Library**: Used for the rendering engine.
- **Coordinate Mapping**: Translating matrix indices to pixel values.
- **JSON Integration**: Asynchronous loading of level data.
