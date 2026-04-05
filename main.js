import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

// ===== GAME STATE =====
let gameState = "home"; // home, menu, playing, paused, gameOver
let currentTheme = "road";
let currentLevel = 1;
let selectedCharacterIndex = 0;
let selectedMusicIndex = 0;
let isMuted = false;
let isPaused = false;
let gameScore = 0;
let shieldActive = false;
let boostActive = false;

// ===== CHARACTER MANAGEMENT =====
const characters = [
  { name: "Uzair Baloch", emoji: "😊", color: 0x4CAF50, faceUrl: "face.png" },
  { name: "Lassi", emoji: "😎", color: 0x2196F3, faceUrl: "face2.png" },
  { name: "Mallu", emoji: "🤩", color: 0xFF9800, faceUrl: "face3.png" },
  { name: "MAMA", emoji: "🥸", color: 0x9C27B0, faceUrl: "face4.png" },
  { name: "ChinnaPrad", emoji: "😍", color: 0xFF1493, faceUrl: "face5.png" },
  { name: "PeddaPrad", emoji: "😀", color: 0xF39C12, faceUrl: "face6.png" },
  { name: "Lagamer League", emoji: "😄", color: 0x2ECC71, faceUrl: "face7.png" },
  { name: "Mangaking", emoji: "😎", color: 0x3498DB, faceUrl: "face8.png" },
  { name: "Pandu", emoji: "🤠", color: 0x9B59B6, faceUrl: "face9.png" },
  { name: "Kala", emoji: "🥳", color: 0xE74C3C, faceUrl: "face10.png" },
  { name: "Harry Putra", emoji: "🧙‍♂️", color: 0x8E44AD, faceUrl: "face11.png" },
  { name: "Yawn", emoji: "🤖", color: 0x607D8B, faceUrl: "face12.png" },
  { name: "OM CORE", emoji: "👻", color: 0xFFFFFF, faceUrl: "face13.png" },
  { name: "AMARA", emoji: "🦸‍♂️", color: 0xE67E22, faceUrl: "face14.png" },
  { name: "Harinesh", emoji: "🐲", color: 0x1ABC9C, faceUrl: "face15.png" },
];

const enemyFaces = ["😈", "👹", "🤖", "👾", "🎃"];
const barrierImages = ["hen.png", "chick.png", "duck.png", "cat.png"];

const musicTracks = [
  { id: "track1", label: "Original", src: "music.mp3" },
  { id: "track2", label: "Electro", src: "electro.mp3" },
  { id: "track3", label: "Chill", src: "chill.mp3" },
  { id: "track4", label: "Retro", src: "retro.mp3" },
  { id: "track5", label: "Synth", src: "synth.mp3" },
  { id: "track6", label: "Festival", src: "festival.mp3" },
];

const faceTextures = {};
const textureLoader = new THREE.TextureLoader();
function loadCharacterTextures() {
  ["face.png", "face2.png", "face3.png", "face4.png", "face5.png", "face6.png", "face7.png", "face8.png", "face9.png", "face10.png", "face11.png", "face12.png", "face13.png", "face14.png", "face15.png"].forEach((url) => {
    textureLoader.load(
      url,
      (texture) => {
        faceTextures[url] = texture;
      },
      undefined,
      () => {
        console.warn(`Could not load character texture: ${url}`);
      }
    );
  });
}

// Load custom characters from localStorage
function loadCustomCharacters() {
  const stored = localStorage.getItem("ubbaCharacters");
  if (stored) {
    try {
      const custom = JSON.parse(stored);
      characters.push(...custom);
    } catch (e) {
      console.log("Could not load custom characters");
    }
  }
}
loadCustomCharacters();
loadCharacterTextures();

function addCustomCharacter(name, emoji) {
  if (characters.length < 50) {
    const newChar = { name, emoji, color: Math.random() * 0xffffff };
    characters.push(newChar);
    localStorage.setItem("ubbaCharacters", JSON.stringify(characters.slice(5)));
    return true;
  }
  return false;
}

// ===== AUDIO MANAGEMENT =====
const bgMusic = document.getElementById("bgMusic");
const voice1Audio = document.getElementById("voice1");
const voice2Audio = document.getElementById("voice2");
const runSound = document.getElementById("runSound");
const coinSound = document.getElementById("coinSound");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");
const levelupSound = document.getElementById("levelupSound");
const failSound = document.getElementById("failSound");

bgMusic.volume = 0.5;
voice1Audio.volume = 0.7;
voice2Audio.volume = 0.7;
runSound.volume = 1.0;
coinSound.volume = 1.0;
jumpSound.volume = 1.0;
hitSound.volume = 0.6;
levelupSound.volume = 1.0;
failSound.volume = 1.0;

function toggleMute() {
  isMuted = !isMuted;
  if (isMuted) {
    stopAllAudio();
  } else {
    if (gameState === "playing") {
      bgMusic.play().catch(() => {});
      if (!player.jumping && Math.abs(player.velocity.x) > 0.05) {
        runSound.play().catch(() => {});
      }
    }
  }
  updateMuteButton();
}

let effectResumeTimeout = null;

function stopAllAudio(except = null) {
  const audios = [bgMusic, voice1Audio, voice2Audio, runSound, coinSound, jumpSound, hitSound, levelupSound, failSound];
  audios.forEach((audio) => {
    if (!audio || audio === except) return;
    audio.pause();
    if (audio !== bgMusic) {
      audio.currentTime = 0;
    }
  });
}

function playAudioEffect(audio, { reset = true, playbackRate = 1.0, resumeMainAfter = 800 } = {}) {
  if (!audio || isMuted) return;
  const wasBgPlaying = !bgMusic.paused;
  stopAllAudio(audio);
  audio.playbackRate = playbackRate;
  if (reset) audio.currentTime = 0;
  audio.play().catch(() => {});
  if (wasBgPlaying && resumeMainAfter > 0) {
    if (effectResumeTimeout) {
      clearTimeout(effectResumeTimeout);
    }
    effectResumeTimeout = setTimeout(() => {
      effectResumeTimeout = null;
      if (!isMuted && gameState === "playing") {
        bgMusic.play().catch(() => {});
      }
    }, resumeMainAfter);
  }
}

function playLostSound() {
  if (!isMuted) {
    playAudioEffect(failSound, { reset: true, playbackRate: 1.0, resumeMainAfter: 0 });
  }
}

// ===== 3D SCENE SETUP =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// ===== PLAYER =====
let player = {
  mesh: null,
  position: { x: 0, y: 1, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  jumping: false,
  speed: 0.15,
  jumpForce: 0.3,
  immuneTime: 0,
  runningPhase: 0,
  parts: {},
};

function createPlayer() {
  if (player.mesh) scene.remove(player.mesh);

  const selectedCharacter = characters[selectedCharacterIndex];
  player.mesh = new THREE.Group();
  player.mesh.position.set(player.position.x, player.position.y, player.position.z);

  const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.45, 1.0, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: selectedCharacter.color,
    metalness: 0.5,
    roughness: 0.5,
  });
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyMesh.position.y = 0.7;
  player.mesh.add(bodyMesh);

  const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.7,
  });
  const headMesh = new THREE.Mesh(headGeometry, headMaterial);
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  headMesh.position.y = 1.5;
  player.mesh.add(headMesh);

  const armGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
  const armMaterial = new THREE.MeshStandardMaterial({
    color: selectedCharacter.color,
    metalness: 0.3,
    roughness: 0.7,
  });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  leftArm.castShadow = true;
  leftArm.position.set(-0.45, 1.1, 0);
  player.mesh.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.set(0.45, 1.1, 0);
  player.mesh.add(rightArm);

  const legGeometry = new THREE.BoxGeometry(0.18, 0.7, 0.18);
  const leftLeg = new THREE.Mesh(legGeometry, armMaterial);
  leftLeg.castShadow = true;
  leftLeg.position.set(-0.18, 0.1, 0);
  player.mesh.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.set(0.18, 0.1, 0);
  player.mesh.add(rightLeg);

  const faceGeometry = new THREE.PlaneGeometry(0.9, 0.9);
  let faceMaterial;

  if (selectedCharacter.faceUrl && faceTextures[selectedCharacter.faceUrl]) {
    faceMaterial = new THREE.MeshStandardMaterial({
      map: faceTextures[selectedCharacter.faceUrl],
      side: THREE.FrontSide,
      depthTest: false,
      depthWrite: false,
      opacity: 1,
    });
  } else {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 128, 128);
    ctx.font = "80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(selectedCharacter.emoji, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    faceMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.FrontSide,
      depthTest: false,
      depthWrite: false,
      opacity: 1,
    });
  }

  const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
  faceMesh.position.set(0, 1.5, 0.62);
  faceMesh.rotation.y = Math.PI;
  faceMesh.renderOrder = 1;
  player.mesh.add(faceMesh);

  player.parts = {
    body: bodyMesh,
    head: headMesh,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    face: faceMesh,
  };

  player.velocity = { x: 0, y: 0, z: 0 };
  player.position = { x: 0, y: 1, z: 0 };
  player.jumping = false;
  player.runningPhase = 0;
  scene.add(player.mesh);
}

// ===== RICH MAN (CHASER) =====
let richMan = {
  mesh: null,
  parts: {},
  position: { x: 0, y: 1, z: -10 },
  runPhase: 0,
  catchPhase: 0,
  catching: false,
  catchProgress: 0,
};

