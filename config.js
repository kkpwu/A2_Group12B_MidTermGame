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
    popupFrequency: 24000, // Every 24 seconds on average
    nextState: "medium",
  },
  medium: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 18000, // Every 18 seconds on average
    nextState: "hard",
  },
  hard: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 12000, // Every 12 seconds on average
    nextState: "impossible",
  },
  impossible: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 7000, // Every 71 seconds on average
    nextState: "win_screen",
  },
};
