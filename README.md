# Midterm Game - Group 12B - Pixel Alignment: Stability Crisis

## Authors

**Group 12B, Karen Wu (21020152), Matthew Spong (21089661) and Frank Le (21068318)**

## Description

**Pixel Alignment: Stability Crisis** is an interactive experience inspired by the symptoms of **Generalized Anxiety Disorder (GAD)**. GAD is a chronic condition characterized by excessive, persistent, and difficult-to-control worry across multiple domains of life.

The game mirrors this psychological state by tasking the player with a simple organizational goal (aligning the grid) while intentionally overwhelming them with "mental noise" in the form of relentless, intrusive system pop-ups. These distractions represent the "excessive worry" that interferes with daily tasks, forcing the player to manage constant interruptions while under the pressure of a depleting timer.

### Key Features:

- **The Anxiety Engine**: A multi-threaded popup system that simulates the "difficult-to-control" nature of intrusive thoughts.
- **Color-Swap Mechanics**: Represents the "primary task" the player is trying to focus on despite environmental/internal stressors.
- **Dynamic Timer System**: Provides a constant baseline of pressure, common in chronic anxiety conditions.
- **Zen Pause State**: A "Deep Breath" mechanic offering a brief, visual respite from the mechanical chaos.

---

## Controls

- **Mouse Click**: Select and swap tiles / Clear "Intrusive" pop-up errors.
- **Spacebar**: Toggle Pause (Deep Breath mode).
- **'R' or 'r' Key**: Restart the challenge.

---

## How to Run

1. **Download the Project**: Ensure all files and the `/assets` folder are in a single directory.
2. **Using VS Code (Recommended)**:
   - Open the project folder in VS Code.
   - Install the **Live Server** extension.
   - Right-click `index.html` and select **"Open with Live Server"**.
3. **Using a Browser**:
   - Simply drag and drop `index.html` into any modern web browser.
   - _Note: Live Server is preferred to avoid local security (CORS) issues with images._

---

## Technical Overview

### 1. Anxiety Simulation Architecture

The core technical challenge was translating the persistent, difficult-to-control nature of GAD into a functional game loop.

- **Asynchronous Interruptions**: The `handlePopups()` function uses `millis()` rather than a simple frame count to trigger events, ensuring pop-ups appear based on real-time duration.
- **Z-Index & Interaction Blocking**: To simulate how intrusive thoughts "bury" a primary task, pop-ups are stored in a dynamic array. The `handleMouseClicks()` function uses a conditional "guard" that prevents any grid interaction if `activePopups.length > 0`.

### 2. State-Driven UI

The game uses a global state machine to manage transitions:

- **High-Stress (Game State)**: Characterized by a 60-second `setInterval` timer and high-frequency pop-up triggers.
- **Low-Stress (Pause State)**: Triggered by the `Spacebar`, this state clears the screen and presents a "Zen" aesthetic (stone stacking) to represent a "Deep Breath" exercise.

---

## Project Structure

### Core Logic

- `sketch.js`: The central engine handling `setup()`, `draw()`, and global state switching.
- `index.html`: Entry point linking all scripts.
- `style.css`: Basic styling to center the $800 \times 600$ canvas.

### Gameplay Mechanics

- `grid.js`: Logic for the $5 \times 5$ interactive player grid.
- `targetgrid.js`: Manages the generation of the goal pattern.
- `popups.js`: The "Anxiety Engine" managing the array of intrusive windows.
- `game.js`: Shared gameplay utilities and session initialization.

### State Screens

- `start.js`: Title screen and menu hitboxes.
- `pause.js`: The Zen-themed "Deep Breath" overlay.
- `instructions.js`: Tutorial and control guide.
- `win.js` / `lose.js`: Victory and defeat screen UIs.

---

## Assets

All graphical assets are located in the `/assets` folder:

- `Title.Page.png`, `Game.Page.png`, `Pause.Page.png`, `Instructions.Page.png`, `Win.Page.png`, `Lose.Page.png`.

## GenAI

The code was written by **Karen Wu**, with the following AI assistance:

- **Grammarly**: Refining code comments and documentation.
- **Gemini AI**: Debugging logical errors, implementing the pop-up array system, and architectural optimization.

---

## 🛠️ Tech Stack & Concepts

- **p5.js Library**: Rendering engine.
- **State Management**: Managing transitions between stress levels.
- **Array Manipulation**: Managing the lifecycle of dynamic UI elements.