function createRichMan() {
  if (richMan.mesh) scene.remove(richMan.mesh);
  richMan.mesh = new THREE.Group();
  richMan.catching = false;
  richMan.catchProgress = 0;
  richMan.runPhase = 0;

  // ---- Suit body (dark navy) ----
  const suitMat = new THREE.MeshStandardMaterial({ color: 0x1A237E, roughness: 0.7, metalness: 0.1 });
  const bodyGeo = new THREE.CylinderGeometry(0.38, 0.48, 1.05, 16);
  const body = new THREE.Mesh(bodyGeo, suitMat);
  body.position.y = 0.72;
  body.castShadow = true;
  richMan.mesh.add(body);

  // Suit lapels (white shirt strip)
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.8 });
  const shirtGeo = new THREE.BoxGeometry(0.18, 0.7, 0.42);
  const shirt = new THREE.Mesh(shirtGeo, shirtMat);
  shirt.position.set(0, 0.78, 0.35);
  richMan.mesh.add(shirt);

  // Gold buttons
  const btnMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.9, roughness: 0.2 });
  for (let i = 0; i < 3; i++) {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), btnMat);
    btn.position.set(0, 1.05 - i * 0.22, 0.44);
    richMan.mesh.add(btn);
  }

  // ---- Head ----
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xF5CBA7, roughness: 0.8 });
  const headGeo = new THREE.SphereGeometry(0.34, 16, 16);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 1.58;
  head.castShadow = true;
  richMan.mesh.add(head);

  // Rosy cheeks
  const cheekMat = new THREE.MeshStandardMaterial({ color: 0xFF8888, roughness: 1.0, transparent: true, opacity: 0.6 });
  [-0.2, 0.2].forEach(x => {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), cheekMat);
    cheek.position.set(x, 1.54, 0.3);
    richMan.mesh.add(cheek);
  });

  // Angry eyebrows (tilted boxes)
  const browMat = new THREE.MeshStandardMaterial({ color: 0x3A2010, roughness: 1.0 });
  [-0.13, 0.13].forEach((x, i) => {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.05), browMat);
    brow.position.set(x, 1.72, 0.31);
    brow.rotation.z = i === 0 ? 0.35 : -0.35;
    richMan.mesh.add(brow);
  });

  // Eyes (white + dark pupil)
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  [-0.13, 0.13].forEach(x => {
    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), eyeWhiteMat);
    eyeWhite.position.set(x, 1.62, 0.3);
    richMan.mesh.add(eyeWhite);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.038, 6, 6), pupilMat);
    pupil.position.set(x, 1.62, 0.365);
    richMan.mesh.add(pupil);
  });

  // Monocle (right eye)
  const monocleMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.9, roughness: 0.2, wireframe: false });
  const monocleRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.015, 8, 20),
    monocleMat
  );
  monocleRing.position.set(0.13, 1.62, 0.37);
  richMan.mesh.add(monocleRing);

  // Moustache
  const moustacheMat = new THREE.MeshStandardMaterial({ color: 0x5C3A1A, roughness: 1.0 });
  const mLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.18, 8), moustacheMat);
  mLeft.rotation.z = 0.6;
  mLeft.position.set(-0.1, 1.5, 0.33);
  richMan.mesh.add(mLeft);
  const mRight = mLeft.clone();
  mRight.position.set(0.1, 1.5, 0.33);
  mRight.rotation.z = -0.6;
  richMan.mesh.add(mRight);

  // ---- Top hat ----
  const hatMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7, metalness: 0.2 });
  const brimGeo = new THREE.CylinderGeometry(0.52, 0.54, 0.08, 16);
  const brim = new THREE.Mesh(brimGeo, hatMat);
  brim.position.y = 1.92;
  richMan.mesh.add(brim);
  const crownGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.62, 16);
  const crown = new THREE.Mesh(crownGeo, hatMat);
  crown.position.y = 2.22;
  crown.castShadow = true;
  richMan.mesh.add(crown);
  // Gold hat band
  const bandGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.1, 16);
  const band = new THREE.Mesh(bandGeo, btnMat);
  band.position.y = 1.97;
  richMan.mesh.add(band);

  // ---- Arms ----
  const armMat = new THREE.MeshStandardMaterial({ color: 0x1A237E, roughness: 0.7 });
  const armGeo = new THREE.BoxGeometry(0.15, 0.62, 0.15);
  const leftArm = new THREE.Mesh(armGeo, armMat);
  leftArm.position.set(-0.5, 1.1, 0);
  leftArm.castShadow = true;
  richMan.mesh.add(leftArm);
  const rightArm = new THREE.Mesh(armGeo, armMat);
  rightArm.position.set(0.5, 1.1, 0);
  rightArm.castShadow = true;
  richMan.mesh.add(rightArm);

  // ---- Money bag (right hand) ----
  const bagMat = new THREE.MeshStandardMaterial({ color: 0xDDB840, metalness: 0.3, roughness: 0.6 });
  const bagGeo = new THREE.SphereGeometry(0.22, 12, 10);
  const bag = new THREE.Mesh(bagGeo, bagMat);
  bag.scale.set(1, 1.2, 1);
  bag.position.set(0.62, 0.72, 0);
  richMan.mesh.add(bag);
  // $ sign on bag using canvas texture
  const bagCanvas = document.createElement("canvas");
  bagCanvas.width = 64; bagCanvas.height = 64;
  const bagCtx = bagCanvas.getContext("2d");
  bagCtx.fillStyle = "#DDB840";
  bagCtx.fillRect(0, 0, 64, 64);
  bagCtx.fillStyle = "#333";
  bagCtx.font = "bold 40px Arial";
  bagCtx.textAlign = "center";
  bagCtx.textBaseline = "middle";
  bagCtx.fillText("$", 32, 32);
  const bagTex = new THREE.CanvasTexture(bagCanvas);
  const bagLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.28, 0.28),
    new THREE.MeshStandardMaterial({ map: bagTex, transparent: true, depthTest: false })
  );
  bagLabel.position.set(0.62, 0.72, 0.23);
  bagLabel.renderOrder = 1;
  richMan.mesh.add(bagLabel);

  // ---- Cane (left hand) ----
  const caneMat = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.6, metalness: 0.3 });
  const caneGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8);
  const cane = new THREE.Mesh(caneGeo, caneMat);
  cane.position.set(-0.62, 0.45, 0);
  cane.rotation.z = 0.15;
  richMan.mesh.add(cane);
  const caneTopGeo = new THREE.TorusGeometry(0.1, 0.03, 8, 12, Math.PI);
  const caneTop = new THREE.Mesh(caneTopGeo, btnMat);
  caneTop.position.set(-0.65, 1.25, 0);
  caneTop.rotation.z = Math.PI / 2;
  richMan.mesh.add(caneTop);

  // ---- Legs ----
  const legMat = new THREE.MeshStandardMaterial({ color: 0x111133, roughness: 0.8 });
  const legGeo = new THREE.BoxGeometry(0.2, 0.7, 0.2);
  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.18, 0.12, 0);
  leftLeg.castShadow = true;
  richMan.mesh.add(leftLeg);
  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.18, 0.12, 0);
  rightLeg.castShadow = true;
  richMan.mesh.add(rightLeg);

  // Shoes
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1A0A00, roughness: 0.6, metalness: 0.3 });
  [-0.18, 0.18].forEach(x => {
    const shoeGeo = new THREE.BoxGeometry(0.25, 0.14, 0.38);
    const shoe = new THREE.Mesh(shoeGeo, shoeMat);
    shoe.position.set(x, -0.28, 0.1);
    richMan.mesh.add(shoe);
  });

  richMan.parts = { body, head, leftArm, rightArm, leftLeg, rightLeg, crown, brim };

  // Start far behind player
  richMan.position = { x: 0, y: 1, z: player.position.z - 12 };
  richMan.mesh.position.set(richMan.position.x, richMan.position.y, richMan.position.z);
  richMan.mesh.rotation.y = Math.PI; // face forward (toward player)
  scene.add(richMan.mesh);
}

function updateRichMan() {
  if (!richMan.mesh || gameState !== "playing") return;

  const t = Date.now() * 0.001;
  const targetGap = 8 + Math.max(0, 10 - currentLevel * 0.8); // gets closer at higher levels
  const targetZ = player.position.z - targetGap;

  if (!richMan.catching) {
    // Smoothly chase player
    const chaseSpeed = currentLevelConfig.speed * 0.55 + (richMan.position.z < targetZ ? 0.04 : 0);
    richMan.position.z += (targetZ - richMan.position.z) * 0.025 + chaseSpeed * 0.4;
    richMan.position.x += (player.position.x - richMan.position.x) * 0.04;
    richMan.position.y = 1;

    // Running animation
    richMan.runPhase += 0.18;
    const bob = Math.sin(richMan.runPhase) * 0.07;
    if (richMan.parts.body) richMan.parts.body.position.y = 0.72 + bob;
    if (richMan.parts.head) richMan.parts.head.position.y = 1.58 + bob;
    if (richMan.parts.crown) richMan.parts.crown.position.y = 2.22 + bob;
    if (richMan.parts.brim) richMan.parts.brim.position.y = 1.92 + bob;
    if (richMan.parts.leftArm) richMan.parts.leftArm.rotation.x = Math.sin(richMan.runPhase) * 0.9;
    if (richMan.parts.rightArm) richMan.parts.rightArm.rotation.x = -Math.sin(richMan.runPhase) * 0.9;
    if (richMan.parts.leftLeg) richMan.parts.leftLeg.rotation.x = -Math.sin(richMan.runPhase) * 0.9;
    if (richMan.parts.rightLeg) richMan.parts.rightLeg.rotation.x = Math.sin(richMan.runPhase) * 0.9;

    // Danger proximity warning — red tint on screen
    const dist = player.position.z - richMan.position.z;
    const dangerEl = document.getElementById("dangerWarning");
    if (dangerEl) {
      if (dist < 5) {
        const intensity = Math.max(0, 1 - dist / 5);
        dangerEl.style.opacity = intensity * 0.5;
        dangerEl.style.boxShadow = `inset 0 0 ${80 * intensity}px rgba(255,0,0,${intensity * 0.7})`;
      } else {
        dangerEl.style.opacity = 0;
      }
    }
  } else {
    // CATCH ANIMATION — lunge forward at player
    richMan.catchProgress += 0.035;
    const cp = Math.min(richMan.catchProgress, 1);
    richMan.position.z = richMan.position.z + (player.position.z - richMan.position.z) * cp * 0.12;
    richMan.position.y = 1 + Math.sin(cp * Math.PI) * 0.6;
    richMan.position.x += (player.position.x - richMan.position.x) * 0.15;
    // Arms reach forward
    if (richMan.parts.leftArm) richMan.parts.leftArm.rotation.x = -Math.PI * 0.6 * cp;
    if (richMan.parts.rightArm) richMan.parts.rightArm.rotation.x = -Math.PI * 0.6 * cp;
    // Body lean forward
    if (richMan.mesh) richMan.mesh.rotation.x = cp * 0.5;
  }

  richMan.mesh.position.set(richMan.position.x, richMan.position.y, richMan.position.z);
}

