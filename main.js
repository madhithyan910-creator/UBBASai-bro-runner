import * as T from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

const STORAGE_KEYS = {
  settings: "ubbaSettingsV3",
  leaderboard: "ubbaLeaderboardV3",
  customCharacters: "ubbaCharacters",
  unlockedLevel: "ubbaUnlockedLevelV3",
};

const CHARACTER_NAMES = [
  "Uzair",
  "Lassi",
  "Mallu",
  "Mama",
  "Chinna",
  "Pedda",
  "Lagamer",
  "Mangaking",
  "Pandu",
  "Kala",
  "Parmar",
  "Yawn",
  "OM CORE",
  "Amara",
  "Harinesh",
];

const COSTUMES = {
  suit: { label: "Suit", primary: "#203b72", accent: "#e8edf7", trim: "#5fb0ff" },
  coat: { label: "Coat", primary: "#5f4130", accent: "#d7c3a4", trim: "#ffbe5c" },
  uniform: { label: "Uniform", primary: "#3d7d58", accent: "#d8f3de", trim: "#88d18a" },
  gym: { label: "Gym", primary: "#b73b43", accent: "#ffe0df", trim: "#ffd166" },
};

const TRACKS = [
  { name: "Original", src: "music.mp3" },
  { name: "Electro", src: "electro.mp3" },
  { name: "Chill", src: "chill.mp3" },
  { name: "Retro", src: "retro.mp3" },
  { name: "Synth", src: "synth.mp3" },
  { name: "Festival", src: "festival.mp3" },
];

const VILLAIN_OPTIONS = [
  { key: "oldMan", label: "Old Man" },
  { key: "ghost", label: "Ghost" },
  { key: "tunTun", label: "Tun Tun Sahur" },
  { key: "bald", label: "Bald Muscular Man" },
  { key: "skeleton", label: "Skeleton Monster" },
  { key: "titan", label: "Gauntlet Titan" },
];

const THEMES = {
  city: { label: "City Road", sky: 0x87b8ff, fog: 0x9cc5ff, road: ["#2d3440", "#394354", "#ffe58a"], ground: ["#203347", "#35516d"], shoulder: 0x394354, laneGlow: 0xfff1a6, propKinds: ["building", "car", "walker", "lamp"] },
  water: { label: "Water Theme Park", sky: 0x72dfff, fog: 0x9ceeff, road: ["#395670", "#5f89ae", "#ffffff"], ground: ["#0e96cc", "#67e5ff"], shoulder: 0x1e7399, laneGlow: 0xffffff, propKinds: ["slide", "wave", "ride", "swimmer"] },
  volcano: { label: "Volcano Theme", sky: 0x4e221d, fog: 0x7f3523, road: ["#261f1f", "#433433", "#ffcc66"], ground: ["#5c2315", "#da5320"], shoulder: 0x48261e, laneGlow: 0xffb347, propKinds: ["lavaRock", "eruption", "smoke", "burntTree"] },
  village: { label: "Village", sky: 0xe0c58f, fog: 0xe6cfac, road: ["#6e5537", "#937552", "#f8e29a"], ground: ["#8fbf63", "#cfb87b"], shoulder: 0x8c6d4e, laneGlow: 0xffedaa, propKinds: ["hut", "kid", "cart", "goat"] },
  forest: { label: "Forest", sky: 0x8ccaa3, fog: 0xa6d7b7, road: ["#413729", "#574a36", "#efd37c"], ground: ["#36693a", "#5ba05f"], shoulder: 0x44513d, laneGlow: 0xe7ff9e, propKinds: ["tree", "deer", "birdPole", "bush"] },
  college: { label: "College Area", sky: 0xc0d9f3, fog: 0xd7e6f4, road: ["#464b57", "#616878", "#f9efb2"], ground: ["#88b37f", "#e0bb7b"], shoulder: 0x5a5e69, laneGlow: 0xfff0b3, propKinds: ["campus", "girl", "bench", "basketball"] },
  river: { label: "Riverbank", sky: 0x8fe0ff, fog: 0xb8ebff, road: ["#6f6552", "#8f856c", "#fff2b5"], ground: ["#2e98bc", "#88dff0"], shoulder: 0x6d7668, laneGlow: 0xfff3be, propKinds: ["boat", "fisher", "wave", "birdPole"] },
  sky: { label: "Sky", sky: 0x8eb8ff, fog: 0xcfe0ff, road: ["#6879a6", "#8ca0d1", "#fef6cf"], ground: ["#d5e7ff", "#f2f7ff"], shoulder: 0xa0b6e8, laneGlow: 0xffffff, propKinds: ["cloudTower", "bird", "balloon", "haloGate"] },
};

const LEVELS = [
  { id: 1, name: "City Sprint", themeKey: "city", villainKey: "oldMan", villainName: "Old Man", difficulty: "Warmup Chase", targetDistance: 360, baseSpeed: 0.46, speedRamp: 0.012, obstacleRate: 0.34, chaseTighten: 0.0016 },
  { id: 2, name: "Splash Escape", themeKey: "water", villainKey: "ghost", villainName: "Ghost", difficulty: "Slippery Pressure", targetDistance: 420, baseSpeed: 0.51, speedRamp: 0.0135, obstacleRate: 0.36, chaseTighten: 0.0018 },
  { id: 3, name: "Sahur Rush", themeKey: "volcano", villainKey: "tunTun", villainName: "Tun Tun Sahur", difficulty: "Chaotic Heat", targetDistance: 470, baseSpeed: 0.56, speedRamp: 0.015, obstacleRate: 0.39, chaseTighten: 0.0021 },
  { id: 4, name: "Village Charge", themeKey: "village", villainKey: "bald", villainName: "Bald Muscular Man", difficulty: "Loud and Fast", targetDistance: 520, baseSpeed: 0.6, speedRamp: 0.016, obstacleRate: 0.42, chaseTighten: 0.0023 },
  { id: 5, name: "Forest Bones", themeKey: "forest", villainKey: "skeleton", villainName: "Skeleton Monster", difficulty: "Dense Danger", targetDistance: 580, baseSpeed: 0.64, speedRamp: 0.017, obstacleRate: 0.44, chaseTighten: 0.0026 },
  { id: 6, name: "Campus Chase", themeKey: "college", villainKey: "skeleton", villainName: "Skeleton Monster", difficulty: "Crowded Lanes", targetDistance: 640, baseSpeed: 0.68, speedRamp: 0.018, obstacleRate: 0.46, chaseTighten: 0.0028 },
  { id: 7, name: "River Panic", themeKey: "river", villainKey: "skeleton", villainName: "Skeleton Monster", difficulty: "Sharp Reactions", targetDistance: 700, baseSpeed: 0.73, speedRamp: 0.019, obstacleRate: 0.49, chaseTighten: 0.0031 },
  { id: 8, name: "Sky Gauntlet", themeKey: "sky", villainKey: "titan", villainName: "Gauntlet Titan", difficulty: "Floating Mayhem", targetDistance: 760, baseSpeed: 0.79, speedRamp: 0.021, obstacleRate: 0.51, chaseTighten: 0.0034 },
  { id: 9, name: "City Nightmare", themeKey: "city", villainKey: "titan", villainName: "Gauntlet Titan", difficulty: "No Mercy", targetDistance: 840, baseSpeed: 0.86, speedRamp: 0.023, obstacleRate: 0.54, chaseTighten: 0.0039 },
  { id: 10, name: "Final Apocalypse", themeKey: "volcano", villainKey: "titan", villainName: "Gauntlet Titan", difficulty: "Legend Difficulty", targetDistance: 980, baseSpeed: 0.95, speedRamp: 0.028, obstacleRate: 0.58, chaseTighten: 0.0045 },
];

const TEASE_DIALOGUES = [
  "Brindavan energy was there, lane discipline was not.",
  "Villain says thank you for the free win.",
  "That obstacle saw you coming from one semester away.",
  "You ran like attendance was optional.",
  "Next time jump first, regret later.",
  "Even the cheer squad gasped at that crash.",
];

const lanePositions = [-2.25, 0, 2.25];
const faceTextureCache = new Map();
const clothTextureCache = new Map();
const barrierImages = ["barriers/hen.png", "barriers/chick.png", "barriers/duck.png", "barriers/cat.png"];

const baseCharacters = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  name: CHARACTER_NAMES[index],
  face: index === 0 ? "face.png" : `face${index + 1}.png`,
}));

const characters = [...baseCharacters, ...loadCustomCharacters()];

const root = document.getElementById("gameRoot");
if (!root) throw new Error("Missing #gameRoot");

const ui = {
  screens: {
    mainMenu: document.getElementById("mainMenu"),
    characterScreen: document.getElementById("characterScreen"),
    levelScreen: document.getElementById("levelScreen"),
    leaderboardScreen: document.getElementById("leaderboardScreen"),
    settingsScreen: document.getElementById("settingsScreen"),
  },
  hud: document.getElementById("hud"),
  scoreValue: document.getElementById("scoreValue"),
  coinValue: document.getElementById("coinValue"),
  levelValue: document.getElementById("levelValue"),
  statusValue: document.getElementById("statusValue"),
  timeValue: document.getElementById("timeValue"),
  countdown: document.getElementById("countdown"),
  centerMessage: document.getElementById("centerMessage"),
  selectedCharacterName: document.getElementById("selectedCharacterName"),
  selectedLevelName: document.getElementById("selectedLevelName"),
  selectedVillainName: document.getElementById("selectedVillainName"),
  homeCharacterSelect: document.getElementById("homeCharacterSelect"),
  homeCostumeSelect: document.getElementById("homeCostumeSelect"),
  homeThemeSelect: document.getElementById("homeThemeSelect"),
  homeLevelSelect: document.getElementById("homeLevelSelect"),
  homeMusicSelect: document.getElementById("homeMusicSelect"),
  homeVillainSelect: document.getElementById("homeVillainSelect"),
  homeVillainPreview: document.getElementById("homeVillainPreview"),
  homeThemePreview: document.getElementById("homeThemePreview"),
  disclaimerAcknowledge: document.getElementById("disclaimerAcknowledge"),
  playerNameInput: document.getElementById("playerNameInput"),
  previewCharacterText: document.getElementById("previewCharacterText"),
  previewThemeText: document.getElementById("previewThemeText"),
  previewVillainText: document.getElementById("previewVillainText"),
  previewLeaderboardText: document.getElementById("previewLeaderboardText"),
  characterGrid: document.getElementById("characterGrid"),
  costumeButtons: document.getElementById("costumeButtons"),
  levelGrid: document.getElementById("levelGrid"),
  leaderboardList: document.getElementById("leaderboardList"),
  pauseBtn: document.getElementById("pauseBtn"),
  hudMusicToggleBtn: document.getElementById("hudMusicToggleBtn"),
  musicToggleBtn: document.getElementById("musicToggleBtn"),
  voiceToggleBtn: document.getElementById("voiceToggleBtn"),
  effectsToggleBtn: document.getElementById("effectsToggleBtn"),
  musicVolumeSlider: document.getElementById("musicVolumeSlider"),
  voiceVolumeSlider: document.getElementById("voiceVolumeSlider"),
  effectsVolumeSlider: document.getElementById("effectsVolumeSlider"),
  musicTrackSelector: document.getElementById("musicTrackSelector"),
  previewThemeSelector: document.getElementById("previewThemeSelector"),
  levelSpotlightTitle: document.getElementById("levelSpotlightTitle"),
  levelSpotlightTheme: document.getElementById("levelSpotlightTheme"),
  levelSpotlightVillain: document.getElementById("levelSpotlightVillain"),
  levelSpotlightDifficulty: document.getElementById("levelSpotlightDifficulty"),
  loseModal: document.getElementById("loseModal"),
  loseFaceImage: document.getElementById("loseFaceImage"),
  loseDialog: document.getElementById("loseDialog"),
  levelCompleteModal: document.getElementById("levelCompleteModal"),
  levelCompleteTitle: document.getElementById("levelCompleteTitle"),
  levelCompleteSubtitle: document.getElementById("levelCompleteSubtitle"),
  completeScore: document.getElementById("completeScore"),
  completeCoins: document.getElementById("completeCoins"),
  completeTime: document.getElementById("completeTime"),
  storyModal: document.getElementById("storyModal"),
  storyVideo: document.getElementById("storyVideo"),
};

const audio = {
  home: document.getElementById("homeMusic"),
  bg: document.getElementById("bgMusic"),
  run: document.getElementById("runSound"),
  coin: document.getElementById("coinSound"),
  jump: document.getElementById("jumpSound"),
  hit: document.getElementById("hitSound"),
  levelup: document.getElementById("levelupSound"),
  fail: document.getElementById("failSound"),
  voice1: document.getElementById("voice1Sound"),
  voice2: document.getElementById("voice2Sound"),
};

const settings = loadSettings();

const renderer = new T.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = T.PCFSoftShadowMap;
root.appendChild(renderer.domElement);

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 5.8, 10.8);

const ambient = new T.AmbientLight(0xffffff, 0.9);
const sun = new T.DirectionalLight(0xfff2d6, 1.25);
sun.position.set(12, 18, 8);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -20;
sun.shadow.camera.right = 20;
sun.shadow.camera.top = 20;
sun.shadow.camera.bottom = -20;
const rimLight = new T.DirectionalLight(0x8ec5ff, 0.35);
rimLight.position.set(-8, 7, -6);
scene.add(ambient, sun, rimLight);

const textureLoader = new T.TextureLoader();
const clock = new T.Clock();

const world = {
  environment: new T.Group(),
  runtime: new T.Group(),
  overlay: new T.Group(),
  cheerSquad: new T.Group(),
  environmentAnimations: [],
  runtimeItems: [],
  countdownSprite: null,
  player: null,
  villain: null,
  roadMaterial: null,
  groundMaterial: null,
};

scene.add(world.environment, world.runtime, world.overlay, world.cheerSquad);

let gameMode = "menu";

const state = {
  selectedLevel: clamp(settings.selectedLevel, 1, LEVELS.length),
  highestUnlocked: clamp(loadUnlockedLevel(), 1, LEVELS.length),
  score: 0,
  coins: 0,
  distance: 0,
  lane: 0,
  speed: 0,
  jumpV: 0,
  canControl: false,
  paused: false,
  runStartMs: 0,
  shieldUntil: 0,
  boostUntil: 0,
  flyingUntil: 0,
  slidingUntil: 0,
  currentLevel: LEVELS[clamp(settings.selectedLevel, 1, LEVELS.length) - 1],
  spawnCursor: 0,
  countdownToken: 0,
  introPhase: "idle",
  catchEndsAt: 0,
};

