const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

// Load face image
const img = new Image();
img.src = "friend.png";

let player = {
  x: 100,
  y: 200,
  width: 60,
  height: 60,
  dy: 0,
  jumping: false
};

let gravity = 0.7;
let obstacles = [];
let score = 0;

// Jump
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.dy = -12;
    player.jumping = true;
  }
});

// Create obstacles
function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: 220,
    width: 20,
    height: 50
  });
}

setInterval(spawnObstacle, 1500);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player physics
  player.y += player.dy;
  player.dy += gravity;

  if (player.y >= 200) {
    player.y = 200;
    player.jumping = false;
  }

  // Draw player (friend face)
  ctx.drawImage(img, player.x, player.y, player.width, player.height);

  // Obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    obs.x -= 6;

    ctx.fillStyle = "red";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    // Collision
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      alert("BRO YOU LOST 😂 Score: " + score);
      document.location.reload();
    }
  }

  // Score
  score++;
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);

  requestAnimationFrame(update);
}

img.onload = update;