function triggerRichManCatch() {
  if (!richMan.mesh) return;
  richMan.catching = true;
  richMan.catchProgress = 0;
}

// ===== OBSTACLES =====
let obstacles = [];

function createObstacle(z, enemyType = null) {
  const imageFile = enemyType || barrierImages[Math.floor(Math.random() * barrierImages.length)];
  const obstacle = new THREE.Group();
  obstacle.castShadow = true;
  obstacle.receiveShadow = true;

  const bodyGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.4);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.8,
  });
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyMesh.position.y = 0.45;
  obstacle.add(bodyMesh);

  const texture = textureLoader.load(`barriers/${imageFile}`);
  const imageMaterial = new THREE.MeshStandardMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const imageGeometry = new THREE.PlaneGeometry(1.6, 1.6);
  const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
  imageMesh.position.set(0, 0.85, 0.25);
  imageMesh.rotation.y = Math.PI;
  obstacle.add(imageMesh);

  const lanePositions = [-1.6, -0.8, 0.8, 1.6];
  const xPos = lanePositions[Math.floor(Math.random() * lanePositions.length)] + (Math.random() * 0.2 - 0.1);
  obstacle.position.set(xPos, 0, z);
  obstacle.userData = { floatOffset: Math.random() * Math.PI * 2 };

  scene.add(obstacle);
  obstacles.push({
    mesh: obstacle,
    z: z,
    collected: false,
  });
}

// ===== COINS =====
let coins = [];

function createCoin(z, x = null) {
  const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 0.8,
    roughness: 0.2,
  });
  const coin = new THREE.Mesh(geometry, material);
  coin.castShadow = true;
  const height = 0.9 + Math.random() * 0.3;
  coin.position.set(x !== null ? x : (Math.random() - 0.5) * 2, height, z);
  coin.userData = { floatOffset: Math.random() * Math.PI * 2, baseHeight: height };
  coin.rotation.x = Math.PI / 2;

  scene.add(coin);
  coins.push({
    mesh: coin,
    z: z,
    collected: false,
    rotation: 0,
  });
}

// ===== POWERUPS =====
let powerups = [];

function createPowerup(z, type = null) {
  const types = ["boost", "shield"];
  const selectedType = type || types[Math.floor(Math.random() * types.length)];

  const geometry = new THREE.OctahedronGeometry(0.4, 2);
  const color = selectedType === "boost" ? 0xFF6B6B : 0x4ECDC4;
  const material = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.6,
    roughness: 0.3,
    emissive: color,
    emissiveIntensity: 0.5,
  });
  const powerup = new THREE.Mesh(geometry, material);
  powerup.castShadow = true;
  const height = 0.9 + Math.random() * 0.3;
  powerup.position.set((Math.random() - 0.5) * 2, height, z);
  powerup.userData = { floatOffset: Math.random() * Math.PI * 2, baseHeight: height };

  scene.add(powerup);
  powerups.push({
    mesh: powerup,
    z: z,
    type: selectedType,
    collected: false,
    rotation: 0,
  });
}

let preserveScore = false;

// ===== LEVEL CONFIGURATION =====
const levelConfig = {
  1: { obstacleSpaceDifficulty: 6, speed: 0.08, hazardFreq: 0.3, powerupFreq: 0.15 },
  2: { obstacleSpaceDifficulty: 5, speed: 0.09, hazardFreq: 0.35, powerupFreq: 0.14 },
  3: { obstacleSpaceDifficulty: 4.5, speed: 0.1, hazardFreq: 0.4, powerupFreq: 0.13 },
  4: { obstacleSpaceDifficulty: 4, speed: 0.11, hazardFreq: 0.45, powerupFreq: 0.12 },
  5: { obstacleSpaceDifficulty: 3.5, speed: 0.12, hazardFreq: 0.5, powerupFreq: 0.11 },
  6: { obstacleSpaceDifficulty: 3.2, speed: 0.13, hazardFreq: 0.55, powerupFreq: 0.1 },
  7: { obstacleSpaceDifficulty: 3, speed: 0.14, hazardFreq: 0.6, powerupFreq: 0.09 },
  8: { obstacleSpaceDifficulty: 2.8, speed: 0.15, hazardFreq: 0.65, powerupFreq: 0.08 },
  9: { obstacleSpaceDifficulty: 2.5, speed: 0.16, hazardFreq: 0.7, powerupFreq: 0.07 },
  10: { obstacleSpaceDifficulty: 2, speed: 0.18, hazardFreq: 0.8, powerupFreq: 0.06 },
};

let currentLevelConfig = levelConfig[1];

// ===== SCENE SETUP =====
function setupScene() {
  scene.clear();
  obstacles = [];
  coins = [];
  powerups = [];

  scene.add(ambientLight);
  scene.add(directionalLight);

  if (currentTheme === "road") {
    setupRoadTheme();
  } else if (currentTheme === "riverside") {
    setupRiversideTheme();
  } else if (currentTheme === "college") {
    setupCollegeTheme();
  } else if (currentTheme === "forest") {
    setupForestTheme();
  }

  createPlayer();

  // Pre-create obstacles and pickups over a longer track for a more engaging level
  for (let i = 15; i < 350; i += currentLevelConfig.obstacleSpaceDifficulty) {
    if (Math.random() < currentLevelConfig.hazardFreq) {
      createObstacle(i);
    }
    if (Math.random() < currentLevelConfig.powerupFreq) {
      createPowerup(i + 0.5);
    } else if (Math.random() < 0.5) {
      createCoin(i + 0.5);
    }
  }
}

// ===== THEME: ROAD =====
function setupRoadTheme() {
  // Bright daytime sky
  scene.background = new THREE.Color(0x87CEEB);
  scene.fog = new THREE.FogExp2(0xC9E8F5, 0.008);

  // Sunlight warmth
  directionalLight.color.set(0xFFF8E7);
  directionalLight.intensity = 1.1;
  ambientLight.color.set(0xD0E8FF);
  ambientLight.intensity = 0.7;

  // Asphalt road
  const roadGeo = new THREE.PlaneGeometry(6, 1000);
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.95, metalness: 0.0 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.receiveShadow = true;
  scene.add(road);

  // Road lane dividers (dashed white lines)
  for (let z = -490; z < 500; z += 8) {
    const dashGeo = new THREE.PlaneGeometry(0.15, 3.5);
    const dashMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.5 });
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.01, z);
    scene.add(dash);
    // Second divider
    const dash2 = dash.clone();
    dash2.position.set(-2, 0.01, z);
    scene.add(dash2);
    const dash3 = dash.clone();
    dash3.position.set(2, 0.01, z);
    scene.add(dash3);
  }

  // Sidewalks on each side
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0xBBAA99, roughness: 0.9 });
  [-4.5, 4.5].forEach(xPos => {
    const swGeo = new THREE.PlaneGeometry(3, 1000);
    const sw = new THREE.Mesh(swGeo, sidewalkMat);
    sw.rotation.x = -Math.PI / 2;
    sw.position.set(xPos, 0.02, 0);
    sw.receiveShadow = true;
    scene.add(sw);
  });

  // Curbs
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.8 });
  [-3.1, 3.1].forEach(xPos => {
    const curbGeo = new THREE.BoxGeometry(0.25, 0.18, 1000);
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(xPos, 0.09, 0);
    curb.castShadow = true;
    curb.receiveShadow = true;
    scene.add(curb);
  });

  // Street lamps along the road
  for (let z = 10; z < 350; z += 18) {
    [-3.8, 3.8].forEach(xPos => {
      const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 4.5, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x555566, metalness: 0.7, roughness: 0.3 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(xPos, 2.25, z);
      pole.castShadow = true;
      scene.add(pole);

      const armGeo = new THREE.BoxGeometry(0.06, 0.06, 0.8);
      const arm = new THREE.Mesh(armGeo, poleMat);
      arm.position.set(xPos > 0 ? xPos - 0.4 : xPos + 0.4, 4.5, z);
      scene.add(arm);

      const lampGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const lampMat = new THREE.MeshStandardMaterial({ color: 0xFFFF99, emissive: 0xFFFF66, emissiveIntensity: 1.2 });
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(xPos > 0 ? xPos - 0.4 : xPos + 0.4, 4.62, z);
      scene.add(lamp);
    });
  }

  // Roadside buildings
  const buildingColors = [0xE8D5B7, 0xC8B89A, 0xB0C4D4, 0xD4C4A8, 0xAAB8C8];
  for (let z = 5; z < 350; z += 14) {
    [-6.5, 7.5].forEach((xPos, side) => {
      const w = 3 + Math.random() * 2;
      const h = 3 + Math.random() * 6;
      const d = 3 + Math.random() * 2;
      const bGeo = new THREE.BoxGeometry(w, h, d);
      const bMat = new THREE.MeshStandardMaterial({
        color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
        roughness: 0.85,
      });
      const building = new THREE.Mesh(bGeo, bMat);
      building.position.set(xPos + (side === 0 ? -Math.random() : Math.random()), h / 2, z + Math.random() * 5);
      building.castShadow = true;
      building.receiveShadow = true;
      scene.add(building);

      // Windows
      const winMat = new THREE.MeshStandardMaterial({ color: 0x88CCFF, emissive: 0x224466, emissiveIntensity: 0.4 });
      for (let wy = 1; wy < h - 1; wy += 1.4) {
        const winGeo = new THREE.PlaneGeometry(0.5, 0.6);
        const win = new THREE.Mesh(winGeo, winMat);
        win.position.set(building.position.x + (side === 0 ? w / 2 + 0.01 : -w / 2 - 0.01), wy, building.position.z);
        win.rotation.y = side === 0 ? Math.PI / 2 : -Math.PI / 2;
        scene.add(win);
      }
    });
  }

  // Road signs
  for (let z = 20; z < 350; z += 40) {
    const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 });
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.set(3.5, 1.25, z);
    scene.add(post);
    const signGeo = new THREE.BoxGeometry(1.2, 0.6, 0.08);
    const signMat = new THREE.MeshStandardMaterial({ color: 0x228822, roughness: 0.6 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(3.5, 2.8, z);
    scene.add(sign);
  }

  // Sky clouds (simple box clusters)
  for (let i = 0; i < 25; i++) {
    const cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 1.0 });
    for (let c = 0; c < 4; c++) {
      const cGeo = new THREE.SphereGeometry(0.8 + Math.random() * 0.8, 8, 6);
      const cMesh = new THREE.Mesh(cGeo, cloudMat);
      cMesh.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 2);
      cloudGroup.add(cMesh);
    }
    cloudGroup.position.set((Math.random() - 0.5) * 30, 12 + Math.random() * 5, Math.random() * 350);
    scene.add(cloudGroup);
  }
}

