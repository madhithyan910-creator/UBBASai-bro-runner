[README.md](https://github.com/user-attachments/files/26487192/README.md)
# 🏃 UBBA LEGENDS RUN 🔥

A fast-paced 3D endless runner game with dynamic levels, character customization, and engaging gameplay!

## 🎮 Quick Start

1. **Download/Clone** all files to a folder
2. **Open** `index.html` in a Web Browser (Chrome/Firefox recommended)
3. **Ensure** `music.mp3`, `voice1.mp3`, `voice2.mp3` are in the same folder
4. **Play!** 🎯

## 📋 What's Included

```
📦 ubba-legends-run/
├── 📄 index.html           Main game file
├── 🎮 main.js             Game logic & 3D engine
├── 🛠️ script.js            Utility functions
├── 🎨 style.css           Styling
├── 🎵 music.mp3           Background music
├── 🎙️ voice1.mp3          Loss sound #1
├── 🎙️ voice2.mp3          Loss sound #2
├── 📖 README.md            This file
├── 📚 FEATURES_GUIDE.md    Complete features documentation
└── 🔌 API_REFERENCE.md    Developer API reference
```

## ✨ Main Features

### 🎮 Gameplay
- ✅ **10 Difficulty Levels** (Easy → Expert)
- ✅ **100% Procedural** obstacle generation
- ✅ **Character customization** (50 slots)
- ✅ **Power-ups**: Shield 🛡️ & Boost 🚀
- ✅ **Collectibles**: Coins 💰
- ✅ **Pause & Resume** mid-game
- ✅ **3D Graphics** with lighting & shadows

### 🎨 Customization
- ✅ **4 Themes**: Road, Riverside, College, Forest
- ✅ **5 Default Characters** + Custom emoji support
- ✅ **Change character mid-game** during pause
- ✅ **Add up to 50 custom characters**
- ✅ **Selected theme/character highlighting**

### 🔊 Audio
- ✅ **Mute/Unmute button** on home screen
- ✅ **Background music** loops during gameplay
- ✅ **Loss sounds** play on game over
- ✅ **Audio settings** persist

### 📊 Progression
- ✅ **Level 1**: Very Easy (obstacles far apart)
- ✅ **Levels 2-9**: Progressive difficulty
- ✅ **Level 10**: Extreme (tight obstacles, fast pace)
- ✅ **Auto-level up** at Z=50
- ✅ **Score bonuses** for level completion

## ⌨️ Controls

| Key | Action |
|-----|--------|
| **A** or **←** | Move Left |
| **D** or **→** | Move Right |
| **W** or **↑** | Jump |
| **SPACE** | Pause/Resume |

## 🎯 Objectives

- 🚀 **Survive** as long as possible
- 💰 **Collect coins** for points
- 🛡️ **Grab power-ups** to stay alive
- 📈 **Progress through 10 levels**
- 🏆 **Beat your high score**

## 📱 System Requirements

- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Display**: Minimum 800x600 resolution
- **GPU**: WebGL 2.0 support
- **Internet**: No internet required after loading

## 🎮 Game States Flow

```
[HOME] → [Character Select] ↓
           [Theme Select]   ↓
           [START GAME]     ↓
           ↓────[PLAYING]──→ [LEVEL UP]
           ↓                    ↓
        [PAUSE]←────────────[GAME OVER]
           ↓ (Change Character)
        [Resume] → [Back to Playing]
           ↓
        [Home] → [Back to Menu]
```

## 🔊 Audio Setup

The game requires 3 audio files in the same directory:

1. **music.mp3** - Background music (loops)
2. **voice1.mp3** - First loss sound (randomized)
3. **voice2.mp3** - Second loss sound (randomized)

If files are missing:
- Game still works (no audio)
- Check browser console for errors
- Ensure files are in the exact folder as HTML

## 💾 Save System

Data automatically saved to browser's `localStorage`:
- ✅ High scores
- ✅ Character progress
- ✅ Custom characters
- ✅ Theme preferences

To **clear all saves**:
```javascript
// In browser console:
clearAllSaves()
```

## 🎨 Customize Characters

### Add Custom Character (In Browser Console)

```javascript
// Add a custom character
addCustomCharacter("Your Name", "🎭")

// Check if successful
getAllCharacters().length  // Should show updated count
```

### Examples
```javascript
addCustomCharacter("Wizard", "🧙")
addCustomCharacter("Pirate", "🏴‍☠️")
addCustomCharacter("Alien", "👽")
addCustomCharacter("Knight", "⚔️")
```

**Max 50 characters** (5 default + 45 custom)

## 📊 Difficulty Levels

| Level | Spacing | Speed | Obstacles | Difficulty |
|-------|---------|-------|-----------|-----------|
| 1 | Very Wide | Slow | Few | Easy |
| 2-3 | Wide | Medium | Some | Moderate |
| 4-6 | Medium | Fast | Many | Hard |
| 7-8 | Narrow | Faster | Lots | Very Hard |
| 9-10 | Tight | Very Fast | Extreme | Insane |

## 🏆 Scoring

- **Coin**: +10 points
- **Level Complete**: +100 × level
- **Bonus**: Up to 5% per collected character

## 🐛 Troubleshooting

### Game won't load?
- Check browser console (F12)
- Ensure all files are in same folder
- Try a different browser

### No audio?
- Check if audio files exist in folder
- Check browser volume settings
- Check browser console for errors

### Laggy gameplay?
- Close other tabs/apps
- Update your GPU drivers
- Try a different browser

### Characters not showing?
- Refresh page (Ctrl+F5)
- Clear browser cache
- Check localStorage isn't full

## 🎓 For Developers

### Edit Game Configuration

Edit `main.js` to modify:
- **Level difficulty**: See `levelConfig` object
- **Colors**: Search for `0xHEX` values
- **Character pool**: Edit `characters` array
- **Enemy types**: Edit `enemyFaces` array
- **Powerup types**: See `createPowerup()` function

### Access Game APIs

```javascript
// In browser console:
startGame()              // Start game
showHomeScreen()         // Go to home
toggleMute()            // Toggle audio
addCustomCharacter()    // Add character
getCurrentScore()       // Get current score
getCurrentLevel()       // Get current level
```

See **API_REFERENCE.md** for complete API documentation.

## 📖 Documentation

- **FEATURES_GUIDE.md** - Detailed feature documentation
- **API_REFERENCE.md** - Complete API reference for developers
- **README.md** - This file

## 🤝 Credits

Built with:
- **THREE.js** - 3D Graphics
- **HTML5** - Audio & Canvas
- **CSS3** - Styling & Animations
- **Vanilla JavaScript** - Game Logic

## 📝 License

Free to use and modify!

## 🚀 Future Features Ideas

- [ ] Multiplayer mode
- [ ] Leaderboard system
- [ ] Different game modes (survival, time attack)
- [ ] Mobile touch controls
- [ ] Sound effects library
- [ ] Character skins/upgrades
- [ ] Boss encounters
- [ ] Daily challenges
- [ ] Achievements/Badges
- [ ] Settings menu

## 🎮 Let's Play!

**Open `index.html` and start running!**

Your character is waiting to compete in the ultimate **UBBA LEGENDS RUN**! 🏃‍♂️💨

---

**Version**: 1.0  
**Last Updated**: 2026  
**Engine**: THREE.js  
🔥 **UBBA LEGENDS RUN** 🔥
