# 🔌 UBBA Legends Run - API Reference

## 📚 Global Functions

### Character Management

#### `selectCharacter(index)`
Select a character by index
```javascript
selectCharacter(0)  // Select first character
selectCharacter(selectedCharacterIndex)  // Select by variable
```

#### `addCustomCharacter(name, emoji)`
Add a new custom character (max 50 total)
```javascript
const success = addCustomCharacter("Knight", "⚔️")
if (success) {
  console.log("Character added!")
} else {
  console.log("Reached character limit (50)")
}
```

#### `changeCharacterPaused(index)`
Change character during pause
```javascript
changeCharacterPaused(2)  // Switch to character at index 2
```

### Theme Management

#### `setTheme(themeId)`
Change the game theme
```javascript
setTheme('road')        // 🛣️ Road
setTheme('riverside')   // 🌊 Riverside
setTheme('college')     // 🏫 College
setTheme('forest')      // 🌲 Forest
```

### Game Control

#### `startGame()`
Start the game from home screen
```javascript
startGame()
```

#### `toggleMute()`
Toggle audio on/off
```javascript
toggleMute()
// If muted → unmutes and plays music
// If unmuted → mutes and stops music
```

#### `resumeGame()`
Resume from pause screen
```javascript
resumeGame()
```

#### `goHome()`
Return to home screen
```javascript
goHome()
// Resets level to 1
// Clears game score
// Restores initial state
```

#### `playLostSound()`
Play random loss sound (voice1 or voice2)
```javascript
playLostSound()
```

#### `showPauseScreen()`
Display pause menu
```javascript
showPauseScreen()
```

#### `showGameOverScreen(reason)`
Display game over screen with custom message
```javascript
showGameOverScreen("💥 Hit an obstacle!")
showGameOverScreen("🎉 Level complete!")
```

#### `showHomeScreen()`
Render home/menu screen
```javascript
showHomeScreen()
```

### Scene Management

#### `setupScene()`
Initialize 3D scene with current theme and level
```javascript
setupScene()
// Called automatically by startGame()
```

#### `createPlayer()`
Initialize player 3D model with current character
```javascript
createPlayer()
// Renders character emoji face on player
```

#### `createObstacle(z, enemyType)`
Add obstacle at Z position
```javascript
createObstacle(20)           // Random enemy face
createObstacle(20, "😈")     // Specific enemy face
```

#### `createCoin(z, x)`
Add coin at Z position
```javascript
createCoin(25)               // Random X position
createCoin(25, 0.5)          // Specific X position
```

#### `createPowerup(z, type)`
Add power-up at Z position
```javascript
createPowerup(30)            // Random type (shield or boost)
createPowerup(30, "shield")  // Shield
createPowerup(30, "boost")   // Boost
```

### Utility Functions (script.js)

#### `saveHighScore(score)`
Save high score if it beats existing
```javascript
const isBetter = saveHighScore(1500)
```

#### `getHighScore()`
Retrieve saved high score
```javascript
const best = getHighScore()
console.log(best)
```

#### `saveCharacterProgress(charIndex, levelReached)`
Save character's level progress
```javascript
saveCharacterProgress(0, 5)  // Character 0 reached level 5
```

#### `getCharacterProgress(charIndex)`
Get character's level progress
```javascript
const level = getCharacterProgress(0)
```

#### `getDifficultyMultiplier(level)`
Calculate difficulty multiplier
```javascript
const multiplier = getDifficultyMultiplier(5)
// Returns: 1 + (5-1) * 0.1 = 1.4
```

#### `calculateScoreMultiplier(level, charactersCollected)`
Calculate final score multiplier
```javascript
const multiplier = calculateScoreMultiplier(3, 2)
// Returns: 3 * (1 + 2 * 0.05) = 3.3
```

#### `exportGameData()`
Download game progress as JSON
```javascript
exportGameData()
// Downloads: ubba-save-[timestamp].json
```

#### `clearAllSaves()`
Clear all game data with confirmation
```javascript
clearAllSaves()
// Shows confirmation dialog, then reloads page
```

## 📊 Global Variables

### Game State
```javascript
gameState          // "home" | "playing" | "paused" | "gameOver"
currentTheme       // "road" | "riverside" | "college" | "forest"
currentLevel       // 1-10
selectedCharacterIndex  // 0-49
isMuted            // true | false
isPaused           // true | false
gameScore          // Current score number
shieldActive       // true | false
boostActive        // true | false
```