// ===== THEME: RIVERSIDE =====
function setupRiversideTheme() {
  scene.background = new THREE.Color(0x4A9ECC);
  scene.fog = new THREE.FogExp2(0x88CCE8, 0.007);

  directionalLight.color.set(0xFFEEDD);
  directionalLight.intensity = 0.9;
  ambientLight.color.set(0xAADDFF);
  ambientLight.intensity = 0.8;

  // Stone/dirt path
  const pathGeo = new THREE.PlaneGeometry(5, 1000);
  const pathMat = new THREE.MeshStandardMaterial({ color: 0xC8A97A, roughness: 0.95 });
  const path = new THREE.Mesh(pathGeo, pathMat);
  path.rotation.x = -Math.PI / 2;
  path.receiveShadow = true;
  scene.add(path);

  // Stepping stones on path
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0xAAA090, roughness: 0.9 });
  for (let z = 5; z < 350; z += 3.5) {
    const sGeo = new THREE.CylinderGeometry(0.4 + Math.random() * 0.3, 0.45 + Math.random() * 0.2, 0.12, 7);
    const stone = new THREE.Mesh(sGeo, stoneMat);
    stone.position.set((Math.random() - 0.5) * 3, 0.06, z);
    stone.rotation.y = Math.random() * Math.PI;
    stone.receiveShadow = true;
    stone.castShadow = true;
    scene.add(stone);
  }

  // River (left side) — animated shimmer via emissive
  const riverGeo = new THREE.PlaneGeometry(8, 1000);
  const riverMat = new THREE.MeshStandardMaterial({
    color: 0x1A6FAF,
    metalness: 0.3,
    roughness: 0.15,
    emissive: 0x0A3F6F,
    emissiveIntensity: 0.4,
  });
  const river = new THREE.Mesh(riverGeo, riverMat);
  river.rotation.x = -Math.PI / 2;
  river.position.set(-6.5, -0.05, 0);
  scene.add(river);

  // River bank edge (sandy slope)
  const bankGeo = new THREE.BoxGeometry(1.5, 0.35, 1000);
  const bankMat = new THREE.MeshStandardMaterial({ color: 0xD4B483, roughness: 0.9 });
  const bank = new THREE.Mesh(bankGeo, bankMat);
  bank.position.set(-3, 0.07, 0);
  bank.receiveShadow = true;
  scene.add(bank);

  // Reeds / tall grass on river bank
  for (let z = 2; z < 350; z += 2.5) {
    for (let r = 0; r < 3; r++) {
      const reedGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2 + Math.random() * 0.8, 5);
      const reedMat = new THREE.MeshStandardMaterial({ color: 0x7A9A3A, roughness: 1.0 });
      const reed = new THREE.Mesh(reedGeo, reedMat);
      reed.position.set(-3.2 - Math.random() * 1.5, 0.7, z + Math.random() * 2);
      reed.rotation.z = (Math.random() - 0.5) * 0.3;
      reed.castShadow = true;
      scene.add(reed);
      // Reed head
      const headGeo = new THREE.CylinderGeometry(0.09, 0.04, 0.3, 6);
      const headMat = new THREE.MeshStandardMaterial({ color: 0x5A3A1A, roughness: 1.0 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(reed.position.x, reed.position.y + 0.75, reed.position.z);
      scene.add(head);
    }
  }

  // Trees on right side
  for (let z = 5; z < 350; z += 7 + Math.random() * 4) {
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.5, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6B4423, roughness: 1.0 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(4.5 + Math.random() * 2, 1.25, z);
    trunk.castShadow = true;
    scene.add(trunk);

    const foliageColors = [0x2D7A1F, 0x3A9030, 0x1F6B18, 0x4AA033];
    const fCol = foliageColors[Math.floor(Math.random() * foliageColors.length)];
    for (let layer = 0; layer < 3; layer++) {
      const fGeo = new THREE.ConeGeometry(1.3 - layer * 0.2, 1.4, 8);
      const fMat = new THREE.MeshStandardMaterial({ color: fCol, roughness: 0.9 });
      const foliage = new THREE.Mesh(fGeo, fMat);
      foliage.position.set(trunk.position.x, 2.5 + layer * 1.0, trunk.position.z);
      foliage.castShadow = true;
      scene.add(foliage);
    }
  }

  // Wooden bridge planks across path
  const plankMat = new THREE.MeshStandardMaterial({ color: 0x8B6340, roughness: 0.95 });
  for (let z = 80; z < 100; z += 0.7) {
    const plankGeo = new THREE.BoxGeometry(5.2, 0.12, 0.55);
    const plank = new THREE.Mesh(plankGeo, plankMat);
    plank.position.set(0, 0.1, z);
    plank.receiveShadow = true;
    plank.castShadow = true;
    scene.add(plank);
  }
  // Bridge railings
  const railMat = new THREE.MeshStandardMaterial({ color: 0x5C3D1A, roughness: 0.9 });
  for (let z = 80; z <= 100; z += 5) {
    [-2.7, 2.7].forEach(xPos => {
      const postGeo = new THREE.BoxGeometry(0.12, 1.1, 0.12);
      const post = new THREE.Mesh(postGeo, railMat);
      post.position.set(xPos, 0.65, z);
      post.castShadow = true;
      scene.add(post);
    });
  }
  const railGeo = new THREE.BoxGeometry(0.1, 0.1, 22);
  [-2.7, 2.7].forEach(xPos => {
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.position.set(xPos, 1.15, 90);
    scene.add(rail);
  });

  // Lily pads on river
  const padMat = new THREE.MeshStandardMaterial({ color: 0x3A8A20, roughness: 0.9 });
  for (let i = 0; i < 20; i++) {
    const padGeo = new THREE.CylinderGeometry(0.4 + Math.random() * 0.3, 0.4, 0.05, 12);
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(-5 - Math.random() * 4, 0.0, Math.random() * 350);
    scene.add(pad);
  }

  // Sunset-style horizon glow
  const skyGeo = new THREE.PlaneGeometry(200, 60);
  const skyMat = new THREE.MeshStandardMaterial({ color: 0x88BBDD, roughness: 1.0, side: THREE.BackSide });
  const skyPlane = new THREE.Mesh(skyGeo, skyMat);
  skyPlane.position.set(0, 20, 200);
  scene.add(skyPlane);
}

