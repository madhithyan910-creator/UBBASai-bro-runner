# 🎮 UBBA LEGENDS RUN - Complete Features Guide

## 📋 All Features Implemented

### 1. **Audio Management** 🔊
- **Game starts MUTED** (default state)
- **Unmute Button** in top-right corner of home screen toggles background music
- When **unmuted**, `music.mp3` plays in loop during gameplay
- When you **lose**, randomly plays either `voice1.mp3` or `voice2.mp3`
- All audio files stored in `<audio>` tags with IDs: `bgMusic`, `voice1`, `voice2`

### 2. **Theme & Button Highlighting** 🎨
- **Home Screen** with 4 selectable themes:
  - 🛣️ Road (Red)
  - 🌊 Riverside (Cyan)
  - 🏫 College (Green)
  - 🌲 Forest (Dark Green)
- **Selected theme button** shows with:
  - Yellow background (`#FFD700`)
  - 3px solid orange border (`#FFA500`)
- Changes dynamically when you click different themes
- Same highlighting system for character selection

### 3. **Character Management** 👥
- **5 Pre-built Characters**:
  - 😊 Happy (Green)
  - 😎 Cool (Blue)
  - 🤩 Star (Orange)
  - 🥸 Spy (Purple)
  - 😍 Loved (Pink)
- **Add Custom Characters** (up to 50 total):
  ```javascript
  addCustomCharacter("Your Name", "Your Emoji")
  ```
- Characters saved in `localStorage` for persistence
- Each character has unique color with emoji face on player model
- **Change character during pause** without restarting

### 4. **Pause Screen** ⏸️
- Press **SPACE** to pause at any time
- Shows menu with:
  - **Character Change Options** - Switch character mid-game
  - **Resume Button (▶️)** - Continue playing
  - **Home Button (🏠)** - Return to home screen
- Music pauses when you pause
- Character changes apply immediately

### 5. **Home Icon & Navigation** 🏠
- **Home icon button** on pause screen
- Takes you back to:
  - Home/Menu screen
  - Level selection
  - Theme selection
  - Character selection
- Resets game state safely

### 6. **Level Progression** 📈

**10 Playable Levels** with increasing difficulty:

| Level | Obstacle Spacing | Speed | Hazard Frequency | Powerup Frequency |
|-------|------------------|-------|------------------|-------------------|
| 1 | 6.0 | 0.08 | 30% | 15% |
| 2 | 5.0 | 0.09 | 35% | 14% |
| 3 | 4.5 | 0.10 | 40% | 13% |
| 4 | 4.0 | 0.11 | 45% | 12% |
| 5 | 3.5 | 0.12 | 50% | 11% |
| 6 | 3.2 | 0.13 | 55% | 10% |
| 7 | 3.0 | 0.14 | 60% | 9% |
| 8 | 2.8 | 0.15 | 65% | 8% |
| 9 | 2.5 | 0.16 | 70% | 7% |
| 10 | 2.0 | 0.18 | 80% | 6% |

- **Level 1**: Very easy, wide spacing, minimal obstacles
- **Level 10**: Extremely challenging, tight spacing, many obstacles
- Progresses automatically when you reach Z=50
- Each level completion gives 100 × level bonus points

### 7. **Enemy Faces on Obstacles** 😈
- All obstacles display random enemy faces:
  - 😈 Devil
  - 👹 Demon
  - 🤖 Robot
  - 👾 Alien
  - 🎃 Pumpkin
- Faces rendered on texture using canvas rendering
- Makes obstacles visually distinct and fun

### 8. **Floating Coins** 💰
- Yellow cylindrical coins floating in air
- Bob up and down with sine wave motion
- Give **10 points** when collected
- Sound effect when collected (if powerup sounds available)
- Randomly distributed throughout levels

### 9. **Power-ups** 🎁
- **Shield 🛡️** (Cyan):
  - Protects from one obstacle collision
  - Lasts 10 seconds
  - Auto-triggered on collision
- **Boost 🚀** (Red):
  - Temporary speed increase
  - Glowing effect
  - Lasts 5 seconds
- Both rotate for visual appeal
- Float in mid-air
- Spawn randomly based on level difficulty