### Game Objects
```javascript
player             // Player object with mesh, position, velocity
scene              // THREE.Scene
camera             // THREE.PerspectiveCamera
renderer           // THREE.WebGLRenderer
characters         // Array of character objects
obstacles          // Array of obstacle objects
coins              // Array of coin objects
powerups           // Array of powerup objects
levelConfig        // Object with level difficulty settings
```

### Audio
```javascript
bgMusic            // HTMLAudioElement for background music
voice1Audio        // HTMLAudioElement for loss sound 1
voice2Audio        // HTMLAudioElement for loss sound 2
```

## 🎮 Player Properties

```javascript
player = {
  mesh: THREE.Mesh,           // 3D model
  position: {x, y, z},        // Current coordinates
  velocity: {x, y, z},        // Movement velocity
  jumping: boolean,           // Is jumping?
  speed: number,              // Movement speed
  jumpForce: number,          // Jump strength
  immuneTime: number          // Invulnerability duration
}
```

## 🎛️ Level Configuration

```javascript
levelConfig = {
  1: {
    obstacleSpaceDifficulty: 6,    // 0-100, lower = harder
    speed: 0.08,                   // Player speed (0-1)
    hazardFreq: 0.3,               // Obstacle spawn rate (0-1)
    powerupFreq: 0.15              // Powerup spawn rate (0-1)
  },
  // ... continues through level 10
  10: {
    obstacleSpaceDifficulty: 2,
    speed: 0.18,
    hazardFreq: 0.8,
    powerupFreq: 0.06
  }
}
```

## 🎨 Color References

```javascript
// Character Colors
0x4CAF50    // Happy - Green
0x2196F3    // Cool - Blue
0xFF9800    // Star - Orange
0x9C27B0    // Spy - Purple
0xFF1493    // Loved - Pink

// UI Colors
#4CAF50     // Green (buttons)
#2196F3     // Blue (secondary)
#FF6B6B     // Red (danger)
#4ECDC4     // Cyan (secondary)
#FFD700     // Gold (selected/points)
#FFA500     // Orange (highlight)
```

## 🎮 Keyboard Events

```javascript
keys = {
  'a': boolean,              // Move left
  'd': boolean,              // Move right
  'w': boolean,              // Jump (up)
  'arrowleft': boolean,      // Move left
  'arrowright': boolean,     // Move right
  'arrowup': boolean,        // Jump
  ' ': boolean               // Pause
}
```

## 📦 LocalStorage Keys

```javascript
// Saved data in browser storage
localStorage.ubbaHighScore              // Best score
localStorage.ubbaCharacters             // Custom characters JSON
localStorage.ubbaChar_[i]_level         // Level progress per character
```

## 🔊 Audio Events

```javascript
// Music
bgMusic.play()          // Start background music
bgMusic.pause()         // Stop music
bgMusic.currentTime = 0 // Restart music

// Loss sounds (randomized)
voice1Audio.play()      // Or
voice2Audio.play()      // Random selection in playLostSound()
```

## 📐 Collision Detection

Collisions checked for:
- **Obstacles**: Player position vs obstacle mesh (AABB)
- **Coins**: Floating collection
- **Powerups**: Automatic pickup on proximity

```javascript
// Collision calculation (AABB - Axis Aligned Bounding Box)
if (Math.abs(player.position.x - object.position.x) < radius &&
    Math.abs(player.position.y - object.position.y) < radius &&
    Math.abs(player.position.z - object.position.z) < radius)
{
  // Collision detected
}
```

## 🎯 Scoring System

```javascript
gameScore += 10              // Coin collected
gameScore += 100 * level     // Level completed
multiplier = level * (1 + chars * 0.05)  // Potential multiplier
```

## 🌍 Available Themes & Environments

- **Road** (Default)
  - Sky blue background
  - Gray ground
  - Classic highway theme

- **Riverside**
  - Sky blue background
  - Cyan theme
  - Water theme

- **College**
  - Green background
  - Green ground
  - Academic setting

- **Forest**
  - Dark green background
  - Brown ground
  - Nature theme

## 🐛 Debug Commands (Browser Console)

```javascript
// View all characters
console.log(characters)

// View current player
console.log(player)

// View all obstacles
console.log(obstacles)

// Check game state
console.log(gameState)

// Add test character
addCustomCharacter("Test", "✨")

// Get character count
console.log(characters.length)

// Manually set score
gameScore = 5000

// Set level
currentLevel = 10

// Check localStorage
console.log(localStorage)
```

---

**Need help?** Check FEATURES_GUIDE.md for player guide