// ===== THEME: COLLEGE =====
function setupCollegeTheme() {
  scene.background = new THREE.Color(0x98D4F0);
  scene.fog = new THREE.FogExp2(0xB0DCF0, 0.007);

  directionalLight.color.set(0xFFFDF0);
  directionalLight.intensity = 1.0;
  ambientLight.color.set(0xCCEEFF);
  ambientLight.intensity = 0.75;

  // Concrete pathway
  const pathGeo = new THREE.PlaneGeometry(6, 1000);
  const pathMat = new THREE.MeshStandardMaterial({ color: 0xD8CFC0, roughness: 0.95, metalness: 0.0 });
  const path = new THREE.Mesh(pathGeo, pathMat);
  path.rotation.x = -Math.PI / 2;
  path.receiveShadow = true;
  scene.add(path);

  // Path border tiles
  const tileMat = new THREE.MeshStandardMaterial({ color: 0xBBAA90, roughness: 0.9 });
  [-3.15, 3.15].forEach(xPos => {
    const borderGeo = new THREE.PlaneGeometry(0.3, 1000);
    const border = new THREE.Mesh(borderGeo, tileMat);
    border.rotation.x = -Math.PI / 2;
    border.position.set(xPos, 0.01, 0);
    scene.add(border);
  });

  // Grass lawn on both sides
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x5BB33A, roughness: 1.0 });
  [-5.5, 5.5].forEach(xPos => {
    const grassGeo = new THREE.PlaneGeometry(5, 1000);
    const grass = new THREE.Mesh(grassGeo, grassMat);
    grass.rotation.x = -Math.PI / 2;
    grass.position.set(xPos, -0.02, 0);
    grass.receiveShadow = true;
    scene.add(grass);
  });

  // College buildings (red brick style)
  const brickColors = [0xA0522D, 0x8B3A20, 0xB5651D, 0x9B4A25];
  const roofColor = 0x4A3522;
  for (let z = 5; z < 350; z += 20) {
    [-7, 7].forEach((xPos, side) => {
      const w = 5 + Math.random() * 3;
      const h = 5 + Math.random() * 5;
      const d = 4 + Math.random() * 3;
      const bGeo = new THREE.BoxGeometry(w, h, d);
      const bMat = new THREE.MeshStandardMaterial({
        color: brickColors[Math.floor(Math.random() * brickColors.length)],
        roughness: 0.95,
      });
      const building = new THREE.Mesh(bGeo, bMat);
      building.position.set(xPos, h / 2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      scene.add(building);

      // Gabled roof
      const roofGeo = new THREE.ConeGeometry(w * 0.75, 1.8, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.9 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.rotation.y = Math.PI / 4;
      roof.position.set(xPos, h + 0.9, z);
      roof.castShadow = true;
      scene.add(roof);

      // Windows (arched look via tall boxes)
      const winMat = new THREE.MeshStandardMaterial({ color: 0x88BBDD, emissive: 0x224466, emissiveIntensity: 0.3 });
      for (let wy = 1.2; wy < h - 1; wy += 1.8) {
        for (let wc = -1; wc <= 1; wc++) {
          const winGeo = new THREE.BoxGeometry(0.55, 0.9, 0.08);
          const win = new THREE.Mesh(winGeo, winMat);
          win.position.set(
            xPos + wc * 1.3,
            wy,
            z + (side === 0 ? d / 2 + 0.05 : -d / 2 - 0.05)
          );
          scene.add(win);
        }
      }

      // Door
      const doorGeo = new THREE.BoxGeometry(0.9, 1.6, 0.1);
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x3A2010, roughness: 0.8 });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(xPos, 0.8, z + (side === 0 ? d / 2 + 0.06 : -d / 2 - 0.06));
      scene.add(door);
    });
  }

  // Campus trees (round canopy style)
  for (let z = 8; z < 350; z += 9 + Math.random() * 5) {
    [-3.8, 3.8].forEach(xPos => {
      const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 2.2, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5C3A1A, roughness: 1.0 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(xPos, 1.1, z);
      trunk.castShadow = true;
      scene.add(trunk);

      const canopyColors = [0x2D8B22, 0x3DAA2A, 0x228B22, 0x4EB83A];
      const canopyGeo = new THREE.SphereGeometry(1.0 + Math.random() * 0.4, 10, 8);
      const canopyMat = new THREE.MeshStandardMaterial({
        color: canopyColors[Math.floor(Math.random() * canopyColors.length)],
        roughness: 0.95,
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.set(xPos, 3.0, z);
      canopy.castShadow = true;
      scene.add(canopy);
    });
  }

  // Lamp posts along path
  for (let z = 12; z < 350; z += 22) {
    [-3.5, 3.5].forEach(xPos => {
      const poleGeo = new THREE.CylinderGeometry(0.055, 0.07, 4.0, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x3A3A4A, metalness: 0.6 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(xPos, 2.0, z);
      pole.castShadow = true;
      scene.add(pole);

      const lampGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const lampMat = new THREE.MeshStandardMaterial({ color: 0xFFFFAA, emissive: 0xFFDD55, emissiveIntensity: 1.5 });
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(xPos, 4.1, z);
      scene.add(lamp);
    });
  }

  // Notice boards / bulletin boards along path
  for (let z = 30; z < 350; z += 60) {
    const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x5C3A1A });
    const post1 = new THREE.Mesh(postGeo, postMat);
    post1.position.set(3.6, 1, z);
    scene.add(post1);
    const post2 = post1.clone();
    post2.position.set(4.4, 1, z);
    scene.add(post2);
    const boardGeo = new THREE.BoxGeometry(1.2, 0.9, 0.08);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0xDDB87A, roughness: 0.8 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(4.0, 1.85, z);
    scene.add(board);
    // Colorful paper pins
    const pinColors = [0xFF4444, 0x44FF44, 0x4444FF, 0xFFFF44];
    for (let p = 0; p < 4; p++) {
      const pinGeo = new THREE.SphereGeometry(0.06, 6, 6);
      const pin = new THREE.Mesh(pinGeo, new THREE.MeshStandardMaterial({ color: pinColors[p], emissive: pinColors[p], emissiveIntensity: 0.5 }));
      pin.position.set(3.6 + (p % 2) * 0.8, 1.6 + Math.floor(p / 2) * 0.5, z - 0.05);
      scene.add(pin);
    }
  }

  // Clouds
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 1.0 });
  for (let i = 0; i < 20; i++) {
    const cg = new THREE.Group();
    for (let c = 0; c < 5; c++) {
      const cGeo = new THREE.SphereGeometry(0.7 + Math.random() * 0.6, 8, 6);
      const cMesh = new THREE.Mesh(cGeo, cloudMat);
      cMesh.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 2);
      cg.add(cMesh);
    }
    cg.position.set((Math.random() - 0.5) * 25, 10 + Math.random() * 4, Math.random() * 350);
    scene.add(cg);
  }
}