setupAudio();
buildUI();
buildCharacterGrid();
buildLevelGrid();
syncMenuMeta();
applyTheme(settings.previewThemeKey, false);
spawnPreviewActors();
enterMenu();
animate();

function loadSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || "{}");
    return {
      characterIndex: Number.isInteger(raw.characterIndex) ? clamp(raw.characterIndex, 0, characters.length - 1) : 0,
      costume: raw.costume && COSTUMES[raw.costume] ? raw.costume : "suit",
      selectedLevel: Number.isInteger(raw.selectedLevel) ? clamp(raw.selectedLevel, 1, LEVELS.length) : 1,
      playerName: typeof raw.playerName === "string" && raw.playerName.trim() ? raw.playerName.trim().slice(0, 18) : "Brindavan Hero",
      musicTrackIndex: Number.isInteger(raw.musicTrackIndex) ? clamp(raw.musicTrackIndex, 0, TRACKS.length - 1) : 0,
      previewThemeKey: raw.previewThemeKey && THEMES[raw.previewThemeKey] ? raw.previewThemeKey : LEVELS[0].themeKey,
      selectedVillainKey: typeof raw.selectedVillainKey === "string" ? raw.selectedVillainKey : LEVELS[0].villainKey,
      musicEnabled: raw.musicEnabled !== false,
      voiceEnabled: raw.voiceEnabled !== false,
      effectsEnabled: raw.effectsEnabled !== false,
      musicVolume: typeof raw.musicVolume === "number" ? clamp(raw.musicVolume, 0, 1) : 0.7,
      voiceVolume: typeof raw.voiceVolume === "number" ? clamp(raw.voiceVolume, 0, 1) : 0.88,
      effectsVolume: typeof raw.effectsVolume === "number" ? clamp(raw.effectsVolume, 0, 1) : 0.9,
    };
  } catch {
    return {
      characterIndex: 0,
      costume: "suit",
      selectedLevel: 1,
      playerName: "Brindavan Hero",
      musicTrackIndex: 0,
      previewThemeKey: LEVELS[0].themeKey,
      selectedVillainKey: LEVELS[0].villainKey,
      musicEnabled: true,
      voiceEnabled: true,
      effectsEnabled: true,
      musicVolume: 0.7,
      voiceVolume: 0.88,
      effectsVolume: 0.9,
    };
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function loadUnlockedLevel() {
  const value = parseInt(localStorage.getItem(STORAGE_KEYS.unlockedLevel) || "1", 10);
  return Number.isFinite(value) ? value : 1;
}

function saveUnlockedLevel(level) {
  state.highestUnlocked = clamp(level, 1, LEVELS.length);
  localStorage.setItem(STORAGE_KEYS.unlockedLevel, String(state.highestUnlocked));
}

function loadCustomCharacters() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.customCharacters) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((entry) => entry && typeof entry.name === "string")
      .map((entry, index) => ({
        id: baseCharacters.length + index,
        name: entry.name,
        face: typeof entry.face === "string" ? entry.face : "face.png",
      }));
  } catch {
    return [];
  }
}

function saveCustomCharacters() {
  const custom = characters.slice(baseCharacters.length).map((character) => ({ name: character.name, face: character.face }));
  localStorage.setItem(STORAGE_KEYS.customCharacters, JSON.stringify(custom));
}

function getLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.leaderboard) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveLeaderboardEntry(won) {
  const list = getLeaderboard();
  list.push({
    name: settings.playerName || characters[settings.characterIndex]?.name || "Runner",
    character: characters[settings.characterIndex]?.name || "Runner",
    level: state.currentLevel.id,
    score: Math.floor(state.score),
    coins: state.coins,
    time: formatTime((performance.now() - state.runStartMs) / 1000),
    result: won ? "Win" : "Crash",
    date: new Date().toLocaleDateString(),
  });
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(list.slice(0, 10)));
}

function setupAudio() {
  audio.home.loop = true;
  audio.bg.loop = true;
  audio.run.loop = true;
  audio.bg.src = TRACKS[settings.musicTrackIndex].src;
  updateAudioSettings();

  const tryResumeMenuAudio = () => {
    if (gameMode === "menu") {
      refreshMusicState();
    }
  };

  document.addEventListener("pointerdown", tryResumeMenuAudio, { passive: true });
  document.addEventListener("keydown", tryResumeMenuAudio);
}

function updateAudioSettings() {
  const musicVolume = settings.musicEnabled ? settings.musicVolume : 0;
  const voiceVolume = settings.voiceEnabled ? settings.voiceVolume : 0;
  const effectsVolume = settings.effectsEnabled ? settings.effectsVolume : 0;

  audio.home.volume = musicVolume * (gameMode === "menu" ? 0.9 : 0.18);
  audio.bg.volume = musicVolume * (gameMode === "playing" ? 0.82 : gameMode === "countdown" ? 0.55 : 0.12);
  audio.run.volume = effectsVolume * 0.32;
  audio.coin.volume = effectsVolume * 0.9;
  audio.jump.volume = effectsVolume * 0.86;
  audio.hit.volume = effectsVolume * 0.78;
  audio.levelup.volume = effectsVolume * 0.94;
  audio.fail.volume = effectsVolume * 0.9;
  audio.voice1.volume = voiceVolume;
  audio.voice2.volume = voiceVolume;

  if (!settings.musicEnabled) {
    audio.home.pause();
    audio.bg.pause();
  } else {
    refreshMusicState();
  }

  syncAudioButtons();
}

function refreshMusicState() {
  updateAudioElementSource();
  if (!settings.musicEnabled) {
    audio.home.pause();
    audio.bg.pause();
    return;
  }

  if (gameMode === "menu" || gameMode === "character" || gameMode === "levelSelect" || gameMode === "leaderboard" || gameMode === "settings") {
    audio.bg.pause();
    safePlay(audio.home);
  } else if (gameMode === "countdown" || gameMode === "playing") {
    audio.home.pause();
    safePlay(audio.bg);
    if (gameMode === "playing" && settings.effectsEnabled) safePlay(audio.run);
    else audio.run.pause();
  } else {
    audio.run.pause();
    audio.bg.pause();
    if (gameMode !== "story") safePlay(audio.home);
  }
}

function updateAudioElementSource() {
  const nextTrack = TRACKS[settings.musicTrackIndex];
  if (nextTrack && !audio.bg.src.endsWith(nextTrack.src)) {
    audio.bg.src = nextTrack.src;
  }
}

function safePlay(element) {
  if (!element) return;
  element.play().catch(() => {});
}

function playEffect(element) {
  if (!settings.effectsEnabled) return;
  element.currentTime = 0;
  safePlay(element);
}

function playVoiceSequence() {
  if (!settings.voiceEnabled) return;
  audio.voice1.currentTime = 0;
  safePlay(audio.voice1);
  window.setTimeout(() => {
    audio.voice2.currentTime = 0;
    safePlay(audio.voice2);
  }, 550);
}

function buildUI() {
  ui.playerNameInput.value = settings.playerName;
  ui.musicVolumeSlider.value = String(settings.musicVolume);
  ui.voiceVolumeSlider.value = String(settings.voiceVolume);
  ui.effectsVolumeSlider.value = String(settings.effectsVolume);

  TRACKS.forEach((track, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = track.name;
    ui.musicTrackSelector.appendChild(option);
    ui.homeMusicSelect.appendChild(option.cloneNode(true));
  });
  ui.musicTrackSelector.value = String(settings.musicTrackIndex);
  ui.homeMusicSelect.value = String(settings.musicTrackIndex);

  Object.entries(THEMES).forEach(([key, theme]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = theme.label;
    ui.previewThemeSelector.appendChild(option);
    ui.homeThemeSelect.appendChild(option.cloneNode(true));
  });
  ui.previewThemeSelector.value = settings.previewThemeKey;
  ui.homeThemeSelect.value = settings.previewThemeKey;

  Object.entries(COSTUMES).forEach(([key, costume]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = costume.label;
    ui.homeCostumeSelect.appendChild(option);
  });
  ui.homeCostumeSelect.value = settings.costume;

  LEVELS.forEach((level) => {
    const option = document.createElement("option");
    option.value = String(level.id);
    option.textContent = `Level ${level.id}: ${level.name}`;
    ui.homeLevelSelect.appendChild(option);
  });
  ui.homeLevelSelect.value = String(settings.selectedLevel);

  VILLAIN_OPTIONS.forEach((villain) => {
    const option = document.createElement("option");
    option.value = villain.key;
    option.textContent = villain.label;
    ui.homeVillainSelect.appendChild(option);
  });
  ui.homeVillainSelect.value = settings.selectedVillainKey;

  ui.playerNameInput.addEventListener("input", () => {
    settings.playerName = sanitizeName(ui.playerNameInput.value);
    ui.playerNameInput.value = settings.playerName;
    saveSettings();
  });

  ui.musicTrackSelector.addEventListener("change", () => {
    settings.musicTrackIndex = Number(ui.musicTrackSelector.value);
    ui.homeMusicSelect.value = ui.musicTrackSelector.value;
    saveSettings();
    updateAudioSettings();
  });
  ui.homeMusicSelect.addEventListener("change", () => {
    settings.musicTrackIndex = Number(ui.homeMusicSelect.value);
    ui.musicTrackSelector.value = ui.homeMusicSelect.value;
    saveSettings();
    updateAudioSettings();
  });

  ui.previewThemeSelector.addEventListener("change", () => {
    settings.previewThemeKey = ui.previewThemeSelector.value;
    ui.homeThemeSelect.value = ui.previewThemeSelector.value;
    saveSettings();
    if (!isGameplayMode()) {
      applyTheme(settings.previewThemeKey, false);
      spawnPreviewActors();
    }
  });
  ui.homeThemeSelect.addEventListener("change", () => {
    settings.previewThemeKey = ui.homeThemeSelect.value;
    ui.previewThemeSelector.value = ui.homeThemeSelect.value;
    saveSettings();
    if (!isGameplayMode()) {
      applyTheme(settings.previewThemeKey, false);
      spawnPreviewActors();
      syncMenuMeta();
    }
  });

  ui.homeCharacterSelect.addEventListener("change", () => {
    settings.characterIndex = Number(ui.homeCharacterSelect.value);
    saveSettings();
    buildCharacterGrid();
    syncMenuMeta();
    spawnPreviewActors();
  });

  ui.homeCostumeSelect.addEventListener("change", () => {
    settings.costume = ui.homeCostumeSelect.value;
    saveSettings();
    [...ui.costumeButtons.children].forEach((child) => child.classList.toggle("active", child.textContent === COSTUMES[settings.costume].label));
    syncMenuMeta();
    spawnPreviewActors();
  });

  ui.homeLevelSelect.addEventListener("change", () => {
    selectLevel(Number(ui.homeLevelSelect.value));
    buildLevelGrid();
    spawnPreviewActors();
  });

  ui.homeVillainSelect.addEventListener("change", () => {
    settings.selectedVillainKey = ui.homeVillainSelect.value;
    saveSettings();
    syncMenuMeta();
    spawnPreviewActors();
  });

  ui.musicToggleBtn.addEventListener("click", () => {
    settings.musicEnabled = !settings.musicEnabled;
    saveSettings();
    updateAudioSettings();
  });
  ui.voiceToggleBtn.addEventListener("click", () => {
    settings.voiceEnabled = !settings.voiceEnabled;
    saveSettings();
    updateAudioSettings();
  });
  ui.effectsToggleBtn.addEventListener("click", () => {
    settings.effectsEnabled = !settings.effectsEnabled;
    saveSettings();
    updateAudioSettings();
  });
  ui.hudMusicToggleBtn.addEventListener("click", () => {
    settings.musicEnabled = !settings.musicEnabled;
    saveSettings();
    updateAudioSettings();
  });

  ui.musicVolumeSlider.addEventListener("input", () => {
    settings.musicVolume = Number(ui.musicVolumeSlider.value);
    saveSettings();
    updateAudioSettings();
  });
  ui.voiceVolumeSlider.addEventListener("input", () => {
    settings.voiceVolume = Number(ui.voiceVolumeSlider.value);
    saveSettings();
    updateAudioSettings();
  });
  ui.effectsVolumeSlider.addEventListener("input", () => {
    settings.effectsVolume = Number(ui.effectsVolumeSlider.value);
    saveSettings();
    updateAudioSettings();
  });

  document.getElementById("startMenuBtn").addEventListener("click", openPreviewScreen);
  document.getElementById("previewMenuBtn").addEventListener("click", openPreviewScreen);
  document.getElementById("charactersMenuBtn").addEventListener("click", () => showScreen("characterScreen", "character"));
  document.getElementById("leaderboardMenuBtn").addEventListener("click", () => {
    updateLeaderboardUI();
    showScreen("leaderboardScreen", "leaderboard");
  });
  document.getElementById("homeMuteBtn").addEventListener("click", () => {
    settings.musicEnabled = !settings.musicEnabled;
    saveSettings();
    updateAudioSettings();
  });
  document.getElementById("settingsMenuBtn").addEventListener("click", () => showScreen("settingsScreen", "settings"));
  document.getElementById("storyMenuBtn").addEventListener("click", openStoryModal);
  document.getElementById("previewBackBtn").addEventListener("click", enterMenu);
  document.getElementById("openPreviewLeaderboardBtn").addEventListener("click", () => {
    updateLeaderboardUI();
    showScreen("leaderboardScreen", "leaderboard");
  });
  document.getElementById("backToMenuBtn").addEventListener("click", enterMenu);
  document.getElementById("characterContinueBtn").addEventListener("click", openPreviewScreen);
  document.getElementById("levelBackBtn").addEventListener("click", () => showScreen("characterScreen", "character"));
  document.getElementById("previewLevelBtn").addEventListener("click", openPreviewScreen);
  document.getElementById("levelStartBtn").addEventListener("click", startRun);
  document.getElementById("launchRunBtn").addEventListener("click", startRun);
  document.getElementById("leaderboardBackBtn").addEventListener("click", enterMenu);
  document.getElementById("settingsBackBtn").addEventListener("click", enterMenu);
  document.getElementById("retryBtn").addEventListener("click", () => { hideOverlay(ui.loseModal); startRun(); });
  document.getElementById("loseMenuBtn").addEventListener("click", () => { hideOverlay(ui.loseModal); enterMenu(); });
  document.getElementById("nextLevelBtn").addEventListener("click", () => {
    hideOverlay(ui.levelCompleteModal);
    const nextLevel = clamp(state.currentLevel.id + 1, 1, LEVELS.length);
    if (nextLevel !== state.currentLevel.id) {
      selectLevel(nextLevel);
      buildLevelGrid();
      startRun();
    } else {
      enterMenu();
    }
  });
  document.getElementById("retryLevelBtn").addEventListener("click", () => { hideOverlay(ui.levelCompleteModal); startRun(); });
  document.getElementById("completeMenuBtn").addEventListener("click", () => { hideOverlay(ui.levelCompleteModal); enterMenu(); });
  document.getElementById("closeStoryBtn").addEventListener("click", closeStoryModal);
  ui.storyModal.addEventListener("click", (event) => {
    if (event.target === ui.storyModal) closeStoryModal();
  });
  ui.pauseBtn.addEventListener("click", togglePause);

  Object.entries(COSTUMES).forEach(([key, costume]) => {
    const button = document.createElement("button");
    button.textContent = costume.label;
    if (key === settings.costume) button.classList.add("active");
    button.addEventListener("click", () => {
      settings.costume = key;
      ui.homeCostumeSelect.value = key;
      saveSettings();
      [...ui.costumeButtons.children].forEach((child) => child.classList.remove("active"));
      button.classList.add("active");
      syncMenuMeta();
      spawnPreviewActors();
    });
    ui.costumeButtons.appendChild(button);
  });

  syncAudioButtons();
  syncPreviewTexts();
}

