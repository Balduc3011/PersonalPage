const canvas = document.getElementById("background-effect");
const ctx = canvas.getContext("2d");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.onresize = () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
};

// ---- LOAD SNOW IMAGE ---- //
const snowImg = new Image();
snowImg.src = "../image/Home/snow.png";    // <----- đường dẫn ảnh bông tuyết

// ---- CONFIG ---- //
const SNOW_COUNT = 250;
const GRAVITY = 0.3;
const WIND = 0.04;
const SPEED = 0.5;

// ---- Snow particle ---- //
class Snowflake {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * -H;
    this.size = Math.random() * 20 + 10; // kích thước ảnh bông tuyết
    this.speedY = this.size * 0.03 + Math.random() * 0.5;
    this.speedX = (Math.random() - 0.5) * WIND * 20;
    this.angle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * 360;   // xoay ảnh
    this.rotationSpeed = (Math.random() - 0.5) * 0.4;
  }

  update() {
    this.angle += 0.01;
    this.rotation += this.rotationSpeed;

    this.x += Math.sin(this.angle) * 0.4 + this.speedX;
    this.y += this.speedY * SPEED + GRAVITY * 0.2;

    if (this.y > H + 50 || this.x < -50 || this.x > W + 50) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = 0.8;
    ctx.drawImage(snowImg, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

// ---- Create flakes ---- //
let snowflakes = [];
for (let i = 0; i < SNOW_COUNT; i++) {
  snowflakes.push(new Snowflake());
}

// ---- Loop ---- //
function loop() {
  requestAnimationFrame(loop);

  ctx.clearRect(0, 0, W, H);

  if (!snowImg.complete) return;  // chưa load ảnh → không vẽ

  for (let flake of snowflakes) {
    flake.update();
    flake.draw();
  }
}

loop();
