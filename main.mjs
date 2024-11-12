// @ts-check

import Game from './game.mjs';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("2d context not supported");

const onResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
onResize();

window.addEventListener("resize", onResize);

const game = new Game();

let lastTime = 0;

/** @param {number} now */
const loop = (now) => {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  // clear stuff
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";

  game.Update(dt);

  game.Render(ctx);

  ctx.strokeStyle = "#00f";
  ctx.strokeRect(500, 0, 1, 500);

  requestAnimationFrame(loop);
}

// Start the game
requestAnimationFrame(loop);