function syncAudioButtons() {
  syncToggleButton(ui.musicToggleBtn, settings.musicEnabled);
  syncToggleButton(ui.voiceToggleBtn, settings.voiceEnabled);
  syncToggleButton(ui.effectsToggleBtn, settings.effectsEnabled);
  ui.hudMusicToggleBtn.textContent = settings.musicEnabled ? "Music On" : "Music Off";
}

function syncToggleButton(button, enabled) {
  button.classList.toggle("active", enabled);
  button.textContent = enabled ? "ON" : "OFF";
}

function buildCharacterGrid() {
  ui.characterGrid.innerHTML = "";
  ui.homeCharacterSelect.innerHTML = "";
  characters.forEach((character, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = character.name;
    ui.homeCharacterSelect.appendChild(option);

    const card = document.createElement("div");
    card.className = `charCard ${index === settings.characterIndex ? "active" : ""}`;
    const image = document.createElement("img");
    image.src = character.face;
    image.alt = character.name;
    image.loading = "lazy";
    const title = document.createElement("strong");
    title.textContent = character.name;
    const note = document.createElement("small");
    note.textContent = character.face;
    card.append(image, title, note);
    card.addEventListener("click", () => {
      settings.characterIndex = index;
      saveSettings();
      [...ui.characterGrid.children].forEach((child) => child.classList.remove("active"));
      card.classList.add("active");
      syncMenuMeta();
      spawnPreviewActors();
    });
    ui.characterGrid.appendChild(card);
  });
  ui.homeCharacterSelect.value = String(settings.characterIndex);
  syncMenuMeta();
}

function buildLevelGrid() {
  ui.levelGrid.innerHTML = "";
  LEVELS.forEach((level) => {
    const card = document.createElement("div");
    const locked = level.id > state.highestUnlocked;
    card.className = `levelCard ${state.selectedLevel === level.id ? "active" : ""} ${locked ? "locked" : ""}`;
    const title = document.createElement("strong");
    title.textContent = `Level ${level.id}: ${level.name}`;
    const theme = document.createElement("small");
    theme.textContent = `${(THEMES[settings.previewThemeKey] || THEMES[level.themeKey]).label} • ${level.villainName}`;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = locked ? "Locked" : level.difficulty;
    card.append(title, theme, badge);
    card.addEventListener("click", () => {
      if (locked) {
        showCenterMessage("Finish the previous level to unlock this one.", 1800);
        return;
      }
      selectLevel(level.id);
      buildLevelGrid();
      if (gameMode !== "playing" && gameMode !== "countdown") spawnPreviewActors();
    });
    ui.levelGrid.appendChild(card);
  });
  syncLevelSpotlight();
}

function syncLevelSpotlight() {
  const level = LEVELS[state.selectedLevel - 1];
  const theme = THEMES[settings.previewThemeKey] || THEMES[level.themeKey];
  ui.levelSpotlightTitle.textContent = `Level ${level.id}: ${level.name}`;
  ui.levelSpotlightTheme.textContent = `Theme: ${theme.label}`;
  ui.levelSpotlightVillain.textContent = `Villain: ${getSelectedVillainName()}`;
  ui.levelSpotlightDifficulty.textContent = `Difficulty: ${level.difficulty}`;
}

function syncMenuMeta() {
  const character = characters[settings.characterIndex];
  const level = LEVELS[state.selectedLevel - 1];
  const theme = THEMES[settings.previewThemeKey] || THEMES[level.themeKey];
  const villainName = getSelectedVillainName();
  ui.selectedCharacterName.textContent = character?.name || "Runner";
  ui.selectedLevelName.textContent = `${theme.label} - Level ${level.id}`;
  ui.selectedVillainName.textContent = villainName;
  ui.homeVillainPreview.textContent = `${villainName} Entry`;
  ui.homeThemePreview.textContent = `${theme.label} intro with slow villain reveal.`;
  ui.homeCharacterSelect.value = String(settings.characterIndex);
  ui.homeCostumeSelect.value = settings.costume;
  ui.homeThemeSelect.value = settings.previewThemeKey;
  ui.homeLevelSelect.value = String(state.selectedLevel);
  ui.homeMusicSelect.value = String(settings.musicTrackIndex);
  ui.homeVillainSelect.value = settings.selectedVillainKey;
  syncLevelSpotlight();
  syncPreviewTexts();
}

function syncPreviewTexts() {
  const character = characters[settings.characterIndex];
  const level = LEVELS[state.selectedLevel - 1];
  const theme = THEMES[settings.previewThemeKey] || THEMES[level.themeKey];
  const leaderboard = getLeaderboard();
  ui.previewCharacterText.textContent = `${character?.name || "Runner"} in ${COSTUMES[settings.costume].label}`;
  ui.previewThemeText.textContent = `${theme.label} • Level ${level.id}`;
  ui.previewVillainText.textContent = `${getSelectedVillainName()} slow-motion chase intro`;
  ui.previewLeaderboardText.textContent = leaderboard.length ? `Top score: ${leaderboard[0].name} - ${leaderboard[0].score}` : "No scores yet. Be the first legend.";
}

function selectLevel(levelId) {
  state.selectedLevel = clamp(levelId, 1, LEVELS.length);
  settings.selectedLevel = state.selectedLevel;
  state.currentLevel = LEVELS[state.selectedLevel - 1];
  saveSettings();
  syncMenuMeta();
  if (!isGameplayMode()) applyTheme(settings.previewThemeKey || state.currentLevel.themeKey, false);
}

function openPreviewScreen() {
  syncPreviewTexts();
  showScreen("previewScreen", "preview");
}