### 10. **Game Controls** ⌨️
```
A or ← Arrow  - Move Left
D or → Arrow  - Move Right
W or ↑ Arrow  - Jump
SPACE         - Pause/Resume
```

### 11. **HUD (Heads-Up Display)** 📊
Real-time stats shown in top-left corner:
- **Score**: Total points earned
- **Level**: Current level
- **Z Position**: Distance traveled
- **🛡️ Shield**: Displays when shield active
- **🚀 Boost**: Displays when boost active

### 12. **Game Over Screen** 💥
Shows when you hit obstacle without shield:
- Final Score
- Level Reached
- **🏠 HOME** button - Return to menu
- **🔄 TRY AGAIN** button - Restart same level

### 13. **Data Persistence** 💾
All data saved in `localStorage`:
```javascript
// High Score
saveHighScore(score)
getHighScore()

// Character Progress
saveCharacterProgress(charIndex, levelReached)
getCharacterProgress(charIndex)

// Custom Characters
addCustomCharacterUtil(name, emoji)
getAllCharacters()

// Clear All Data
clearAllSaves()
```

### 14. **3D Graphics** 🎮
- Built with **THREE.js**
- 3D player model with character emoji
- Textured obstacles with enemy faces
- Realistic lighting and shadows
- Smooth camera following
- Multiple themed environments

## 📁 File Structure

```
ubba-legends-run/
├── index.html       - Main HTML file (audio setup)
├── main.js          - Complete game logic (THREE.js)
├── script.js        - Utility functions
├── style.css        - Styling & animations
├── music.mp3        - Background music
├── voice1.mp3       - Loss sound 1
└── voice2.mp3       - Loss sound 2
```

## 🎮 How to Play

1. **Open** `index.html` in a modern browser
2. **Select** your character (or add custom ones)
3. **Choose** a theme
4. **Click** "START LEVEL"
5. **Avoid** red obstacle boxes with enemy faces
6. **Collect** yellow coins 💰
7. **Grab** power-ups (shield 🛡️ or boost 🚀)
8. **Reach** Z=50 to complete the level and progress
9. **Press SPACE** to pause and change character
10. **Dodge** increasingly difficult obstacles in higher levels

## 🎨 Customization

### Add Custom Character
```javascript
// In browser console:
addCustomCharacter("Your Name", "🎭")  // Returns true if added
```

### Export Game Data
```javascript
exportGameData()  // Downloads JSON file with progress
```

### Get Statistics
```javascript
getHighScore()                // Returns best score
getCharacterProgress(0)       // Returns level reached by character
getAllCharacters()            // Returns all unlocked characters
getDifficultyMultiplier(5)    // Returns difficulty for level 5
```

## 🔧 Technical Details

### Level Configuration Object
```javascript
levelConfig[level] = {
  obstacleSpaceDifficulty: number,  // Smaller = closer obstacles
  speed: number,                     // Player speed
  hazardFreq: number,                // 0-1 Obstacle spawn rate
  powerupFreq: number                // 0-1 Powerup spawn rate
}
```

### Character Object Structure
```javascript
{
  name: "Character Name",
  emoji: "🎭",
  color: 0xHEXCOLOR
}
```

### Game States
- `"home"` - Home/menu screen
- `"playing"` - Active gameplay
- `"paused"` - Paused state
- `"gameOver"` - Loss screen

## 📱 Browser Compatibility
- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge
- Requires WebGL support

## 🚀 Tips for Players
1. **Jump earlier** to avoid obstacles
2. **Collect coins** for bonus points
3. **Save shields** for difficult levels
4. **Use boosts** wisely for quick progression
5. **Level 5+** requires quick reflexes
6. **Change character** to adapt playstyle
7. **Master keyboard** controls for smooth movement

## 🎯 Score System
- **Coin collected**: +10 points
- **Level completed**: +100 × level
- **Character variety bonus**: Up to 5% extra per character collected
- **Difficulty multiplier**: Increases with level

---

**Version**: 1.0  
**Engine**: THREE.js 0.158  
**Last Updated**: 2026  
🔥 **UBBA LEGENDS RUN** 🔥
