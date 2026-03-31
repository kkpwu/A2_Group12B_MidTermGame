let currentLevelKey = "tutorial"; // Start here

const LEVEL_CONFIG = {
  tutorial: {
    gridSize: 3,
    timer: null, // null means no timer
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "super_easy",
  },
  super_easy: {
    gridSize: 4,
    timer: 60,
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "easy",
  },
  easy: {
    gridSize: 4,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 0.2, // Low chance
    nextState: "medium",
  },
  medium: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 0.4,
    nextState: "hard",
  },
  hard: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 0.7, // Frequent
    nextState: "impossible",
  },
  impossible: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 1.0, // Constant chaos
    nextState: "win_screen",
  },
};