// ===== THEME: FOREST =====
function setupForestTheme() {
  scene.background = new THREE.Color(0x1A3A1A);
  scene.fog = new THREE.FogExp2(0x0D2A0D, 0.018);

  directionalLight.color.set(0xCCFFCC);
  directionalLight.intensity = 0.55;
  ambientLight.color.set(0x224422);
  ambientLight.intensity = 0.9;

  // Forest floor — dark soil
  const floorGeo = new THREE.PlaneGeometry(12, 1000);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x2A1A0A, roughness: 1.0 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Root-like dirt path
  const pathGeo = new THREE.PlaneGeometry(4.5, 1000);
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x5A3A1A, roughness: 0.97 });
  const pathMesh = new THREE.Mesh(pathGeo, pathMat);
  pathMesh.rotation.x = -Math.PI / 2;
  pathMesh.position.y = 0.01;
  pathMesh.receiveShadow = true;
  scene.add(pathMesh);

  // Moss patches on ground
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x2A5A1A, roughness: 1.0 });
  for (let i = 0; i < 80; i++) {
    const mGeo = new THREE.CylinderGeometry(0.3 + Math.random() * 0.5, 0.4, 0.06, 7);
    const moss = new THREE.Mesh(mGeo, mossMat);
    moss.position.set((Math.random() - 0.5) * 10, 0.03, Math.random() * 350);
    moss.rotation.y = Math.random() * Math.PI;
    scene.add(moss);
  }

  // Dense trees on both sides
  const trunkColors = [0x3A2010, 0x4A2A14, 0x2A1808];
  const foliageColors = [0x1A4A0A, 0x0D3508, 0x226A12, 0x184008, 0x0A2A05];

  for (let z = 2; z < 350; z += 3 + Math.random() * 3) {
    [-3.2, 3.2].forEach((xPos, side) => {
      const spread = 1.5 + Math.random() * 4;
      const actualX = xPos + (side === 0 ? -spread : spread);
      const trunkH = 4 + Math.random() * 6;
      const trunkR = 0.18 + Math.random() * 0.18;

      const trunkGeo = new THREE.CylinderGeometry(trunkR * 0.7, trunkR, trunkH, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: trunkColors[Math.floor(Math.random() * trunkColors.length)], roughness: 1.0 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(actualX, trunkH / 2, z);
      trunk.rotation.z = (Math.random() - 0.5) * 0.12;
      trunk.castShadow = true;
      scene.add(trunk);

      // Layered cone foliage
      const fCol = foliageColors[Math.floor(Math.random() * foliageColors.length)];
      const layers = 2 + Math.floor(Math.random() * 3);
      for (let l = 0; l < layers; l++) {
        const fGeo = new THREE.ConeGeometry(1.4 - l * 0.15, 2.0 + Math.random(), 8);
        const fMat = new THREE.MeshStandardMaterial({ color: fCol, roughness: 1.0 });
        const foliage = new THREE.Mesh(fGeo, fMat);
        foliage.position.set(actualX, trunkH + l * 1.3, z);
        foliage.castShadow = true;
        scene.add(foliage);
      }
    });
  }

  // Mushrooms along path
  const mushroomColors = [0xCC2222, 0xFF4422, 0xCC8800, 0xFF6622];
  for (let z = 5; z < 350; z += 6 + Math.random() * 5) {
    if (Math.random() > 0.4) {
      const xOffset = (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 0.8);
      const stemGeo = new THREE.CylinderGeometry(0.07, 0.1, 0.5, 8);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0xEEDDCC, roughness: 1.0 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(xOffset, 0.25, z);
      stem.castShadow = true;
      scene.add(stem);

      const capGeo = new THREE.SphereGeometry(0.25, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      const capMat = new THREE.MeshStandardMaterial({ color: mushroomColors[Math.floor(Math.random() * mushroomColors.length)], roughness: 0.7 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(xOffset, 0.5, z);
      cap.castShadow = true;
      scene.add(cap);

      // White dots on cap
      for (let d = 0; d < 3; d++) {
        const dotGeo = new THREE.SphereGeometry(0.04, 6, 6);
        const dotMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        const ang = Math.random() * Math.PI * 2;
        const rad = 0.1 + Math.random() * 0.1;
        dot.position.set(xOffset + Math.cos(ang) * rad, 0.52 + Math.random() * 0.08, z + Math.sin(ang) * rad);
        scene.add(dot);
      }
    }
  }

  // Fireflies (glowing emissive dots)
  const flyMat = new THREE.MeshStandardMaterial({ color: 0xCCFF44, emissive: 0xAAFF00, emissiveIntensity: 3.0 });
  for (let i = 0; i < 60; i++) {
    const flyGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const fly = new THREE.Mesh(flyGeo, flyMat);
    fly.position.set((Math.random() - 0.5) * 8, 0.5 + Math.random() * 2.5, Math.random() * 350);
    scene.add(fly);
  }

  // Fallen logs across path
  const logMat = new THREE.MeshStandardMaterial({ color: 0x4A2A10, roughness: 1.0 });
  for (let z = 50; z < 350; z += 70 + Math.random() * 30) {
    const logGeo = new THREE.CylinderGeometry(0.28, 0.35, 8, 10);
    const log = new THREE.Mesh(logGeo, logMat);
    log.rotation.z = Math.PI / 2;
    log.position.set(0, 0.3, z);
    log.castShadow = true;
    log.receiveShadow = true;
    scene.add(log);
  }

  // Overhead canopy (dark leaf ceiling)
  for (let z = 10; z < 350; z += 12) {
    const canGeo = new THREE.PlaneGeometry(9, 8);
    const canMat = new THREE.MeshStandardMaterial({ color: 0x0A2A05, roughness: 1.0, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
    const canopy = new THREE.Mesh(canGeo, canMat);
    canopy.position.set(0, 7 + Math.random() * 1.5, z);
    canopy.rotation.x = -0.15 + Math.random() * 0.3;
    scene.add(canopy);
  }

  // God rays — tall thin emissive planes
  const rayMat = new THREE.MeshStandardMaterial({ color: 0x88FF88, emissive: 0x44AA44, emissiveIntensity: 0.25, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
  for (let i = 0; i < 15; i++) {
    const rayGeo = new THREE.PlaneGeometry(0.4, 9);
    const ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set((Math.random() - 0.5) * 7, 3.5, Math.random() * 350);
    ray.rotation.x = -0.05;
    ray.rotation.y = (Math.random() - 0.5) * 0.5;
    scene.add(ray);
  }
}

// ===== UI ELEMENTS =====
const uiContainer = document.createElement("div");
uiContainer.id = "uiContainer";
uiContainer.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-family: Arial, sans-serif;
`;
document.body.appendChild(uiContainer);

// ===== HOME SCREEN =====
function showHomeScreen() {
  uiContainer.innerHTML = `
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-height: 100%; background: linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%); display: flex; flex-direction: column; justify-content: flex-start; align-items: center; z-index: 100; pointer-events: all; overflow-y: auto; padding-top: 50px; padding-bottom: 50px;">
      <h1 style="color: #fff; font-size: 4rem; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin: 0;">🏃 UBBA LEGENDS RUN</h1>
      <p style="color: #fff; font-size: 1.5rem; margin-bottom: 30px;">Level ${currentLevel}</p>
      
      <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; text-align: center; max-width: 600px; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
        <h2 style="color: #333; margin-bottom: 20px;">Select Your Character</h2>
        <div id="characterButtons" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;"></div>
        <p style="color: #666; font-size: 0.9rem; margin: 10px 0;">Characters: ${characters.length}/50</p>

        <h3 style="color: #333; margin: 20px 0;">Select Theme</h3>
        <div id="themeButtons" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;"></div>

        <h3 style="color: #333; margin: 20px 0;">Select Music</h3>
        <div id="musicButtons" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;"></div>

        <p style="color: #666; font-size: 1rem; margin: 20px 0;">
          <strong>Controls:</strong><br>
          A/D or Arrow Keys - Move<br>
          W or Up Arrow - Jump<br>
          SPACE - Pause/Resume<br>
          Collect 💰 | Dodge 🔴
        </p>
        <div style="background: rgba(245,245,245,0.95); border: 1px solid #ddd; padding: 15px; border-radius: 12px; margin-bottom: 20px; text-align: left; color: #333; line-height: 1.4;">
          <p style="margin: 0 0 10px; font-weight: bold;">🎮 In the world of Ubbalegends Run…</p>
          <p style="margin: 0 0 10px;">Everyone is a character, every moment is fun 😄</p>
          <p style="margin: 0 0 10px; font-weight: bold;">⚠️ But remember:</p>
          <p style="margin: 0 0 10px;">This game is created only for entertainment — no harm, no offense, no hard feelings.</p>
          <p style="margin: 0;">Because beyond the game… We are one — Brindavan 💙</p>
        </div>
        <p style="color: #444; font-size: 0.95rem; margin: 10px 0 20px;">Tap anywhere outside the buttons to start or resume.</p>

        <button id="startBtn" style="background: #4CAF50; color: white; border: none; padding: 15px 50px; font-size: 1.5rem; border-radius: 5px; cursor: pointer; margin-top: 20px; transition: 0.3s; pointer-events: all;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
          START LEVEL
        </button>
      </div>

      <div style="position: absolute; top: 20px; right: 20px; pointer-events: all;">
        <button id="muteBtn" onclick="toggleMute()" style="background: #333; color: white; border: none; padding: 10px 20px; font-size: 1.2rem; border-radius: 5px; cursor: pointer;">🔇 Mute</button>
      </div>
    </div>
  `;

  // Render character buttons
  const charContainer = document.getElementById("characterButtons");
  characters.forEach((char, index) => {
    const btn = document.createElement("button");
    btn.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      min-width: 90px;
      background: ${selectedCharacterIndex === index ? "#FFD700" : "#2196F3"};
      color: white;
      border: ${selectedCharacterIndex === index ? "3px solid #FFA500" : "none"};
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.3s;
      pointer-events: all;
    `;
    if (char.faceUrl) {
      btn.innerHTML = `
        <img src="${char.faceUrl}" alt="${char.name}" style="width:40px;height:40px;object-fit:cover;border-radius:10px;"> 
        <span style="font-size: 0.95rem; font-weight: bold;">${char.name}</span>`;
    } else {
      btn.innerHTML = `
        <span style="font-size: 1.8rem;">${char.emoji}</span>
        <span style="font-size: 0.95rem; font-weight: bold;">${char.name}</span>`;
    }
    btn.onclick = () => selectCharacter(index);
    charContainer.appendChild(btn);
  });

  // Render theme buttons
  const themeContainer = document.getElementById("themeButtons");
  const themes = [
    { id: "road", emoji: "🛣️", label: "Road", color: "#FF6B6B" },
    { id: "riverside", emoji: "🌊", label: "River", color: "#4ECDC4" },
    { id: "college", emoji: "🏫", label: "College", color: "#95E1D3" },
    { id: "forest", emoji: "🌲", label: "Forest", color: "#228B22" },
  ];
  themes.forEach((theme) => {
    const btn = document.createElement("button");
    btn.style.cssText = `
      padding: 10px 20px;
      background: ${currentTheme === theme.id ? "#FFD700" : theme.color};
      color: white;
      border: ${currentTheme === theme.id ? "3px solid #FFA500" : "none"};
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.3s;
      pointer-events: all;
    `;
    btn.innerHTML = `${theme.emoji} ${theme.label}`;
    btn.onclick = () => setTheme(theme.id);
    themeContainer.appendChild(btn);
  });

  const musicContainer = document.getElementById("musicButtons");
  musicTracks.forEach((track, index) => {
    const btn = document.createElement("button");
    btn.style.cssText = `
      padding: 10px 20px;
      background: ${selectedMusicIndex === index ? "#FFD700" : "#333333"};
      color: white;
      border: ${selectedMusicIndex === index ? "3px solid #FFA500" : "none"};
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.3s;
      pointer-events: all;
    `;
    btn.innerHTML = track.label;
    btn.onclick = () => setMusicTrack(index);
    musicContainer.appendChild(btn);
  });

  document.getElementById("startBtn").onclick = () => startGame();
  updateMuteButton();
  gameState = "home";
}

function updateMuteButton() {
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn) {
    muteBtn.innerHTML = isMuted ? "🔇 Mute" : "🔊 Unmute";
  }
}

function setMusicTrack(index, refreshUI = true) {
  selectedMusicIndex = index;
  const track = musicTracks[selectedMusicIndex];
  if (track) {
    bgMusic.src = track.src;
    bgMusic.loop = true;
    if (gameState === "playing" && !isMuted) {
      stopAllAudio(bgMusic);
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {});
    }
  }
  if (refreshUI && gameState === "home") {
    showHomeScreen();
  }
}

function selectCharacter(index) {
  selectedCharacterIndex = index;
  showHomeScreen();
}

function setTheme(theme) {
  currentTheme = theme;
  showHomeScreen();
}

// ===== PAUSE SCREEN =====
function showPauseScreen() {
  const overlay = document.createElement("div");
  overlay.id = "pauseOverlay";
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 200;
    pointer-events: all;
  `;

  overlay.innerHTML = `
    <h1 style="color: white; font-size: 3rem; margin-bottom: 30px;">⏸️ PAUSED</h1>
    
    <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; text-align: center; max-width: 500px; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
      <h2 style="color: #333; margin-bottom: 20px;">Change Character</h2>
      <div id="pauseCharButtons" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;"></div>
      
      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
        <button onclick="resumeGame()" style="background: #4CAF50; color: white; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 5px; cursor: pointer; pointer-events: all;">
          ▶️ RESUME
        </button>
        <button onclick="goHome()" style="background: #2196F3; color: white; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 5px; cursor: pointer; pointer-events: all;">
          🏠 HOME
        </button>
      </div>
    </div>
  `;

  uiContainer.appendChild(overlay);

  // Render pause character buttons
  const pauseCharContainer = document.getElementById("pauseCharButtons");
  characters.forEach((char, index) => {
    const btn = document.createElement("button");
    btn.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      min-width: 90px;
      background: ${selectedCharacterIndex === index ? "#FFD700" : "#2196F3"};
      color: white;
      border: ${selectedCharacterIndex === index ? "3px solid #FFA500" : "none"};
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.3s;
      pointer-events: all;
    `;
    if (char.faceUrl) {
      btn.innerHTML = `
        <img src="${char.faceUrl}" alt="${char.name}" style="width:40px;height:40px;object-fit:cover;border-radius:10px;"> 
        <span style="font-size: 0.95rem; font-weight: bold;">${char.name}</span>`;
    } else {
      btn.innerHTML = `
        <span style="font-size: 1.8rem;">${char.emoji}</span>
        <span style="font-size: 0.95rem; font-weight: bold;">${char.name}</span>`;
    }
    btn.onclick = () => changeCharacterPaused(index);
    pauseCharContainer.appendChild(btn);
  });
}

function changeCharacterPaused(index) {
  selectedCharacterIndex = index;
  createPlayer();
  const overlay = document.getElementById("pauseOverlay");
  if (overlay) overlay.remove();
  showPauseScreen();
}

function resumeGame() {
  isPaused = false;
  gameState = "playing";
  const overlay = document.getElementById("pauseOverlay");
  if (overlay) overlay.remove();
  uiContainer.innerHTML = `
    <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 1.5rem; pointer-events: none;">
      <div>Score: <span id="score">0</span></div>
      <div>Level: <span id="level">${currentLevel}</span></div>
      <div>Z: <span id="zPos">0</span></div>
      <div style="margin-top: 10px;">
        <span id="shieldStatus" style="display: ${shieldActive ? "inline" : "none"};">🛡️ Shield</span>
        <span id="boostStatus" style="display: ${boostActive ? "inline" : "none"}; margin-left: 10px;">🚀 Boost</span>
      </div>
    </div>
  `;
}

function goHome() {
  const overlay = document.getElementById("pauseOverlay");
  if (overlay) overlay.remove();
  stopAllAudio();
  gameState = "home";
  gameScore = 0;
  currentLevel = 1;
  currentLevelConfig = levelConfig[currentLevel];
  shieldActive = false;
  boostActive = false;
  setupScene();
  showHomeScreen();
}