function updateLeaderboardUI() {
  const list = getLeaderboard();
  ui.leaderboardList.innerHTML = "";
  if (!list.length) {
    const item = document.createElement("li");
    item.textContent = "No scores yet. Run once and claim the board.";
    ui.leaderboardList.appendChild(item);
    return;
  }
  list.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.name} • ${entry.score} pts • L${entry.level} • ${entry.result} • ${entry.date}`;
    ui.leaderboardList.appendChild(item);
  });
}

function showScreen(screenId, mode) {
  Object.entries(ui.screens).forEach(([id, screen]) => {
    screen.classList.toggle("active", id === screenId);
  });
  gameMode = mode;
  hideOverlay(ui.loseModal);
  hideOverlay(ui.levelCompleteModal);
  ui.centerMessage.classList.add("hidden");
  showHUD(false);
  if (!isGameplayMode()) {
    applyTheme(settings.previewThemeKey, false);
    spawnPreviewActors();
  }
  refreshMusicState();
}

function enterMenu() {
  Object.values(ui.screens).forEach((screen, index) => screen.classList.toggle("active", index === 0));
  hideOverlay(ui.loseModal);
  hideOverlay(ui.levelCompleteModal);
  closeStoryModal(false);
  gameMode = "menu";
  showHUD(false);
  applyTheme(settings.previewThemeKey, false);
  spawnPreviewActors();
  syncMenuMeta();
  refreshMusicState();
}

function openLevelSelect() {
  buildLevelGrid();
  Object.entries(ui.screens).forEach(([id, screen]) => {
    screen.classList.toggle("active", id === "levelScreen");
  });
  gameMode = "levelSelect";
  showHUD(false);
  hideOverlay(ui.loseModal);
  hideOverlay(ui.levelCompleteModal);
  applyTheme(settings.previewThemeKey, false);
  spawnPreviewActors();
  refreshMusicState();
}

function openStoryModal() {
  ui.storyModal.classList.add("active");
  ui.storyModal.classList.remove("hidden");
  gameMode = "story";
  audio.home.pause();
  audio.bg.pause();
  audio.run.pause();
  safePlay(ui.storyVideo);
}

function closeStoryModal(resumeMenu = true) {
  ui.storyVideo.pause();
  ui.storyModal.classList.remove("active");
  ui.storyModal.classList.add("hidden");
  if (resumeMenu && !isGameplayMode()) enterMenu();
}

function showOverlay(element) {
  element.classList.add("active");
  element.classList.remove("hidden");
}

function hideOverlay(element) {
  element.classList.remove("active");
  element.classList.add("hidden");
}

function showHUD(show) {
  ui.hud.classList.toggle("hidden", !show);
}

function startRun() {
  if (state.selectedLevel > state.highestUnlocked) {
    showCenterMessage("That level is still locked. Win the previous one first.", 1800);
    return;
  }
  if (!ui.disclaimerAcknowledge?.checked) {
    showCenterMessage("Please acknowledge the disclaimer note first.", 1800);
    return;
  }

  const level = LEVELS[state.selectedLevel - 1];
  state.currentLevel = level;
  state.score = 0;
  state.coins = 0;
  state.distance = 0;
  state.lane = 0;
  state.speed = level.baseSpeed;
  state.jumpV = 0;
  state.canControl = false;
  state.paused = false;
  state.runStartMs = performance.now();
  state.shieldUntil = 0;
  state.boostUntil = 0;
  state.flyingUntil = 0;
  state.slidingUntil = 0;
  state.spawnCursor = 12;
  state.countdownToken += 1;

  clearRuntime();
  applyTheme(settings.previewThemeKey || level.themeKey, true);
  spawnGameplayActors();
  spawnAhead();
  showHUD(true);
  hideOverlay(ui.loseModal);
  hideOverlay(ui.levelCompleteModal);
  Object.values(ui.screens).forEach((screen) => screen.classList.remove("active"));
  ui.pauseBtn.textContent = "Pause";
  ui.statusValue.textContent = "Ready";
  ui.scoreValue.textContent = "0";
  ui.coinValue.textContent = "0";
  ui.levelValue.textContent = String(level.id);
  ui.timeValue.textContent = "0.0s";
  gameMode = "countdown";
  state.introPhase = "villain";
  updateAudioSettings();
  runCountdown(state.countdownToken);
}

async function runCountdown(token) {
  ui.countdown.classList.remove("hidden");
  ui.centerMessage.classList.add("hidden");
  world.cheerSquad.visible = true;
  const stages = [
    { step: "1", phase: "villain", message: `${getSelectedVillainName()} enters...`, delay: 1300 },
    { step: "2", phase: "cheer", message: "Girls cheering from the side!", delay: 1300 },
    { step: "3", phase: "hero", message: `${characters[settings.characterIndex].name} steps in.`, delay: 1300 },
    { step: "GO!", phase: "go", message: "Run!", delay: 900 },
  ];
  for (const stage of stages) {
    if (token !== state.countdownToken) return;
    state.introPhase = stage.phase;
    ui.countdown.textContent = stage.step;
    flash3DText(stage.step);
    showCenterMessage(stage.message, stage.delay - 200);
    if (stage.phase === "villain") world.cheerSquad.visible = false;
    if (stage.phase === "cheer") world.cheerSquad.visible = true;
    if (stage.phase === "hero") world.cheerSquad.visible = false;
    await sleep(stage.delay);
  }
  if (token !== state.countdownToken) return;
  ui.countdown.classList.add("hidden");
  world.cheerSquad.visible = false;
  state.introPhase = "running";
  state.canControl = true;
  gameMode = "playing";
  updateAudioSettings();
  refreshMusicState();
}

function togglePause() {
  if (gameMode !== "playing" && gameMode !== "paused") return;
  state.paused = !state.paused;
  gameMode = state.paused ? "paused" : "playing";
  ui.pauseBtn.textContent = state.paused ? "Resume" : "Pause";
  ui.statusValue.textContent = state.paused ? "Paused" : "Running";
  if (state.paused) {
    audio.run.pause();
    audio.bg.pause();
    showCenterMessage("Paused", 0);
  } else {
    ui.centerMessage.classList.add("hidden");
    updateAudioSettings();
    refreshMusicState();
  }
}

function spawnPreviewActors() {
  clearRuntime();
  replaceActor("player", createRunner(characters[settings.characterIndex], settings.costume), { x: -1.3, y: 0, z: 0.2 });
  replaceActor("villain", createVillain(settings.selectedVillainKey || LEVELS[state.selectedLevel - 1].villainKey), { x: 1.9, y: 0, z: 2.2 });
  buildCheerSquad(true);
  world.cheerSquad.visible = true;
}

function spawnGameplayActors() {
  replaceActor("player", createRunner(characters[settings.characterIndex], settings.costume), { x: 0, y: 0, z: 0 });
  replaceActor("villain", createVillain(settings.selectedVillainKey || state.currentLevel.villainKey), { x: 0, y: 0, z: 17.5 });
  buildCheerSquad(false);
}

function replaceActor(key, actor, position) {
  if (world[key]) {
    scene.remove(world[key]);
    disposeObject(world[key]);
  }
  world[key] = actor;
  actor.position.set(position.x, position.y, position.z);
  scene.add(actor);
}

function applyTheme(themeKey, gameplay) {
  const theme = THEMES[themeKey] || THEMES.city;
  scene.background = new T.Color(theme.sky);
  scene.fog = new T.Fog(theme.fog, 18, gameplay ? 120 : 105);
  buildEnvironment(theme, gameplay);
}

function buildEnvironment(theme, gameplay) {
  clearGroup(world.environment);
  world.environmentAnimations = [];

  world.roadMaterial = new T.MeshStandardMaterial({
    map: createRoadTexture(theme),
    roughness: 0.92,
    metalness: 0.1,
    emissive: new T.Color(theme.laneGlow).multiplyScalar(0.08),
  });
  world.groundMaterial = new T.MeshStandardMaterial({ map: createGroundTexture(theme), roughness: 1, metalness: 0 });

  const road = new T.Mesh(new T.PlaneGeometry(8.4, 1400), world.roadMaterial);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -600);
  road.receiveShadow = true;
  world.environment.add(road);

  const shoulderMaterial = new T.MeshStandardMaterial({ color: theme.shoulder, roughness: 0.88 });
  const leftShoulder = new T.Mesh(new T.PlaneGeometry(3.8, 1400), shoulderMaterial);
  leftShoulder.rotation.x = -Math.PI / 2;
  leftShoulder.position.set(-6.15, -0.01, -600);
  const rightShoulder = leftShoulder.clone();
  rightShoulder.position.x = 6.15;
  leftShoulder.receiveShadow = true;
  rightShoulder.receiveShadow = true;

  const leftGround = new T.Mesh(new T.PlaneGeometry(46, 1400), world.groundMaterial);
  leftGround.rotation.x = -Math.PI / 2;
  leftGround.position.set(-28, -0.02, -600);
  leftGround.receiveShadow = true;
  const rightGround = leftGround.clone();
  rightGround.position.x = 28;
  world.environment.add(leftShoulder, rightShoulder, leftGround, rightGround);

  for (let z = 18; z < 1080; z += gameplay ? 18 : 24) {
    const left = createThemeProp(theme.propKinds[Math.floor(Math.random() * theme.propKinds.length)]);
    const right = createThemeProp(theme.propKinds[Math.floor(Math.random() * theme.propKinds.length)]);
    left.position.set(-7.5 - Math.random() * 4, 0, -z);
    right.position.set(7.5 + Math.random() * 4, 0, -z - 7);
    registerEnvironmentProp(left);
    registerEnvironmentProp(right);
  }

  if (theme.label === "Sky") {
    for (let i = 0; i < 8; i += 1) {
      const cloud = createThemeProp("cloudTower");
      cloud.position.set(-18 + Math.random() * 36, 8 + Math.random() * 6, -40 - i * 18);
      registerEnvironmentProp(cloud);
    }
  }
}

function registerEnvironmentProp(object) {
  world.environment.add(object);
  if (typeof object.userData.animate === "function") world.environmentAnimations.push(object);
}

function buildCheerSquad(isPreview) {
  clearGroup(world.cheerSquad);
  const positions = isPreview ? [[-4.8, 0, -1.4], [-3.6, 0, -2.2], [3.6, 0, -1.4], [4.8, 0, -2.2]] : [[-5.6, 0, -8], [-4.4, 0, -10.5], [4.4, 0, -8], [5.6, 0, -10.5]];
  positions.forEach(([x, y, z], index) => {
    const girl = createCheerGirl(index);
    girl.position.set(x, y, z);
    world.cheerSquad.add(girl);
  });
  world.cheerSquad.visible = isPreview;
}

function createRunner(character, costumeKey) {
  const costume = COSTUMES[costumeKey];
  const group = new T.Group();
  const clothTexture = getClothTexture(costumeKey);
  const torsoMaterial = new T.MeshStandardMaterial({ map: clothTexture, roughness: 0.55, metalness: 0.05, color: new T.Color(costume.primary) });
  const accentMaterial = new T.MeshStandardMaterial({ color: costume.accent, roughness: 0.48 });
  const skinMaterial = new T.MeshStandardMaterial({ color: 0xf3c9aa, roughness: 0.82 });
  const darkMaterial = new T.MeshStandardMaterial({ color: 0x181818, roughness: 0.6 });

  const hips = new T.Mesh(new T.CapsuleGeometry(0.34, 0.36, 6, 12), torsoMaterial);
  hips.position.y = 0.84;
  const torso = new T.Mesh(new T.CapsuleGeometry(0.42, 0.98, 8, 14), torsoMaterial);
  torso.position.y = 1.56;
  const chestStripe = new T.Mesh(new T.BoxGeometry(0.2, 0.9, 0.08), new T.MeshStandardMaterial({ color: costume.trim, emissive: costume.trim, emissiveIntensity: 0.12 }));
  chestStripe.position.set(0, 1.6, 0.34);
  const neck = new T.Mesh(new T.CylinderGeometry(0.11, 0.12, 0.16, 12), skinMaterial);
  neck.position.y = 2.28;
  const head = new T.Mesh(new T.SphereGeometry(0.42, 24, 20), skinMaterial);
  head.position.y = 2.68;
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.12, 0.7, 5, 10), accentMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.56, 1.7, 0);
  rightArm.position.set(0.56, 1.7, 0);
  const leftForearm = new T.Mesh(new T.CapsuleGeometry(0.1, 0.62, 5, 10), skinMaterial);
  const rightForearm = leftForearm.clone();
  leftForearm.position.set(-0.56, 1.15, 0.05);
  rightForearm.position.set(0.56, 1.15, 0.05);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.14, 0.82, 5, 10), darkMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.22, 0.58, 0);
  rightLeg.position.set(0.22, 0.58, 0);
  const leftShin = new T.Mesh(new T.CapsuleGeometry(0.12, 0.72, 5, 10), accentMaterial);
  const rightShin = leftShin.clone();
  leftShin.position.set(-0.22, 0.1, 0.05);
  rightShin.position.set(0.22, 0.1, 0.05);
  const leftShoe = new T.Mesh(new T.BoxGeometry(0.28, 0.12, 0.48), new T.MeshStandardMaterial({ color: 0x0d0d0d }));
  const rightShoe = leftShoe.clone();
  leftShoe.position.set(-0.22, -0.28, 0.16);
  rightShoe.position.set(0.22, -0.28, 0.16);

  const face = new T.Mesh(
    new T.PlaneGeometry(0.76, 0.76),
    new T.MeshBasicMaterial({ map: getFaceTexture(character.face), transparent: true, alphaTest: 0.08, side: T.DoubleSide, depthWrite: false, toneMapped: false }),
  );
  face.position.set(0, 2.68, 0.435);
  face.renderOrder = 10;

  if (costumeKey === "coat") {
    const flapLeft = new T.Mesh(new T.BoxGeometry(0.18, 0.9, 0.06), accentMaterial);
    const flapRight = flapLeft.clone();
    flapLeft.position.set(-0.16, 1.22, 0.33);
    flapRight.position.set(0.16, 1.22, 0.33);
    group.add(flapLeft, flapRight);
  }
  if (costumeKey === "gym") {
    const band = new T.Mesh(new T.TorusGeometry(0.24, 0.04, 10, 22), new T.MeshStandardMaterial({ color: 0xffffff }));
    band.rotation.x = Math.PI / 2;
    band.position.set(0, 2.78, 0);
    group.add(band);
  }

  [hips, torso, chestStripe, neck, head, leftArm, rightArm, leftForearm, rightForearm, leftLeg, rightLeg, leftShin, rightShin, leftShoe, rightShoe, face].forEach((mesh) => {
    setShadowRecursive(mesh);
    group.add(mesh);
  });

  group.userData.parts = { hips, torso, head, face, leftArm, rightArm, leftForearm, rightForearm, leftLeg, rightLeg, leftShin, rightShin, leftShoe, rightShoe };
  return group;
}

function createVillain(villainKey) {
  switch (villainKey) {
    case "ghost": return createGhostVillain();
    case "tunTun": return createTunTunVillain();
    case "bald": return createBaldVillain();
    case "skeleton": return createSkeletonVillain();
    case "titan": return createTitanVillain();
    case "oldMan":
    default: return createOldManVillain();
  }
}

function createOldManVillain() {
  const group = new T.Group();
  const robe = new T.Mesh(new T.CapsuleGeometry(0.44, 1.18, 8, 16), new T.MeshStandardMaterial({ color: 0x6c4f3d }));
  robe.position.y = 1.46;
  const beard = new T.Mesh(new T.ConeGeometry(0.26, 0.46, 12), new T.MeshStandardMaterial({ color: 0xe8e2d5 }));
  beard.position.set(0, 2.1, 0.26);
  const head = new T.Mesh(new T.SphereGeometry(0.38, 20, 18), new T.MeshStandardMaterial({ color: 0xf1c8a4 }));
  head.position.y = 2.32;
  const stick = new T.Mesh(new T.CylinderGeometry(0.04, 0.05, 1.9, 8), new T.MeshStandardMaterial({ color: 0x5b351f }));
  stick.position.set(0.48, 1.08, 0);
  const armLeft = new T.Mesh(new T.CapsuleGeometry(0.1, 0.62, 4, 8), new T.MeshStandardMaterial({ color: 0x83624e }));
  const armRight = armLeft.clone();
  armLeft.position.set(-0.52, 1.62, 0);
  armRight.position.set(0.52, 1.62, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.13, 0.82, 4, 8), new T.MeshStandardMaterial({ color: 0x2a241f }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.18, 0.3, 0);
  rightLeg.position.set(0.18, 0.3, 0);
  group.add(robe, beard, head, stick, armLeft, armRight, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso: robe, head, leftArm: armLeft, rightArm: armRight, leftLeg, rightLeg };
  group.userData.kind = "villain";
  return group;
}

function createGhostVillain() {
  const group = new T.Group();
  const body = new T.Mesh(new T.CapsuleGeometry(0.5, 1.35, 10, 18), new T.MeshStandardMaterial({ color: 0xe7f8ff, transparent: true, opacity: 0.82, emissive: 0x8bd3ff, emissiveIntensity: 0.36 }));
  body.position.y = 1.7;
  const eyeLeft = new T.Mesh(new T.SphereGeometry(0.08, 12, 12), new T.MeshStandardMaterial({ color: 0x0f2f4f, emissive: 0x58c7ff, emissiveIntensity: 0.8 }));
  const eyeRight = eyeLeft.clone();
  eyeLeft.position.set(-0.14, 2.1, 0.44);
  eyeRight.position.set(0.14, 2.1, 0.44);
  addGlowShell(body, 0x9de7ff, 1.12);
  group.add(body, eyeLeft, eyeRight);
  setShadowRecursive(group);
  group.userData.parts = { torso: body, head: body, leftArm: body, rightArm: body, leftLeg: body, rightLeg: body };
  group.userData.kind = "villain";
  return group;
}

function createTunTunVillain() {
  const group = new T.Group();
  const belly = new T.Mesh(new T.SphereGeometry(0.7, 24, 20), new T.MeshStandardMaterial({ color: 0xffa640 }));
  belly.position.y = 1.2;
  const torso = new T.Mesh(new T.CapsuleGeometry(0.38, 0.7, 8, 12), new T.MeshStandardMaterial({ color: 0x1f5d9f }));
  torso.position.y = 1.95;
  const head = new T.Mesh(new T.SphereGeometry(0.38, 22, 20), new T.MeshStandardMaterial({ color: 0xf2c29f }));
  head.position.y = 2.56;
  const hat = new T.Mesh(new T.ConeGeometry(0.34, 0.6, 14), new T.MeshStandardMaterial({ color: 0xd13c3c, emissive: 0x7a1d1d }));
  hat.position.y = 3.0;
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.12, 0.72, 4, 8), new T.MeshStandardMaterial({ color: 0x1f5d9f }));
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.7, 1.95, 0);
  rightArm.position.set(0.7, 1.95, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.16, 0.85, 4, 8), new T.MeshStandardMaterial({ color: 0x2d2d2d }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.28, 0.3, 0);
  rightLeg.position.set(0.28, 0.3, 0);
  group.add(belly, torso, head, hat, leftArm, rightArm, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso: belly, head, leftArm, rightArm, leftLeg, rightLeg };
  group.userData.kind = "villain";
  return group;
}

function createBaldVillain() {
  const group = new T.Group();
  const torso = new T.Mesh(new T.CapsuleGeometry(0.54, 1.06, 8, 14), new T.MeshStandardMaterial({ color: 0x394a9f }));
  torso.position.y = 1.6;
  const chest = new T.Mesh(new T.BoxGeometry(0.7, 0.55, 0.25), new T.MeshStandardMaterial({ color: 0x6f89ff, emissive: 0x1d2c63, emissiveIntensity: 0.24 }));
  chest.position.set(0, 1.8, 0.38);
  const head = new T.Mesh(new T.SphereGeometry(0.38, 22, 20), new T.MeshStandardMaterial({ color: 0xd6a17e }));
  head.position.y = 2.52;
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.16, 0.84, 4, 8), new T.MeshStandardMaterial({ color: 0xb2795f }));
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.72, 1.72, 0);
  rightArm.position.set(0.72, 1.72, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.16, 0.9, 4, 8), new T.MeshStandardMaterial({ color: 0x1b1c24 }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.26, 0.26, 0);
  rightLeg.position.set(0.26, 0.26, 0);
  group.add(torso, chest, head, leftArm, rightArm, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso, head, leftArm, rightArm, leftLeg, rightLeg };
  group.userData.kind = "villain";
  return group;
}

function createSkeletonVillain() {
  const group = new T.Group();
  const boneMaterial = new T.MeshStandardMaterial({ color: 0xe9ecef, roughness: 0.72, emissive: 0x36414c, emissiveIntensity: 0.18 });
  const torso = new T.Mesh(new T.CapsuleGeometry(0.28, 0.95, 8, 10), boneMaterial);
  torso.position.y = 1.6;
  const ribs = new T.Mesh(new T.BoxGeometry(0.68, 0.56, 0.16), boneMaterial);
  ribs.position.set(0, 1.68, 0.28);
  const head = new T.Mesh(new T.SphereGeometry(0.36, 18, 16), boneMaterial);
  head.position.y = 2.48;
  const eyeLeft = new T.Mesh(new T.SphereGeometry(0.07, 8, 8), new T.MeshStandardMaterial({ color: 0x31ffb5, emissive: 0x31ffb5, emissiveIntensity: 0.9 }));
  const eyeRight = eyeLeft.clone();
  eyeLeft.position.set(-0.12, 2.5, 0.3);
  eyeRight.position.set(0.12, 2.5, 0.3);
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.08, 0.9, 4, 8), boneMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.48, 1.62, 0);
  rightArm.position.set(0.48, 1.62, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.1, 1, 4, 8), boneMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.18, 0.34, 0);
  rightLeg.position.set(0.18, 0.34, 0);
  group.add(torso, ribs, head, eyeLeft, eyeRight, leftArm, rightArm, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso, head, leftArm, rightArm, leftLeg, rightLeg };
  group.userData.kind = "villain";
  return group;
}

function createTitanVillain() {
  const group = new T.Group();
  const body = new T.Mesh(new T.CapsuleGeometry(0.58, 1.36, 8, 14), new T.MeshStandardMaterial({ color: 0x5447a8, roughness: 0.4 }));
  body.position.y = 1.82;
  const chest = new T.Mesh(new T.BoxGeometry(0.84, 0.6, 0.28), new T.MeshStandardMaterial({ color: 0x8c79ff, emissive: 0x30217a, emissiveIntensity: 0.36 }));
  chest.position.set(0, 1.95, 0.38);
  const head = new T.Mesh(new T.SphereGeometry(0.42, 20, 18), new T.MeshStandardMaterial({ color: 0xb48f7b }));
  head.position.y = 2.82;
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.16, 0.94, 4, 8), new T.MeshStandardMaterial({ color: 0x5e4dc9 }));
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.82, 1.95, 0);
  rightArm.position.set(0.82, 1.95, 0);
  const gauntlet = new T.Mesh(new T.BoxGeometry(0.26, 0.26, 0.34), new T.MeshStandardMaterial({ color: 0xffc84a, emissive: 0xff7b00, emissiveIntensity: 0.95 }));
  gauntlet.position.set(0.82, 1.34, 0.15);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.18, 1.02, 4, 8), new T.MeshStandardMaterial({ color: 0x212534 }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.28, 0.38, 0);
  rightLeg.position.set(0.28, 0.38, 0);
  addGlowShell(gauntlet, 0xffa000, 1.85);
  group.add(body, chest, head, leftArm, rightArm, gauntlet, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso: body, head, leftArm, rightArm, leftLeg, rightLeg, gauntlet };
  group.userData.kind = "villain";
  return group;
}

function createCheerGirl(index) {
  const palette = [
    { dress: 0xff7d7d, hair: 0x2d1a12, glow: 0xffde74 },
    { dress: 0x7cc9ff, hair: 0x3e2410, glow: 0x8bf0ff },
    { dress: 0xff9fd0, hair: 0x131313, glow: 0xffc85c },
    { dress: 0x88f1b7, hair: 0x5a3117, glow: 0xbfffa7 },
  ][index % 4];
  const group = new T.Group();
  const skirt = new T.Mesh(new T.ConeGeometry(0.34, 0.72, 12), new T.MeshStandardMaterial({ color: palette.dress }));
  skirt.position.y = 0.88;
  const torso = new T.Mesh(new T.CapsuleGeometry(0.22, 0.45, 5, 10), new T.MeshStandardMaterial({ color: palette.dress }));
  torso.position.y = 1.44;
  const head = new T.Mesh(new T.SphereGeometry(0.24, 14, 14), new T.MeshStandardMaterial({ color: 0xf4cbaa }));
  head.position.y = 1.94;
  const hair = new T.Mesh(new T.SphereGeometry(0.26, 12, 12), new T.MeshStandardMaterial({ color: palette.hair }));
  hair.position.set(0, 1.98, -0.03);
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.06, 0.52, 4, 8), new T.MeshStandardMaterial({ color: 0xf4cbaa }));
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.28, 1.42, 0);
  rightArm.position.set(0.28, 1.42, 0);
  const pomLeft = new T.Mesh(new T.SphereGeometry(0.14, 10, 10), new T.MeshStandardMaterial({ color: palette.glow, emissive: palette.glow, emissiveIntensity: 0.42 }));
  const pomRight = pomLeft.clone();
  pomLeft.position.set(-0.52, 1.58, 0);
  pomRight.position.set(0.52, 1.58, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.05, 0.5, 4, 8), new T.MeshStandardMaterial({ color: 0xf4cbaa }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.11, 0.26, 0);
  rightLeg.position.set(0.11, 0.26, 0);
  group.add(skirt, torso, head, hair, leftArm, rightArm, pomLeft, pomRight, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso, head, leftArm, rightArm, leftLeg, rightLeg };
  group.userData.animate = (now) => {
    const t = now * 0.008 + index;
    leftArm.rotation.z = -0.6 - Math.sin(t) * 0.45;
    rightArm.rotation.z = 0.6 + Math.sin(t) * 0.45;
    skirt.rotation.y = Math.sin(t * 0.5) * 0.08;
    group.position.y = Math.abs(Math.sin(t * 0.9)) * 0.16;
  };
  return group;
}

function createThemeProp(kind) {
  switch (kind) {
    case "building": return createBuilding();
    case "car": return createSideCar();
    case "walker": return createWalker();
    case "lamp": return createStreetLamp();
    case "slide": return createWaterSlide();
    case "wave": return createWaveProp();
    case "ride": return createRideProp();
    case "swimmer": return createSwimmer();
    case "lavaRock": return createLavaRock();
    case "eruption": return createEruptionProp();
    case "smoke": return createSmokeStack();
    case "burntTree": return createBurntTree();
    case "hut": return createHut();
    case "kid": return createKidPlaying();
    case "cart": return createCartProp();
    case "goat": return createGoatProp();
    case "tree": return createTree();
    case "deer": return createDeer();
    case "birdPole": return createBirdPole();
    case "bush": return createBush();
    case "campus": return createCampusBlock();
    case "girl": return createGirlWalker();
    case "bench": return createBench();
    case "basketball": return createBasketballScene();
    case "boat": return createBoat();
    case "fisher": return createFisher();
    case "cloudTower": return createCloudTower();
    case "bird": return createFlyingBird();
    case "balloon": return createBalloon();
    case "haloGate": return createHaloGate();
    default: return createTree();
  }
}

function createBuilding() {
  const group = new T.Group();
  const height = 2 + Math.random() * 4;
  const body = new T.Mesh(new T.BoxGeometry(1.6, height, 1.6), new T.MeshStandardMaterial({ color: 0x5f6b80, roughness: 0.8 }));
  body.position.y = height / 2;
  const windows = new T.Mesh(new T.BoxGeometry(1.45, height - 0.4, 0.05), new T.MeshStandardMaterial({ color: 0x98d8ff, emissive: 0x16364f, emissiveIntensity: 0.3 }));
  windows.position.set(0, height / 2, 0.83);
  group.add(body, windows);
  setShadowRecursive(group);
  return group;
}

function createSideCar() {
  const group = new T.Group();
  const body = new T.Mesh(new T.BoxGeometry(1.3, 0.56, 2.2), new T.MeshStandardMaterial({ color: 0xff6f61, metalness: 0.12 }));
  body.position.y = 0.42;
  const roof = new T.Mesh(new T.BoxGeometry(1.0, 0.42, 1.1), new T.MeshStandardMaterial({ color: 0xcfd8dc }));
  roof.position.set(0, 0.88, -0.1);
  const light = new T.Mesh(new T.SphereGeometry(0.09, 8, 8), new T.MeshStandardMaterial({ color: 0xfff8d0, emissive: 0xfff8d0, emissiveIntensity: 0.9 }));
  light.position.set(0.42, 0.45, 1.08);
  group.add(body, roof, light);
  setShadowRecursive(group);
  group.userData.animate = (now) => {
    group.position.x += Math.sin(now * 0.0015 + group.position.z) * 0.002;
  };
  return group;
}

function createWalker() {
  const walker = createSmallFigure(0x7bc9ff, 0x2e2e2e);
  walker.scale.setScalar(0.8);
  walker.userData.animate = (now) => animateHumanoid(walker, now, 0.75, false);
  return walker;
}

function createStreetLamp() {
  const group = new T.Group();
  const pole = new T.Mesh(new T.CylinderGeometry(0.06, 0.08, 2.8, 10), new T.MeshStandardMaterial({ color: 0x636b76 }));
  pole.position.y = 1.4;
  const arm = new T.Mesh(new T.BoxGeometry(0.45, 0.1, 0.12), new T.MeshStandardMaterial({ color: 0x515760 }));
  arm.position.set(0.2, 2.62, 0);
  const light = new T.Mesh(new T.SphereGeometry(0.12, 10, 10), new T.MeshStandardMaterial({ color: 0xffefaa, emissive: 0xffd866, emissiveIntensity: 0.75 }));
  light.position.set(0.38, 2.48, 0);
  group.add(pole, arm, light);
  setShadowRecursive(group);
  return group;
}

function createWaterSlide() {
  const group = new T.Group();
  const slide = new T.Mesh(new T.TorusGeometry(0.82, 0.19, 10, 22, Math.PI * 1.1), new T.MeshStandardMaterial({ color: 0xff8640, roughness: 0.4 }));
  slide.rotation.z = Math.PI / 2;
  slide.position.y = 1.5;
  const pole = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 2.6, 8), new T.MeshStandardMaterial({ color: 0x8fe6ff }));
  pole.position.y = 1.3;
  group.add(slide, pole);
  setShadowRecursive(group);
  return group;
}

function createWaveProp() {
  const group = new T.Group();
  const base = new T.Mesh(new T.BoxGeometry(2.3, 0.2, 1.4), new T.MeshStandardMaterial({ color: 0x2ab8ff, transparent: true, opacity: 0.75, emissive: 0x0d4e79, emissiveIntensity: 0.22 }));
  base.position.y = 0.12;
  const crest = new T.Mesh(new T.CylinderGeometry(0.14, 0.22, 1.8, 10, 1, false, 0, Math.PI), new T.MeshStandardMaterial({ color: 0xe8fbff, emissive: 0xc6f6ff, emissiveIntensity: 0.2 }));
  crest.rotation.z = Math.PI / 2;
  crest.position.set(0, 0.44, 0);
  group.add(base, crest);
  setShadowRecursive(group);
  group.userData.animate = (now) => { crest.position.y = 0.38 + Math.sin(now * 0.004 + group.position.z * 0.1) * 0.12; };
  return group;
}

function createRideProp() {
  const group = new T.Group();
  const ring = new T.Mesh(new T.TorusGeometry(0.8, 0.08, 10, 24), new T.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffa800, emissiveIntensity: 0.25 }));
  ring.position.y = 1.3;
  const stand = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 2.4, 8), new T.MeshStandardMaterial({ color: 0x97b7c8 }));
  stand.position.y = 1.2;
  group.add(ring, stand);
  setShadowRecursive(group);
  group.userData.animate = (now) => { ring.rotation.z = now * 0.0026; };
  return group;
}

function createSwimmer() {
  const figure = createSmallFigure(0xff7db2, 0x1f4d63);
  figure.scale.setScalar(0.72);
  figure.userData.animate = (now) => { figure.position.y = Math.sin(now * 0.005 + figure.position.z) * 0.12; };
  return figure;
}

function createLavaRock() {
  const group = new T.Group();
  const rock = new T.Mesh(new T.DodecahedronGeometry(0.82, 0), new T.MeshStandardMaterial({ color: 0x39251f, emissive: 0x7f2913, emissiveIntensity: 0.5 }));
  rock.position.y = 0.82;
  const crack = new T.Mesh(new T.BoxGeometry(0.18, 0.7, 0.12), new T.MeshStandardMaterial({ color: 0xff8f36, emissive: 0xff5b00, emissiveIntensity: 1 }));
  crack.position.set(0.1, 0.96, 0.2);
  group.add(rock, crack);
  setShadowRecursive(group);
  return group;
}

function createEruptionProp() {
  const group = new T.Group();
  const cone = new T.Mesh(new T.ConeGeometry(0.9, 1.8, 8), new T.MeshStandardMaterial({ color: 0x4e3129 }));
  cone.position.y = 0.9;
  const lava = new T.Mesh(new T.ConeGeometry(0.22, 0.7, 8), new T.MeshStandardMaterial({ color: 0xff7f2a, emissive: 0xff5b00, emissiveIntensity: 1 }));
  lava.position.y = 2.0;
  group.add(cone, lava);
  setShadowRecursive(group);
  group.userData.animate = (now) => {
    lava.scale.y = 0.7 + Math.abs(Math.sin(now * 0.006)) * 1.8;
    lava.position.y = 1.8 + Math.abs(Math.sin(now * 0.006)) * 0.55;
  };
  return group;
}

function createSmokeStack() {
  const group = new T.Group();
  const stack = new T.Mesh(new T.CylinderGeometry(0.22, 0.3, 2.2, 10), new T.MeshStandardMaterial({ color: 0x463936 }));
  stack.position.y = 1.1;
  const puff = new T.Mesh(new T.SphereGeometry(0.52, 12, 12), new T.MeshStandardMaterial({ color: 0x777777, transparent: true, opacity: 0.75 }));
  puff.position.y = 2.55;
  group.add(stack, puff);
  setShadowRecursive(group);
  group.userData.animate = (now) => {
    puff.position.y = 2.35 + Math.abs(Math.sin(now * 0.004 + group.position.z * 0.1)) * 0.8;
    puff.scale.setScalar(0.9 + Math.abs(Math.sin(now * 0.004)) * 0.4);
  };
  return group;
}

function createBurntTree() {
  const group = new T.Group();
  const trunk = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 2.2, 8), new T.MeshStandardMaterial({ color: 0x2a201d }));
  trunk.position.y = 1.1;
  const branch = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1.2, 6), new T.MeshStandardMaterial({ color: 0x332621 }));
  branch.position.set(0.2, 1.9, 0);
  branch.rotation.z = 0.8;
  group.add(trunk, branch);
  setShadowRecursive(group);
  return group;
}

function createHut() {
  const group = new T.Group();
  const base = new T.Mesh(new T.BoxGeometry(1.7, 1.1, 1.3), new T.MeshStandardMaterial({ color: 0xd0a06a }));
  base.position.y = 0.55;
  const roof = new T.Mesh(new T.ConeGeometry(1.22, 0.9, 4), new T.MeshStandardMaterial({ color: 0x8b5a2b }));
  roof.position.y = 1.48;
  roof.rotation.y = Math.PI / 4;
  group.add(base, roof);
  setShadowRecursive(group);
  return group;
}

function createKidPlaying() {
  const child = createSmallFigure(0xffd166, 0x2b7a4b);
  child.scale.setScalar(0.62);
  const ball = new T.Mesh(new T.SphereGeometry(0.14, 10, 10), new T.MeshStandardMaterial({ color: 0xff7043 }));
  ball.position.set(0.55, 0.15, 0);
  child.add(ball);
  child.userData.animate = (now) => {
    ball.position.y = 0.1 + Math.abs(Math.sin(now * 0.01)) * 0.42;
    animateHumanoid(child, now, 0.7, false);
  };
  return child;
}

function createCartProp() {
  const group = new T.Group();
  const bed = new T.Mesh(new T.BoxGeometry(1.4, 0.28, 0.9), new T.MeshStandardMaterial({ color: 0xa06a3c }));
  bed.position.y = 0.52;
  const wheel = new T.Mesh(new T.CylinderGeometry(0.22, 0.22, 0.1, 16), new T.MeshStandardMaterial({ color: 0x222222 }));
  const wheel2 = wheel.clone();
  wheel.rotation.z = Math.PI / 2;
  wheel2.rotation.z = Math.PI / 2;
  wheel.position.set(-0.52, 0.22, 0.46);
  wheel2.position.set(0.52, 0.22, 0.46);
  group.add(bed, wheel, wheel2);
  setShadowRecursive(group);
  return group;
}

function createGoatProp() {
  const group = new T.Group();
  const body = new T.Mesh(new T.BoxGeometry(0.9, 0.45, 0.4), new T.MeshStandardMaterial({ color: 0xf2f2e6 }));
  body.position.y = 0.46;
  const head = new T.Mesh(new T.BoxGeometry(0.26, 0.26, 0.24), new T.MeshStandardMaterial({ color: 0xe8e0d0 }));
  head.position.set(0.48, 0.66, 0);
  group.add(body, head);
  for (const [x, z] of [[-0.24, -0.1], [-0.08, 0.1], [0.18, -0.1], [0.38, 0.1]]) {
    const leg = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.46, 8), new T.MeshStandardMaterial({ color: 0x8c7d67 }));
    leg.position.set(x, 0.16, z);
    group.add(leg);
  }
  setShadowRecursive(group);
  group.userData.animate = (now) => { group.rotation.y = Math.sin(now * 0.003 + group.position.z) * 0.25; };
  return group;
}

function createTree() {
  const group = new T.Group();
  const trunk = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 2.3, 8), new T.MeshStandardMaterial({ color: 0x5a3d25 }));
  trunk.position.y = 1.15;
  const crown = new T.Mesh(new T.SphereGeometry(0.72, 12, 12), new T.MeshStandardMaterial({ color: 0x2f7f3c }));
  crown.position.y = 2.42;
  group.add(trunk, crown);
  setShadowRecursive(group);
  group.userData.animate = (now) => { crown.rotation.z = Math.sin(now * 0.002 + group.position.z * 0.02) * 0.06; };
  return group;
}

function createDeer() {
  const group = new T.Group();
  const body = new T.Mesh(new T.BoxGeometry(1.0, 0.44, 0.34), new T.MeshStandardMaterial({ color: 0xc98a52 }));
  body.position.y = 0.58;
  const neck = new T.Mesh(new T.BoxGeometry(0.18, 0.52, 0.16), new T.MeshStandardMaterial({ color: 0xc98a52 }));
  neck.position.set(0.38, 0.88, 0);
  const head = new T.Mesh(new T.BoxGeometry(0.34, 0.22, 0.2), new T.MeshStandardMaterial({ color: 0xd69a63 }));
  head.position.set(0.56, 1.08, 0);
  group.add(body, neck, head);
  for (const [x, z] of [[-0.28, -0.1], [-0.08, 0.1], [0.18, -0.1], [0.38, 0.1]]) {
    const leg = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.58, 8), new T.MeshStandardMaterial({ color: 0x8c5d34 }));
    leg.position.set(x, 0.22, z);
    group.add(leg);
  }
  setShadowRecursive(group);
  group.userData.animate = (now) => { group.position.x += Math.sin(now * 0.003 + group.position.z) * 0.002; };
  return group;
}

function createBirdPole() {
  const group = new T.Group();
  const pole = new T.Mesh(new T.CylinderGeometry(0.05, 0.06, 2.1, 8), new T.MeshStandardMaterial({ color: 0x7b6d57 }));
  pole.position.y = 1.05;
  const bird = createFlyingBird();
  bird.scale.setScalar(0.42);
  bird.position.set(0.14, 2.05, 0);
  group.add(pole, bird);
  setShadowRecursive(group);
  group.userData.animate = (now) => { bird.rotation.z = Math.sin(now * 0.01) * 0.18; };
  return group;
}

function createBush() {
  const group = new T.Group();
  const left = new T.Mesh(new T.SphereGeometry(0.34, 10, 10), new T.MeshStandardMaterial({ color: 0x468547 }));
  const right = left.clone();
  left.position.set(-0.22, 0.3, 0);
  right.position.set(0.22, 0.34, 0);
  group.add(left, right);
  setShadowRecursive(group);
  return group;
}

function createCampusBlock() {
  const group = new T.Group();
  const base = new T.Mesh(new T.BoxGeometry(2.0, 1.5, 1.3), new T.MeshStandardMaterial({ color: 0xe9dcc3 }));
  base.position.y = 0.75;
  const roof = new T.Mesh(new T.BoxGeometry(2.2, 0.16, 1.45), new T.MeshStandardMaterial({ color: 0x8b4e3b }));
  roof.position.y = 1.56;
  const banner = new T.Mesh(new T.BoxGeometry(1.4, 0.36, 0.06), new T.MeshStandardMaterial({ color: 0x5d8cff, emissive: 0x243d84, emissiveIntensity: 0.25 }));
  banner.position.set(0, 1.0, 0.68);
  group.add(base, roof, banner);
  setShadowRecursive(group);
  return group;
}

function createGirlWalker() {
  const girl = createSmallFigure(0xff8ab6, 0x1f1f1f);
  girl.scale.setScalar(0.76);
  girl.userData.animate = (now) => animateHumanoid(girl, now, 0.82, false);
  return girl;
}

function createBench() {
  const group = new T.Group();
  const seat = new T.Mesh(new T.BoxGeometry(1.2, 0.12, 0.36), new T.MeshStandardMaterial({ color: 0x8f633a }));
  seat.position.y = 0.52;
  const back = new T.Mesh(new T.BoxGeometry(1.2, 0.52, 0.12), new T.MeshStandardMaterial({ color: 0x9b6f45 }));
  back.position.set(0, 0.84, -0.12);
  group.add(seat, back);
  setShadowRecursive(group);
  return group;
}

function createBasketballScene() {
  const group = new T.Group();
  const pole = new T.Mesh(new T.CylinderGeometry(0.05, 0.06, 2.3, 8), new T.MeshStandardMaterial({ color: 0x717d8b }));
  pole.position.y = 1.15;
  const board = new T.Mesh(new T.BoxGeometry(0.7, 0.45, 0.05), new T.MeshStandardMaterial({ color: 0xffffff }));
  board.position.set(0, 2.1, 0);
  const ball = new T.Mesh(new T.SphereGeometry(0.14, 12, 12), new T.MeshStandardMaterial({ color: 0xff7b32 }));
  ball.position.set(0.4, 0.4, 0);
  group.add(pole, board, ball);
  setShadowRecursive(group);
  group.userData.animate = (now) => { ball.position.y = 0.3 + Math.abs(Math.sin(now * 0.01)) * 0.9; };
  return group;
}

function createBoat() {
  const group = new T.Group();
  const hull = new T.Mesh(new T.BoxGeometry(1.8, 0.36, 0.7), new T.MeshStandardMaterial({ color: 0x5c3a1d }));
  hull.position.y = 0.2;
  const mast = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 1.45, 8), new T.MeshStandardMaterial({ color: 0x3b2a18 }));
  mast.position.y = 0.94;
  const sail = new T.Mesh(new T.PlaneGeometry(0.82, 1.05), new T.MeshStandardMaterial({ color: 0xfef8e7, side: T.DoubleSide }));
  sail.position.set(0.18, 1.02, 0);
  group.add(hull, mast, sail);
  setShadowRecursive(group);
  group.userData.animate = (now) => { group.rotation.z = Math.sin(now * 0.003 + group.position.z) * 0.08; };
  return group;
}

function createFisher() {
  const fisher = createSmallFigure(0x4d7dd6, 0x59361d);
  fisher.scale.setScalar(0.78);
  const rod = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 1.4, 8), new T.MeshStandardMaterial({ color: 0x6e4b22 }));
  rod.position.set(0.46, 1.3, 0);
  rod.rotation.z = -0.5;
  fisher.add(rod);
  fisher.userData.animate = (now) => { rod.rotation.z = -0.8 + Math.sin(now * 0.005) * 0.2; };
  return fisher;
}

function createCloudTower() {
  const group = new T.Group();
  for (let i = 0; i < 3; i += 1) {
    const puff = new T.Mesh(new T.SphereGeometry(0.9 - i * 0.1, 12, 12), new T.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }));
    puff.position.set(i * 0.55 - 0.5, 0.4 + (i % 2) * 0.22, 0);
    group.add(puff);
  }
  group.userData.animate = (now) => { group.position.x += Math.sin(now * 0.0008 + group.position.z) * 0.003; };
  return group;
}

function createFlyingBird() {
  const group = new T.Group();
  const body = new T.Mesh(new T.SphereGeometry(0.16, 10, 10), new T.MeshStandardMaterial({ color: 0x2d3340 }));
  const wingLeft = new T.Mesh(new T.BoxGeometry(0.36, 0.04, 0.18), new T.MeshStandardMaterial({ color: 0x495464 }));
  const wingRight = wingLeft.clone();
  wingLeft.position.set(-0.22, 0, 0);
  wingRight.position.set(0.22, 0, 0);
  group.add(body, wingLeft, wingRight);
  group.userData.animate = (now) => {
    wingLeft.rotation.z = -0.4 - Math.sin(now * 0.02) * 0.6;
    wingRight.rotation.z = 0.4 + Math.sin(now * 0.02) * 0.6;
  };
  return group;
}

function createBalloon() {
  const group = new T.Group();
  const top = new T.Mesh(new T.SphereGeometry(0.52, 16, 16), new T.MeshStandardMaterial({ color: 0xff8d66, emissive: 0x7b2d14, emissiveIntensity: 0.15 }));
  top.position.y = 1.5;
  const basket = new T.Mesh(new T.BoxGeometry(0.26, 0.18, 0.26), new T.MeshStandardMaterial({ color: 0x8c633f }));
  basket.position.y = 0.65;
  group.add(top, basket);
  setShadowRecursive(group);
  group.userData.animate = (now) => { group.position.y += Math.sin(now * 0.002 + group.position.z) * 0.002; };
  return group;
}

function createHaloGate() {
  const group = new T.Group();
  const ring = new T.Mesh(new T.TorusGeometry(0.9, 0.08, 10, 24), new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0xaacbff, emissiveIntensity: 0.6 }));
  ring.position.y = 1.2;
  group.add(ring);
  group.userData.animate = (now) => { ring.rotation.y = now * 0.002; };
  return group;
}

function createSmallFigure(outfitColor, hairColor) {
  const group = new T.Group();
  const torso = new T.Mesh(new T.CapsuleGeometry(0.18, 0.45, 4, 8), new T.MeshStandardMaterial({ color: outfitColor }));
  torso.position.y = 1.15;
  const head = new T.Mesh(new T.SphereGeometry(0.18, 12, 12), new T.MeshStandardMaterial({ color: 0xf3c9aa }));
  head.position.y = 1.56;
  const hair = new T.Mesh(new T.SphereGeometry(0.19, 10, 10), new T.MeshStandardMaterial({ color: hairColor }));
  hair.position.set(0, 1.6, -0.02);
  const leftArm = new T.Mesh(new T.CapsuleGeometry(0.05, 0.42, 4, 8), new T.MeshStandardMaterial({ color: 0xf3c9aa }));
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.22, 1.1, 0);
  rightArm.position.set(0.22, 1.1, 0);
  const leftLeg = new T.Mesh(new T.CapsuleGeometry(0.05, 0.52, 4, 8), new T.MeshStandardMaterial({ color: 0x2b2b2b }));
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.08, 0.42, 0);
  rightLeg.position.set(0.08, 0.42, 0);
  group.add(torso, head, hair, leftArm, rightArm, leftLeg, rightLeg);
  setShadowRecursive(group);
  group.userData.parts = { torso, head, leftArm, rightArm, leftLeg, rightLeg };
  return group;
}

function getFaceTexture(path) {
  if (faceTextureCache.has(path)) return faceTextureCache.get(path);
  const texture = textureLoader.load(path);
  texture.colorSpace = T.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  faceTextureCache.set(path, texture);
  return texture;
}

function getClothTexture(costumeKey) {
  if (clothTextureCache.has(costumeKey)) return clothTextureCache.get(costumeKey);
  const config = COSTUMES[costumeKey];
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = config.primary;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = config.trim;
  for (let y = 0; y < 256; y += costumeKey === "suit" ? 64 : 40) {
    ctx.globalAlpha = 0.22;
    ctx.fillRect(0, y, 256, 10);
  }
  ctx.globalAlpha = 0.16;
  for (let x = 0; x < 256; x += 38) {
    ctx.fillStyle = config.accent;
    ctx.fillRect(x, 0, 6, 256);
  }
  ctx.globalAlpha = 1;
  const texture = new T.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.colorSpace = T.SRGBColorSpace;
  clothTextureCache.set(costumeKey, texture);
  return texture;
}

function spawnAhead() {
  const level = state.currentLevel;
  while (state.spawnCursor < state.distance + 190) {
    const distance = state.spawnCursor;
    const roll = Math.random();
    if (roll < level.obstacleRate) {
      world.runtimeItems.push(makeObstacle(distance));
      if (Math.random() < 0.18 + level.id * 0.015) world.runtimeItems.push(makeObstacle(distance + 3.8, true));
    } else if (roll < 0.76) {
      world.runtimeItems.push(makeCoin(distance));
      if (Math.random() < 0.55) world.runtimeItems.push(makeCoin(distance + 1.8, false));
    } else {
      world.runtimeItems.push(makePowerup(distance));
    }
    state.spawnCursor += Math.max(5.8 - level.id * 0.16, 3.7) + Math.random() * 2.8;
  }
}

function makeObstacle(distance, forceDifferentLane = false) {
  const lane = randomLane(forceDifferentLane ? state.lane : undefined);
  const obstacleType = Math.random() < 0.34 ? "barricade" : Math.random() < 0.5 ? "hurdle" : "arch";
  let mesh;
  let bounds;
  if (obstacleType === "barricade") {
    mesh = Math.random() < 0.35 ? createAutoRickshawObstacle() : createAnimalBarrierObstacle();
    bounds = { width: 0.82, height: 1.2, depth: 0.82, y: 0.6 };
  } else if (obstacleType === "hurdle") {
    mesh = createHurdleObstacle();
    bounds = { width: 0.82, height: 0.78, depth: 0.4, y: 0.42 };
  } else {
    mesh = createArchObstacle();
    bounds = { width: 0.9, height: 1.95, depth: 0.32, y: 0.98 };
  }
  mesh.position.set(laneX(lane), 0, 0);
  world.runtime.add(mesh);
  return { type: "obstacle", obstacleType, mesh, lane, distance, bounds, collected: false };
}

function createAnimalBarrierObstacle() {
  const group = new T.Group();
  const texture = textureLoader.load(barrierImages[Math.floor(Math.random() * barrierImages.length)]);
  texture.colorSpace = T.SRGBColorSpace;
  const body = new T.Mesh(new T.BoxGeometry(1.18, 1.18, 0.86), new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0x2d3d52, emissiveIntensity: 0.22 }));
  body.position.y = 0.6;
  const face = new T.Mesh(new T.PlaneGeometry(1.34, 1.34), new T.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.08, side: T.DoubleSide, toneMapped: false }));
  face.position.set(0, 0.72, 0.46);
  const glow = new T.Mesh(new T.BoxGeometry(1.34, 1.34, 0.16), new T.MeshBasicMaterial({ color: 0x8bf0ff, transparent: true, opacity: 0.18 }));
  glow.position.set(0, 0.72, 0);
  group.add(body, face, glow);
  addGlowShell(body, 0x76e5ff, 1.08);
  setShadowRecursive(group);
  return group;
}

function createHurdleObstacle() {
  const group = new T.Group();
  const bar = new T.Mesh(new T.BoxGeometry(1.28, 0.28, 0.34), new T.MeshStandardMaterial({ color: 0xff7b3a, emissive: 0xff5d00, emissiveIntensity: 0.45 }));
  bar.position.y = 0.42;
  const left = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.86, 10), new T.MeshStandardMaterial({ color: 0x2c3040 }));
  const right = left.clone();
  left.position.set(-0.5, 0.42, 0);
  right.position.set(0.5, 0.42, 0);
  group.add(bar, left, right);
  addGlowShell(bar, 0xffc27a, 1.05);
  setShadowRecursive(group);
  return group;
}

function createArchObstacle() {
  const group = new T.Group();
  const top = new T.Mesh(new T.BoxGeometry(1.54, 0.22, 0.34), new T.MeshStandardMaterial({ color: 0x9bc6ff, emissive: 0x4878c8, emissiveIntensity: 0.42 }));
  top.position.y = 1.82;
  const left = new T.Mesh(new T.BoxGeometry(0.18, 1.9, 0.24), new T.MeshStandardMaterial({ color: 0x59677d }));
  const right = left.clone();
  left.position.set(-0.6, 0.95, 0);
  right.position.set(0.6, 0.95, 0);
  group.add(top, left, right);
  addGlowShell(top, 0xaad8ff, 1.04);
  setShadowRecursive(group);
  return group;
}

function createAutoRickshawObstacle() {
  const group = new T.Group();
  const base = new T.Mesh(new T.BoxGeometry(1.28, 0.92, 1.75), new T.MeshStandardMaterial({ color: 0xfbd43b, metalness: 0.12 }));
  base.position.y = 0.5;
  const hood = new T.Mesh(new T.BoxGeometry(1.08, 0.5, 1.1), new T.MeshStandardMaterial({ color: 0x232323 }));
  hood.position.set(0, 1.06, -0.08);
  const lightLeft = new T.Mesh(new T.SphereGeometry(0.09, 8, 8), new T.MeshStandardMaterial({ color: 0xffffdc, emissive: 0xffffaa, emissiveIntensity: 1 }));
  const lightRight = lightLeft.clone();
  lightLeft.position.set(-0.34, 0.44, 0.84);
  lightRight.position.set(0.34, 0.44, 0.84);
  group.add(base, hood, lightLeft, lightRight);
  addGlowShell(base, 0xfff38a, 1.05);
  setShadowRecursive(group);
  return group;
}

function makeCoin(distance, randomizeLane = true) {
  const lane = randomizeLane ? randomLane() : state.lane;
  const group = new T.Group();
  const coin = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.1, 24), new T.MeshStandardMaterial({ color: 0xffd54f, emissive: 0xffb300, emissiveIntensity: 0.7, metalness: 0.8, roughness: 0.22 }));
  coin.rotation.z = Math.PI / 2;
  const inner = new T.Mesh(new T.CylinderGeometry(0.18, 0.18, 0.11, 24), new T.MeshStandardMaterial({ color: 0xfff2af, emissive: 0xfde47a, emissiveIntensity: 0.32 }));
  inner.rotation.z = Math.PI / 2;
  group.add(coin, inner);
  group.position.set(laneX(lane), 1.22, 0);
  group.userData.floatSeed = Math.random() * Math.PI * 2;
  addGlowShell(coin, 0xffef82, 1.8);
  world.runtime.add(group);
  return { type: "coin", mesh: group, lane, distance, bounds: { width: 0.42, height: 0.42, depth: 0.42, y: 1.22 }, collected: false };
}

function makePowerup(distance) {
  const lane = randomLane();
  const roll = Math.random();
  const power = roll < 0.45 ? "shield" : roll < 0.84 ? "rocket" : "fly";
  let mesh;
  let bounds;
  if (power === "shield") {
    mesh = createShieldPowerup();
    bounds = { width: 0.54, height: 0.66, depth: 0.54, y: 1.3 };
  } else if (power === "rocket") {
    mesh = createRocketPowerup();
    bounds = { width: 0.62, height: 0.46, depth: 0.62, y: 1.18 };
  } else {
    mesh = createFlyingPowerup();
    bounds = { width: 0.82, height: 0.78, depth: 0.82, y: 1.5 };
  }
  mesh.position.set(laneX(lane), bounds.y, 0);
  mesh.userData.floatSeed = Math.random() * Math.PI * 2;
  world.runtime.add(mesh);
  return { type: "powerup", power, mesh, lane, distance, bounds, collected: false };
}

function createShieldPowerup() {
  const group = new T.Group();
  const shield = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.12, 24), new T.MeshStandardMaterial({ color: 0x5bd7ff, emissive: 0x2ca9ff, emissiveIntensity: 0.72, metalness: 0.6 }));
  shield.rotation.x = Math.PI / 2;
  const ring = new T.Mesh(new T.TorusGeometry(0.42, 0.06, 10, 24), new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0xaef7ff, emissiveIntensity: 0.6 }));
  ring.rotation.x = Math.PI / 2;
  group.add(shield, ring);
  addGlowShell(shield, 0x86f3ff, 1.55);
  setShadowRecursive(group);
  return group;
}

function createRocketPowerup() {
  const group = new T.Group();
  const body = new T.Mesh(new T.CylinderGeometry(0.14, 0.18, 0.84, 16), new T.MeshStandardMaterial({ color: 0xd63b3b, metalness: 0.36 }));
  body.rotation.z = Math.PI / 2;
  const nose = new T.Mesh(new T.ConeGeometry(0.16, 0.28, 12), new T.MeshStandardMaterial({ color: 0xffffff }));
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 0.55;
  const flame = new T.Mesh(new T.ConeGeometry(0.14, 0.42, 10), new T.MeshStandardMaterial({ color: 0xffce4a, emissive: 0xff7a00, emissiveIntensity: 1 }));
  flame.rotation.z = Math.PI / 2;
  flame.position.x = -0.55;
  group.add(body, nose, flame);
  addGlowShell(body, 0xff9e5f, 1.6);
  setShadowRecursive(group);
  return group;
}

function createFlyingPowerup() {
  const group = new T.Group();
  const wing = new T.Mesh(new T.BoxGeometry(1.12, 0.08, 0.3), new T.MeshStandardMaterial({ color: 0x92ffb8, emissive: 0x2ea85a, emissiveIntensity: 0.45 }));
  const canopy = new T.Mesh(new T.SphereGeometry(0.4, 16, 14, 0, Math.PI), new T.MeshStandardMaterial({ color: 0xffef9f, emissive: 0xc79d2a, emissiveIntensity: 0.3 }));
  canopy.rotation.x = Math.PI;
  canopy.position.y = 0.48;
  const ropeLeft = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 0.48, 6), new T.MeshStandardMaterial({ color: 0xffffff }));
  const ropeRight = ropeLeft.clone();
  ropeLeft.position.set(-0.28, 0.24, 0);
  ropeRight.position.set(0.28, 0.24, 0);
  group.add(wing, canopy, ropeLeft, ropeRight);
  addGlowShell(wing, 0xc9ffd6, 1.45);
  setShadowRecursive(group);
  return group;
}

function updateGame(delta) {
  const now = performance.now();
  const level = state.currentLevel;
  const boostActive = now < state.boostUntil;
  const flyActive = now < state.flyingUntil;
  const slideActive = now < state.slidingUntil;
  const shieldActive = now < state.shieldUntil;

  const difficultySpeed = level.baseSpeed + (state.distance / level.targetDistance) * level.speedRamp * 40;
  state.speed += ((boostActive ? difficultySpeed * 1.7 : difficultySpeed) - state.speed) * 0.08;
  state.distance += state.speed * delta * 60;
  state.score += state.speed * delta * 130;

  world.player.position.x += (laneX(state.lane) - world.player.position.x) * Math.min(1, delta * 12);

  if (flyActive) {
    world.player.position.y = 3.6 + Math.sin(now * 0.01) * 0.18;
    ui.statusValue.textContent = "Flying";
  } else {
    state.jumpV -= 0.018 * delta * 60;
    world.player.position.y = Math.max(0, world.player.position.y + state.jumpV * delta * 60);
    if (world.player.position.y <= 0) {
      world.player.position.y = 0;
      state.jumpV = 0;
    }
    if (slideActive) ui.statusValue.textContent = "Sliding";
    else if (shieldActive) ui.statusValue.textContent = "Shielded";
    else if (boostActive) ui.statusValue.textContent = "Rocket";
    else ui.statusValue.textContent = "Running";
  }

  animateHumanoid(world.player, now, 1.2 + state.speed * 1.8, slideActive);
  animateVillain(world.villain, now, 1 + state.speed * 1.25);

  const chaseGapTarget = Math.max(1.95, 8.8 - state.distance * level.chaseTighten * 42);
  world.villain.position.z += (chaseGapTarget - world.villain.position.z) * Math.min(1, delta * 2.6);
  world.villain.position.x += (world.player.position.x - world.villain.position.x) * Math.min(1, delta * 3.2);
  world.villain.position.y = now < state.flyingUntil && state.currentLevel.villainKey === "ghost" ? 0.8 + Math.sin(now * 0.005) * 0.25 : 0;

  roadScroll(now);
  updateEnvironmentAnimations(now);
  updateRuntimeItems(now);
  cleanupRuntimeItems();
  if (world.runtimeItems.length < 45) spawnAhead();
  if (state.distance >= level.targetDistance) return completeRun();
  if (now - state.runStartMs > 4500 && world.villain.position.z < 0.95) return endRun();

  const desiredCameraY = flyActive ? 6.9 : 5.8;
  camera.position.x += (world.player.position.x * 0.4 - camera.position.x) * Math.min(1, delta * 5);
  camera.position.y += (desiredCameraY - camera.position.y) * Math.min(1, delta * 3.2);
  camera.position.z = 10.8;
  camera.lookAt(world.player.position.x * 0.18, world.player.position.y + 1.7, -10);

  ui.scoreValue.textContent = String(Math.floor(state.score));
  ui.coinValue.textContent = String(state.coins);
  ui.levelValue.textContent = String(level.id);
  ui.timeValue.textContent = formatTime((now - state.runStartMs) / 1000);
}

function updateEnvironmentAnimations(now) {
  world.environmentAnimations.forEach((object) => object.userData.animate?.(now));
  world.cheerSquad.children.forEach((child) => child.userData.animate?.(now));
}

function updateRuntimeItems(now) {
  const playerBounds = getPlayerBounds();
  world.runtimeItems.forEach((item) => {
    const localZ = state.distance - item.distance;
    item.mesh.position.z = localZ;
    if (item.type === "coin" || item.type === "powerup") {
      item.mesh.rotation.y += 0.08;
      item.mesh.position.y = item.bounds.y + Math.sin(now * 0.005 + item.mesh.userData.floatSeed) * 0.16;
      if (item.power === "rocket") item.mesh.rotation.z = Math.sin(now * 0.01) * 0.14;
      if (item.power === "fly") item.mesh.rotation.x = Math.sin(now * 0.004) * 0.08;
    }
    if (localZ > 12) {
      item.collected = true;
      return;
    }
    if (Math.abs(localZ) < 1.3 && overlaps(playerBounds, getItemBounds(item))) {
      handleCollision(item, now);
    }
  });
}

function handleCollision(item, now) {
  if (item.collected) return;
  if (item.type === "coin") {
    item.collected = true;
    state.coins += 1;
    state.score += 42;
    playEffect(audio.coin);
    return;
  }
  if (item.type === "powerup") {
    item.collected = true;
    if (item.power === "shield") {
      state.shieldUntil = now + 7200;
      showCenterMessage("Shield Up!", 1200);
    } else if (item.power === "rocket") {
      state.boostUntil = now + 5200;
      showCenterMessage("Rocket Boost!", 1200);
    } else {
      state.flyingUntil = now + 4300;
      showCenterMessage("Glider Active!", 1200);
    }
    playEffect(audio.levelup);
    return;
  }
  if (item.type === "obstacle") {
    const invincible = now < state.shieldUntil || now < state.flyingUntil;
    if (invincible) {
      item.collected = true;
      return;
    }
    if (item.obstacleType === "hurdle" && world.player.position.y > 0.92) {
      item.collected = true;
      return;
    }
    if (item.obstacleType === "arch" && now < state.slidingUntil) {
      item.collected = true;
      return;
    }
    playEffect(audio.hit);
    endRun();
  }
}

function getPlayerBounds() {
  const slideActive = performance.now() < state.slidingUntil;
  const flyActive = performance.now() < state.flyingUntil;
  return {
    x: world.player.position.x,
    y: flyActive ? world.player.position.y + 0.9 : world.player.position.y + (slideActive ? 0.55 : 1.05),
    z: 0,
    width: 0.52,
    height: slideActive ? 0.72 : 1.78,
    depth: 0.62,
  };
}

function getItemBounds(item) {
  return { x: item.mesh.position.x, y: item.mesh.position.y, z: item.mesh.position.z, width: item.bounds.width, height: item.bounds.height, depth: item.bounds.depth };
}

function overlaps(a, b) {
  return (
    Math.abs(a.x - b.x) < (a.width + b.width) * 0.5 &&
    Math.abs(a.y - b.y) < (a.height + b.height) * 0.5 &&
    Math.abs(a.z - b.z) < (a.depth + b.depth) * 0.5
  );
}

function cleanupRuntimeItems() {
  world.runtimeItems = world.runtimeItems.filter((item) => {
    if (!item.collected) return true;
    world.runtime.remove(item.mesh);
    disposeObject(item.mesh);
    return false;
  });
}

function endRun() {
  if (gameMode !== "playing") return;
  gameMode = "catching";
  state.canControl = false;
  state.paused = false;
  state.catchEndsAt = performance.now() + 5000;
  audio.run.pause();
  audio.bg.pause();
  playEffect(audio.fail);
  showHUD(false);
  ui.centerMessage.textContent = `${getSelectedVillainName()} caught you...`;
  ui.centerMessage.classList.remove("hidden");
  window.setTimeout(() => {
    if (gameMode !== "catching") return;
    saveLeaderboardEntry(false);
    ui.loseFaceImage.src = characters[settings.characterIndex]?.face || "face.png";
    ui.loseDialog.textContent = TEASE_DIALOGUES[Math.floor(Math.random() * TEASE_DIALOGUES.length)];
    ui.centerMessage.classList.add("hidden");
    gameMode = "over";
    showOverlay(ui.loseModal);
  }, 5000);
}

function completeRun() {
  if (gameMode !== "playing") return;
  gameMode = "levelComplete";
  state.canControl = false;
  state.paused = false;
  audio.run.pause();
  audio.bg.pause();
  playEffect(audio.levelup);
  playVoiceSequence();
  saveLeaderboardEntry(true);
  if (state.currentLevel.id < LEVELS.length) saveUnlockedLevel(Math.max(state.highestUnlocked, state.currentLevel.id + 1));
  ui.levelCompleteTitle.textContent = state.currentLevel.id === LEVELS.length ? "Legend Complete" : "Level Complete";
  ui.levelCompleteSubtitle.textContent = state.currentLevel.id === LEVELS.length
    ? "You actually cleared Level 10. Stay with us, more updates and madness are coming soon."
    : `${state.currentLevel.name} cleared. Next villain unlocked.`;
  ui.completeScore.textContent = String(Math.floor(state.score));
  ui.completeCoins.textContent = String(state.coins);
  ui.completeTime.textContent = formatTime((performance.now() - state.runStartMs) / 1000);
  document.getElementById("nextLevelBtn").textContent = state.currentLevel.id === LEVELS.length ? "Back to Menu" : "Next Level";
  buildLevelGrid();
  showOverlay(ui.levelCompleteModal);
  showHUD(false);
}

function clearRuntime() {
  world.runtimeItems.forEach((item) => disposeObject(item.mesh));
  world.runtimeItems = [];
  clearGroup(world.runtime);
  world.cheerSquad.visible = false;
  if (world.countdownSprite) {
    camera.remove(world.countdownSprite);
    disposeObject(world.countdownSprite);
    world.countdownSprite = null;
  }
}

function flash3DText(text) {
  if (world.countdownSprite) {
    camera.remove(world.countdownSprite);
    disposeObject(world.countdownSprite);
    world.countdownSprite = null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(120, 120, 784, 272);
  ctx.strokeStyle = "#ffe69a";
  ctx.lineWidth = 14;
  ctx.strokeRect(120, 120, 784, 272);
  ctx.font = "bold 190px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#fffef0");
  gradient.addColorStop(0.45, "#ffd166");
  gradient.addColorStop(1, "#ff8f3c");
  ctx.fillStyle = gradient;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  const sprite = new T.Sprite(new T.SpriteMaterial({ map: texture, transparent: true, toneMapped: false }));
  sprite.position.set(0, 3.1, -6);
  sprite.scale.set(4.8, 2.4, 1);
  camera.add(sprite);
  world.countdownSprite = sprite;
  window.setTimeout(() => {
    if (world.countdownSprite === sprite) {
      camera.remove(sprite);
      disposeObject(sprite);
      world.countdownSprite = null;
    }
  }, 560);
}

function showCenterMessage(text, duration = 1200) {
  ui.centerMessage.textContent = text;
  ui.centerMessage.classList.remove("hidden");
  if (duration > 0) {
    window.setTimeout(() => {
      if (ui.centerMessage.textContent === text) ui.centerMessage.classList.add("hidden");
    }, duration);
  }
}

function updateIntroScene(delta, now) {
  updateEnvironmentAnimations(now);
  roadScroll(now);
  if (!world.player || !world.villain) return;

  if (state.introPhase === "villain") {
    world.villain.position.z += (8.4 - world.villain.position.z) * Math.min(1, delta * 1.2);
    world.villain.position.x += (0 - world.villain.position.x) * Math.min(1, delta * 1.4);
    animateVillain(world.villain, now, 0.38);
    animateHumanoid(world.player, now, 0.18, false);
    camera.position.x += (1.4 - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (4.8 - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z += (6.4 - camera.position.z) * Math.min(1, delta * 2);
    camera.lookAt(world.villain.position.x, 1.8, world.villain.position.z - 4.8);
    return;
  }

  if (state.introPhase === "cheer") {
    world.cheerSquad.visible = true;
    animateVillain(world.villain, now, 0.24);
    animateHumanoid(world.player, now, 0.2, false);
    camera.position.x += (0 - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (3.4 - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z += (7.2 - camera.position.z) * Math.min(1, delta * 2);
    camera.lookAt(0, 1.4, -8.5);
    return;
  }

  world.cheerSquad.visible = false;
  world.player.rotation.y += delta * 0.8;
  animateHumanoid(world.player, now, 0.34, false);
  animateVillain(world.villain, now, 0.2);
  camera.position.x += (0 - camera.position.x) * Math.min(1, delta * 2.5);
  camera.position.y += (5.4 - camera.position.y) * Math.min(1, delta * 2.5);
  camera.position.z += (9.4 - camera.position.z) * Math.min(1, delta * 2.5);
  camera.lookAt(0, 1.7, -4.5);
}

function updateCatchScene(delta, now) {
  updateEnvironmentAnimations(now);
  roadScroll(now);
  if (!world.player || !world.villain) return;

  world.villain.position.z += (1.1 - world.villain.position.z) * Math.min(1, delta * 2.4);
  world.villain.position.x += (world.player.position.x - world.villain.position.x) * Math.min(1, delta * 3.5);
  world.player.rotation.z = Math.sin(now * 0.01) * 0.08;
  world.player.position.x += Math.sin(now * 0.016) * 0.008;
  world.player.position.y = Math.max(0, Math.sin(now * 0.01) * 0.05);
  animateHumanoid(world.player, now, 0.18, false);
  animateVillain(world.villain, now, 0.5);
  camera.position.x += (world.player.position.x * 0.4 - camera.position.x) * Math.min(1, delta * 4);
  camera.position.y += (5.4 - camera.position.y) * Math.min(1, delta * 3);
  camera.position.z += (7.6 - camera.position.z) * Math.min(1, delta * 3);
  camera.lookAt(world.player.position.x * 0.15, 1.6, -1.2);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.033);
  const now = performance.now();
  if (gameMode === "playing" && !state.paused) {
    updateGame(delta);
  } else if (gameMode === "countdown") {
    updateIntroScene(delta, now);
  } else if (gameMode === "catching") {
    updateCatchScene(delta, now);
  } else if (!isGameplayMode()) {
    roadScroll(now);
    updateEnvironmentAnimations(now);
    if (world.player) {
      world.player.rotation.y += delta * 0.5;
      world.player.position.y = Math.sin(now * 0.002) * 0.08;
      animateHumanoid(world.player, now, 0.42, false);
    }
    if (world.villain) {
      world.villain.position.y = Math.sin(now * 0.002 + 0.5) * 0.04;
      animateVillain(world.villain, now, 0.42);
    }
    camera.position.x += (0 - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (5.8 - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z = 10.8;
    camera.lookAt(0, 1.6, -10);
  }
  renderer.render(scene, camera);
}

function animateHumanoid(actor, now, pace, sliding) {
  if (!actor?.userData?.parts) return;
  const p = actor.userData.parts;
  const t = now * 0.012 * pace;
  const armSwing = sliding ? 0.26 : 0.82;
  const legSwing = sliding ? 0.2 : 0.92;
  if (p.leftArm) p.leftArm.rotation.x = Math.sin(t) * armSwing;
  if (p.rightArm) p.rightArm.rotation.x = -Math.sin(t) * armSwing;
  if (p.leftForearm) p.leftForearm.rotation.x = Math.sin(t + 0.4) * 0.5;
  if (p.rightForearm) p.rightForearm.rotation.x = -Math.sin(t + 0.4) * 0.5;
  if (p.leftLeg) p.leftLeg.rotation.x = -Math.sin(t) * legSwing;
  if (p.rightLeg) p.rightLeg.rotation.x = Math.sin(t) * legSwing;
  if (p.leftShin) p.leftShin.rotation.x = Math.abs(Math.sin(t)) * 0.38;
  if (p.rightShin) p.rightShin.rotation.x = Math.abs(Math.sin(t + Math.PI)) * 0.38;
  if (p.hips) p.hips.position.y = sliding ? 0.55 : 0.84 + Math.abs(Math.sin(t)) * 0.06;
  if (p.torso) {
    p.torso.position.y = sliding ? 0.92 : (p.torso === p.hips ? 0.84 : 1.56 + Math.abs(Math.sin(t)) * 0.08);
    p.torso.rotation.x = sliding ? -0.72 : 0;
  }
  if (p.head) {
    p.head.position.y = sliding ? 1.84 : p.head.position.y > 2.6 ? 2.68 : p.head.position.y;
    p.head.rotation.x = sliding ? 0.3 : 0;
  }
  if (p.face) {
    p.face.position.y = sliding ? 1.85 : 2.68;
    p.face.rotation.x = sliding ? 0.3 : 0;
  }
}

function animateVillain(villain, now, pace) {
  if (!villain?.userData?.parts) return;
  animateHumanoid(villain, now, pace * 0.92, false);
  if (villain.userData.parts.gauntlet) villain.userData.parts.gauntlet.rotation.y += 0.06;
}

function getSelectedVillainName() {
  return VILLAIN_OPTIONS.find((villain) => villain.key === settings.selectedVillainKey)?.label
    || LEVELS[state.selectedLevel - 1]?.villainName
    || "Villain";
}

function roadScroll(now) {
  if (world.roadMaterial?.map) world.roadMaterial.map.offset.y = -(state.distance * 0.028 + now * 0.000005);
  if (world.groundMaterial?.map) world.groundMaterial.map.offset.y = -(state.distance * 0.012 + now * 0.000002);
}

function createRoadTexture(theme) {
  const [base, stripe, dash] = theme.road;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 1024);
  ctx.fillStyle = stripe;
  for (let y = 0; y < 1024; y += 48) ctx.fillRect(0, y, 256, 18);
  ctx.fillStyle = dash;
  ctx.shadowColor = dash;
  ctx.shadowBlur = 12;
  for (let y = 0; y < 1024; y += 88) ctx.fillRect(122, y + 8, 12, 44);
  ctx.shadowBlur = 0;
  const texture = new T.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.repeat.set(1, 18);
  texture.colorSpace = T.SRGBColorSpace;
  return texture;
}

function createGroundTexture(theme) {
  const [base, accent] = theme.ground;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 650; i += 1) {
    ctx.globalAlpha = 0.16 + Math.random() * 0.3;
    ctx.fillStyle = i % 2 === 0 ? accent : base;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 3 + Math.random() * 6, 3 + Math.random() * 8);
  }
  ctx.globalAlpha = 1;
  const texture = new T.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.repeat.set(22, 120);
  texture.colorSpace = T.SRGBColorSpace;
  return texture;
}

function triggerJump() {
  if (!state.canControl || gameMode !== "playing" || state.paused) return;
  if (performance.now() < state.flyingUntil) return;
  if (world.player.position.y <= 0.05 && performance.now() >= state.slidingUntil) {
    state.jumpV = 0.29;
    playEffect(audio.jump);
  }
}

function triggerSlide() {
  if (!state.canControl || gameMode !== "playing" || state.paused) return;
  if (world.player.position.y > 0.2) return;
  state.slidingUntil = performance.now() + 850;
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "enter") {
    event.preventDefault();
    if (gameMode === "playing" || gameMode === "paused") togglePause();
    else if (gameMode !== "story") startRun();
    return;
  }
  if (key === "escape" && gameMode === "story") {
    closeStoryModal();
    return;
  }
  if (key === "escape" || event.code === "Space") {
    event.preventDefault();
    togglePause();
    return;
  }
  if (!state.canControl || gameMode !== "playing" || state.paused) return;
  if (key === "arrowleft" || key === "a") state.lane = Math.max(-1, state.lane - 1);
  else if (key === "arrowright" || key === "d") state.lane = Math.min(1, state.lane + 1);
  else if (key === "arrowup" || key === "w") triggerJump();
  else if (key === "arrowdown" || key === "s") triggerSlide();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.characters = characters;
window.addCustomCharacter = function addCustomCharacter(name) {
  const cleaned = sanitizeName(name);
  if (!cleaned) return false;
  characters.push({ id: characters.length, name: cleaned, face: "face.png" });
  saveCustomCharacters();
  buildCharacterGrid();
  return true;
};

function addGlowShell(mesh, color, scale) {
  const glow = new T.Mesh(mesh.geometry.clone(), new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, side: T.BackSide, depthWrite: false, toneMapped: false }));
  glow.scale.setScalar(scale);
  mesh.add(glow);
}

function setShadowRecursive(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

function clearGroup(group) {
  while (group.children.length) {
    const child = group.children[0];
    group.remove(child);
    disposeObject(child);
  }
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
    else if (child.material) child.material.dispose();
  });
}

function laneX(index) {
  return lanePositions[index + 1] ?? 0;
}

function randomLane(avoidLane) {
  let lane = Math.floor(Math.random() * 3) - 1;
  if (typeof avoidLane === "number" && lane === avoidLane) lane = lane === 1 ? 0 : lane + 1;
  return lane;
}

function sanitizeName(value) {
  return value.replace(/[^a-z0-9 _-]/gi, "").trim().slice(0, 18) || "Brindavan Hero";
}

function isGameplayMode() {
  return gameMode === "playing" || gameMode === "paused" || gameMode === "countdown";
}

function formatTime(seconds) {
  return `${seconds.toFixed(1)}s`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
