// UBBA LEGENDS RUN - Utility Functions
// Main game file: main.js

// Utility: Save high score
function saveHighScore(score) {
  const existing = localStorage.getItem("ubbaHighScore") || 0;
  if (score > existing) {
    localStorage.setItem("ubbaHighScore", score);
    return true;
  }
  return false;
}

// Utility: Get high score
function getHighScore() {
  return parseInt(localStorage.getItem("ubbaHighScore") || 0);
}

// Utility: Save character progress
function saveCharacterProgress(charIndex, levelReached) {
  const key = `ubbaChar_${charIndex}_level`;
  const existing = localStorage.getItem(key) || 0;
  if (levelReached > existing) {
    localStorage.setItem(key, levelReached);
  }
}

// Utility: Get character progress
function getCharacterProgress(charIndex) {
  return parseInt(localStorage.getItem(`ubbaChar_${charIndex}_level`) || 0);
}

// Utility: Add custom character
function addCustomCharacterUtil(name, emoji) {
  if (window.addCustomCharacter) {
    return window.addCustomCharacter(name, emoji);
  }
  return false;
}

// Utility: Get all characters
function getAllCharacters() {
  if (window.characters) {
    return window.characters;
  }
  return [];
}

// Utility: Clear all saves
function clearAllSaves() {
  if (confirm("Clear all game progress?")) {
    localStorage.removeItem("ubbaHighScore");
    localStorage.removeItem("ubbaCharacters");
    for (let i = 0; i < 50; i++) {
      localStorage.removeItem(`ubbaChar_${i}_level`);
    }
    location.reload();
  }
}

// Utility: Export game data
function exportGameData() {
  const data = {
    highScore: getHighScore(),
    characters: localStorage.getItem("ubbaCharacters"),
    timestamp: new Date().toISOString(),
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ubba-save-${Date.now()}.json`;
  a.click();
}

// Utility: Get difficulty multiplier
function getDifficultyMultiplier(level) {
  return 1 + (level - 1) * 0.1;
}

// Utility: Calculate score multiplier
function calculateScoreMultiplier(level, charactersCollected) {
  return level * (1 + charactersCollected * 0.05);
}

console.log("🎮 UBBA LEGENDS RUN Utilities Loaded");