// ===== GAME OVER SCREEN =====
function showGameOverScreen(reason, preserve = false) {
  preserveScore = preserve;
  const reachedLevel = preserve ? currentLevel - 1 : currentLevel;
  const title = preserve ? "🏁 LEVEL COMPLETE" : "💥 GAME OVER";
  const subtitle = preserve ? `Keep going to level ${currentLevel}!` : reason;
  const caughtMsg = !preserve ? `<p style="color:#FFD700;font-size:1.1rem;margin:8px 0 0;">🎩 <em>"Hehehe… you cannot outrun the Rich Man!"</em></p>` : "";
  uiContainer.innerHTML = `
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 200; pointer-events: all;">
      <h1 style="color: ${preserve ? "#4CAF50" : "#FF6B6B"}; font-size: 4rem; margin-bottom: 20px; text-shadow: 0 0 20px ${preserve ? "rgba(76,175,80,0.6)" : "rgba(255,0,0,0.5)"};">${title}</h1>
      <p style="color: white; font-size: 1.5rem; margin-bottom: 10px;">${subtitle}</p>
      ${caughtMsg}
      
      <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; text-align: center; box-shadow: 0 8px 16px rgba(0,0,0,0.2); margin-top: 20px;">
        <h2 style="color: #333; margin-bottom: 20px;">Final Score: <span style="color: #FFD700;">${gameScore}</span></h2>
        <p style="color: #333; font-size: 1.2rem; margin: 10px 0;">Level Reached: <span style="color: #FFD700;">${reachedLevel}</span></p>
        
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
          <button onclick="goHome()" style="background: #4CAF50; color: white; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 5px; cursor: pointer; pointer-events: all;">
            🏠 HOME
          </button>
          <button onclick="startGame()" style="background: #2196F3; color: white; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 5px; cursor: pointer; pointer-events: all;">
            ${preserve ? "➡️ NEXT LEVEL" : "🔄 TRY AGAIN"}
          </button>
        </div>
      </div>
    </div>
  `;
  if (!preserve) playLostSound();
}

