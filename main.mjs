// @ts-check

import Thing from './Thing.mjs';
import Vec2 from './Vec2.mjs';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = canvas.getContext("2d");

const onResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
onResize();

const input = {
  up: false,
  down: false,
  left: false,
  right: false,
}

window.addEventListener("resize", onResize);

window.addEventListener("keydown", (e) => {
  if (e.key === "w") input.up = true;
  if (e.key === "s") input.down = true;
  if (e.key === "a") input.left = true;
  if (e.key === "d") input.right = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "w") input.up = false;
  if (e.key === "s") input.down = false;
  if (e.key === "a") input.left = false;
  if (e.key === "d") input.right = false;
});

const thing = new Thing(new Vec2(100, 100));

const inputDirection = new Vec2(0, 0);

const DealWithInput = () => {
  inputDirection.x = 0;
  inputDirection.y = 0;

  if (input.up) {
    inputDirection.y += -1;
  }
  if (input.down) {
    inputDirection.y += 1;
  }
  if (input.left) {
    inputDirection.x += -1;
  }
  if (input.right) {
    inputDirection.x += 1;
  }

  inputDirection.Normalize();
};

// Game loop
function loop() {
  if (!ctx) throw new Error("2d context not supported");

  // clear stuff
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";

  DealWithInput();

  thing.Update(inputDirection);

  thing.Render(ctx);

  requestAnimationFrame(loop);
}

// Start the game
loop();