// ===== GAME START COUNTDOWN =====
function showCountdown(onComplete) {
  let count = 3;
  stopAllAudio();

  uiContainer.innerHTML = `
    <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(160deg,#0D0D2A 0%,#1A0A2A 60%,#2A0A0A 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:300;color:white;pointer-events:all;overflow:hidden;">
      
      <!-- animated spotlight sweep -->
      <div id="spotlight" style="position:absolute;top:-20%;left:50%;width:60vw;height:120%;background:radial-gradient(ellipse at 50% 0%,rgba(255,220,80,0.18) 0%,transparent 70%);transform:translateX(-50%);pointer-events:none;transition:left 0.8s ease;"></div>
      
      <!-- Rich Man animated scene -->
      <div style="position:relative;margin-bottom:24px;">
        <canvas id="richManCanvas" width="300" height="320" style="display:block;filter:drop-shadow(0 0 24px rgba(255,200,50,0.5));"></canvas>
        <div id="richManBubble" style="position:absolute;top:10px;right:-10px;background:white;color:#333;border-radius:14px;padding:6px 12px;font-size:0.95rem;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.4);white-space:nowrap;opacity:0;transition:opacity 0.3s;"></div>
      </div>

      <h1 style="font-size:3rem;font-weight:900;letter-spacing:2px;text-shadow:0 0 20px rgba(255,100,100,0.8);margin:0 0 10px;">GET READY!</h1>
      <div id="countdownNumber" style="font-size:7rem;font-weight:900;color:#FFD700;text-shadow:0 0 30px rgba(255,200,0,0.9);line-height:1;margin:0 0 8px;">${count}</div>
      <p id="countdownSub" style="font-size:1.2rem;color:#FFCCAA;margin:0;">🎩 The Rich Man is coming for you…</p>
    </div>
  `;

  const canvas = document.getElementById("richManCanvas");
  const ctx = canvas.getContext("2d");
  let animFrame = 0;
  let bubbleTimeout = null;
  const bubbles = [
    "I'll catch you!",
    "My money or your life!",
    "*cracks knuckles*",
    "No one outruns ME!",
    "Hehehe… 🎩",
  ];

  function drawRichManCanvas(frame) {
    ctx.clearRect(0, 0, 300, 320);
    const t = frame * 0.05;

    // --- Shadow ---
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(150, 298, 45, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Legs (animated running-in-place) ---
    const legSwing = Math.sin(t * 3) * 22;
    ctx.fillStyle = "#111133";
    // left leg
    ctx.save(); ctx.translate(134, 230); ctx.rotate((legSwing) * Math.PI / 180);
    ctx.fillRect(-10, 0, 20, 55); ctx.restore();
    // right leg
    ctx.save(); ctx.translate(166, 230); ctx.rotate((-legSwing) * Math.PI / 180);
    ctx.fillRect(-10, 0, 20, 55); ctx.restore();

    // Shoes
    ctx.fillStyle = "#1A0A00";
    ctx.save(); ctx.translate(134, 230); ctx.rotate((legSwing) * Math.PI / 180);
    ctx.fillRect(-13, 50, 30, 13); ctx.restore();
    ctx.save(); ctx.translate(166, 230); ctx.rotate((-legSwing) * Math.PI / 180);
    ctx.fillRect(-13, 50, 30, 13); ctx.restore();

    // --- Body bob ---
    const bob = Math.sin(t * 3) * 5;

    // Suit body
    ctx.fillStyle = "#1A237E";
    ctx.beginPath();
    ctx.roundRect(112, 148 + bob, 76, 82, 8);
    ctx.fill();

    // Shirt strip
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(142, 152 + bob, 18, 55);
    ctx.fillStyle = "#1A237E";
    ctx.beginPath();
    ctx.moveTo(142, 152 + bob); ctx.lineTo(150, 175 + bob); ctx.lineTo(142, 207 + bob);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(160, 152 + bob); ctx.lineTo(150, 175 + bob); ctx.lineTo(160, 207 + bob);
    ctx.fill();

    // Buttons
    ctx.fillStyle = "#FFD700";
    [0, 1, 2].forEach(i => {
      ctx.beginPath();
      ctx.arc(150, 163 + bob + i * 16, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Arms with stretch animation
    const stretch = Math.abs(Math.sin(t * 1.5)) * 20; // "reaching" animation
    ctx.fillStyle = "#1A237E";
    // Left arm
    ctx.save(); ctx.translate(112, 165 + bob);
    ctx.rotate((-30 + Math.sin(t * 3) * 25) * Math.PI / 180);
    ctx.fillRect(-14, 0, 18, 55); ctx.restore();
    // Right arm (holds bag) — reaches forward
    ctx.save(); ctx.translate(188, 165 + bob);
    ctx.rotate((25 - stretch) * Math.PI / 180);
    ctx.fillRect(-4, 0, 18, 55); ctx.restore();

    // Cane (left hand)
    ctx.strokeStyle = "#8B6914"; ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(98, 215 + bob); ctx.lineTo(85, 295);
    ctx.stroke();
    ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(93, 217 + bob, 10, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Money bag (right hand)
    ctx.fillStyle = "#DDB840";
    const bagX = 198 + stretch * 0.3;
    const bagY = 218 + bob + stretch * 0.2;
    ctx.beginPath(); ctx.arc(bagX, bagY, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#333";
    ctx.font = "bold 22px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("$", bagX, bagY);

    // --- Head ---
    ctx.fillStyle = "#F5CBA7";
    ctx.beginPath(); ctx.arc(150, 118 + bob, 34, 0, Math.PI * 2); ctx.fill();

    // Cheeks (redder when angry)
    ctx.fillStyle = "rgba(255,120,120,0.55)";
    ctx.beginPath(); ctx.ellipse(128, 123 + bob, 10, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(172, 123 + bob, 10, 7, 0, 0, Math.PI * 2); ctx.fill();

    // Eyebrows — angry tilt
    ctx.fillStyle = "#3A2010"; ctx.strokeStyle = "#3A2010"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(128, 106 + bob); ctx.lineTo(143, 111 + bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(172, 106 + bob); ctx.lineTo(157, 111 + bob); ctx.stroke();

    // Eyes (blinking every ~90 frames)
    const blink = (frame % 90 < 5);
    ctx.fillStyle = "#FFF";
    if (!blink) {
      ctx.beginPath(); ctx.ellipse(137, 117 + bob, 8, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(163, 117 + bob, 8, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath(); ctx.arc(138, 118 + bob, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(164, 118 + bob, 5, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = "#3A2010";
      ctx.fillRect(130, 116 + bob, 16, 4);
      ctx.fillRect(156, 116 + bob, 16, 4);
    }

    // Monocle
    ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(163, 117 + bob, 11, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(163, 128 + bob); ctx.lineTo(163, 136 + bob); ctx.stroke();

    // Moustache
    ctx.fillStyle = "#5C3A1A";
    ctx.beginPath(); ctx.ellipse(137, 133 + bob, 12, 5, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(163, 133 + bob, 12, 5, 0.4, 0, Math.PI * 2); ctx.fill();

    // --- Top Hat ---
    const hatBob = bob;
    // Brim
    ctx.fillStyle = "#111111";
    ctx.beginPath(); ctx.ellipse(150, 84 + hatBob, 48, 10, 0, 0, Math.PI * 2); ctx.fill();
    // Crown
    ctx.fillRect(116, 26 + hatBob, 68, 60);
    // Gold band
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(116, 78 + hatBob, 68, 9);
    // Hat shine
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(120, 30 + hatBob, 14, 50);

    // --- Dust/effort particles ---
    const numParticles = 5;
    for (let i = 0; i < numParticles; i++) {
      const px = 80 + (i * 37 + frame * 2.5) % 140;
      const py = 255 + Math.sin(frame * 0.07 + i) * 18;
      const alpha = 0.3 + Math.sin(frame * 0.12 + i * 1.5) * 0.25;
      ctx.fillStyle = `rgba(200,180,120,${alpha})`;
      ctx.beginPath(); ctx.arc(px, py, 4 + i % 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  const bubbleEl = document.getElementById("richManBubble");
  function showBubble() {
    const msg = bubbles[Math.floor(Math.random() * bubbles.length)];
    if (bubbleEl) {
      bubbleEl.textContent = msg;
      bubbleEl.style.opacity = "1";
      clearTimeout(bubbleTimeout);
      bubbleTimeout = setTimeout(() => { bubbleEl.style.opacity = "0"; }, 1500);
    }
  }
  showBubble();
  const bubbleInterval = setInterval(showBubble, 2000);

  let rafId;
  function animateCanvas() {
    drawRichManCanvas(animFrame++);
    rafId = requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  const playVoice = (step) => {
    const audio = step % 2 === 0 ? voice2Audio : voice1Audio;
    playAudioEffect(audio, { reset: true, playbackRate: 1.1, resumeMainAfter: 0 });
  };
  playVoice(count);

  const subMessages = [
    "🎩 The Rich Man is coming for you…",
    "💨 He's warming up…",
    "🏃 Almost time to run!",
  ];

  const countdownInterval = setInterval(() => {
    count -= 1;
    const numEl = document.getElementById("countdownNumber");
    const subEl = document.getElementById("countdownSub");
    if (numEl) numEl.textContent = count > 0 ? count : "GO!";
    if (subEl && count > 0) subEl.textContent = subMessages[3 - count] || "";
    if (count > 0) playVoice(count);
    if (count <= 0) {
      clearInterval(countdownInterval);
      clearInterval(bubbleInterval);
      cancelAnimationFrame(rafId);
      setTimeout(() => { onComplete(); }, 500);
    }
  }, 1000);
}

function startGame() {
  showCountdown(beginGame);
}

function beginGame() {
  gameState = "playing";
  if (!preserveScore) {
    gameScore = 0;
  }
  preserveScore = false;
  player.position.z = 0;
  currentLevelConfig = levelConfig[Math.min(currentLevel, 10)];
  setupScene();
  createRichMan();
  stopAllAudio(bgMusic);
  setMusicTrack(selectedMusicIndex, false);

  uiContainer.innerHTML = `
    <div id="dangerWarning" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 0.1s;border:6px solid rgba(255,0,0,0);"></div>
    <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 1.5rem; pointer-events: none; text-shadow: 1px 1px 3px #000;">
      <div>Score: <span id="score">0</span></div>
      <div>Level: <span id="level">${currentLevel}</span></div>
      <div>Z: <span id="zPos">0</span></div>
      <div style="margin-top: 10px;">
        <span id="shieldStatus" style="display: none;">🛡️ Shield</span>
        <span id="boostStatus" style="display: none; margin-left: 10px;">🚀 Boost</span>
      </div>
    </div>
    <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 1rem; pointer-events: none; text-shadow: 1px 1px 3px #000; text-align:right;">
      <div id="chaserDist" style="color: #FF6666;">🎩 Rich Man: <span id="distVal">far</span></div>
    </div>
    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 1.2rem; text-align: center; pointer-events: none; text-shadow: 1px 1px 3px #000;">
      A/D - Move | W - Jump | SPACE - Pause
    </div>
  `;

  if (!isMuted) bgMusic.play().catch(() => {});
}

// ===== KEYBOARD INPUT =====
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  
  if (e.code === "Space") {
    e.preventDefault();
    if (gameState === "playing") {
      isPaused = true;
      gameState = "paused";
      bgMusic.pause();
      showPauseScreen();
    }
  }

  if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
    if (gameState === "playing" && !player.jumping) {
      player.velocity.y = currentLevelConfig.speed * 3.2;
      player.jumping = true;
      if (!isMuted) {
        playAudioEffect(jumpSound, { reset: true, playbackRate: 1.3, resumeMainAfter: 700 });
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

document.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button")) return;
  if (gameState === "home") {
    startGame();
  } else if (gameState === "paused") {
    resumeGame();
  } else if (gameState === "gameOver") {
    startGame();
  }
});

// ===== GAME LOOP =====
function gameLoop() {
  renderer.render(scene, camera);

  if (gameState !== "playing" && gameState !== "catching") {
    requestAnimationFrame(gameLoop);
    return;
  }

  if (gameState === "catching") {
    // Only animate richMan catching, camera follows
    updateRichMan();
    camera.position.set(player.position.x, player.position.y + 3, player.position.z - 5);
    camera.lookAt(player.position.x, player.position.y, player.position.z + 10);
    requestAnimationFrame(gameLoop);
    return;
  }

  // Player movement
  if (keys["a"] || keys["arrowleft"]) {
    player.velocity.x = currentLevelConfig.speed;
  } else if (keys["d"] || keys["arrowright"]) {
    player.velocity.x = -currentLevelConfig.speed;
  } else {
    player.velocity.x *= 0.9;
  }

  player.velocity.y -= 0.01;
  player.position.x += player.velocity.x;
  player.position.y += player.velocity.y;
  player.position.z += currentLevelConfig.speed * 0.5;

  // Boundary check
  if (player.position.x > 2) player.position.x = 2;
  if (player.position.x < -2) player.position.x = -2;

  // Ground collision
  if (player.position.y <= 1) {
    player.position.y = 1;
    player.velocity.y = 0;
    player.jumping = false;
  }

  player.mesh.position.copy(player.position);

  if (player.parts && player.parts.body) {
    player.runningPhase += 0.2;
    const bob = Math.sin(player.runningPhase) * 0.06;
    player.parts.body.position.y = 0.7 + bob;
    player.parts.head.position.y = 1.5 + bob;
    player.parts.leftArm.rotation.x = Math.sin(player.runningPhase) * 0.8;
    player.parts.rightArm.rotation.x = -Math.sin(player.runningPhase) * 0.8;
    player.parts.leftLeg.rotation.x = -Math.sin(player.runningPhase) * 0.8;
    player.parts.rightLeg.rotation.x = Math.sin(player.runningPhase) * 0.8;
  }

  if (!isMuted && gameState === "playing" && !player.jumping && Math.abs(player.velocity.x) > 0.05) {
    if (runSound.paused) {
      runSound.play().catch(() => {});
    }
  } else {
    if (!runSound.paused) {
      runSound.pause();
      runSound.currentTime = 0;
    }
  }

  camera.position.set(player.position.x, player.position.y + 3, player.position.z - 5);
  camera.lookAt(player.position.x, player.position.y, player.position.z + 10);

  // Update Rich Man chaser
  updateRichMan();
  const distVal = document.getElementById("distVal");
  if (distVal && richMan.mesh) {
    const gap = Math.floor(player.position.z - richMan.position.z);
    distVal.textContent = gap > 12 ? "far" : gap > 6 ? "close!" : "DANGER!";
    distVal.style.color = gap > 12 ? "#AAFFAA" : gap > 6 ? "#FFFF44" : "#FF3333";
  }

  // Update coins
  coins.forEach((coin) => {
    coin.rotation += 0.05;
    coin.mesh.rotation.y += 0.05;
    const baseHeight = coin.mesh.userData?.baseHeight || 1.2;
    coin.mesh.position.y = baseHeight + Math.sin(Date.now() * 0.003 + coin.mesh.userData.floatOffset) * 0.15;

    if (Math.abs(player.position.x - coin.mesh.position.x) < 0.8 &&
        Math.abs(player.position.y - coin.mesh.position.y) < 0.6 &&
        Math.abs(player.position.z - coin.mesh.position.z) < 0.8) {
      if (!coin.collected) {
        coin.collected = true;
        gameScore += 5;
        scene.remove(coin.mesh);
        if (!isMuted) coinSound.play().catch(() => {});
      }
    }
  });

  // Update powerups
  powerups.forEach((powerup) => {
    powerup.rotation += 0.03;
    powerup.mesh.rotation.x += 0.03;
    powerup.mesh.rotation.y += 0.03;

    if (Math.abs(player.position.x - powerup.mesh.position.x) < 0.8 &&
        Math.abs(player.position.y - powerup.mesh.position.y) < 0.8 &&
        Math.abs(player.position.z - powerup.mesh.position.z) < 0.8) {
      if (!powerup.collected) {
        powerup.collected = true;
        if (powerup.type === "shield") {
          shieldActive = true;
          setTimeout(() => { shieldActive = false; }, 10000);
        } else if (powerup.type === "boost") {
          boostActive = true;
          setTimeout(() => { boostActive = false; }, 5000);
        }
        scene.remove(powerup.mesh);
      }
    }
  });

  // Update obstacles
  const playerBox = new THREE.Box3().setFromObject(player.mesh);
  playerBox.expandByScalar(-0.15);
  obstacles.forEach((obstacle) => {
    if (obstacle.mesh.userData && typeof obstacle.mesh.userData.floatOffset === "number") {
      obstacle.mesh.position.y = 0.15 + Math.sin(Date.now() * 0.003 + obstacle.mesh.userData.floatOffset) * 0.08;
    }
    const obstacleBox = new THREE.Box3().setFromObject(obstacle.mesh);
    obstacleBox.expandByScalar(-0.1);
    if (playerBox.intersectsBox(obstacleBox)) {
      if (!shieldActive) {
        triggerRichManCatch();
        setTimeout(() => {
          showGameOverScreen("💥 Hit an obstacle! The Rich Man caught you!");
          gameState = "gameOver";
        }, 900);
        gameState = "catching"; // freeze player, let catch animation play
      } else {
        shieldActive = false;
        scene.remove(obstacle.mesh);
        if (!isMuted) hitSound.play().catch(() => {});
      }
    }
  });

  // Update HUD
  const scoreEl = document.getElementById("score");
  const levelEl = document.getElementById("level");
  const zPosEl = document.getElementById("zPos");
  const shieldEl = document.getElementById("shieldStatus");
  const boostEl = document.getElementById("boostStatus");

  if (scoreEl) scoreEl.textContent = gameScore;
  if (levelEl) levelEl.textContent = currentLevel;
  if (zPosEl) zPosEl.textContent = Math.floor(player.position.z);
  if (shieldEl) shieldEl.style.display = shieldActive ? "inline" : "none";
  if (boostEl) boostEl.style.display = boostActive ? "inline" : "none";

  // Level progression
  const levelDistance = 110 + currentLevel * 20;
  if (gameState === "playing" && player.position.z > levelDistance && currentLevel < 10) {
    const completedLevel = currentLevel;
    currentLevel += 1;
    gameScore += 20 * completedLevel;
    preserveScore = true;
    if (!isMuted) levelupSound.play().catch(() => {});
    showGameOverScreen(`🎉 Level ${completedLevel} Complete!`, true);
    gameState = "gameOver";
  }

  requestAnimationFrame(gameLoop);
}

// ===== START =====
window.selectCharacter = selectCharacter;
window.setTheme = setTheme;
window.startGame = startGame;
window.resumeGame = resumeGame;
window.goHome = goHome;
window.toggleMute = toggleMute;

showHomeScreen();
gameLoop();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});