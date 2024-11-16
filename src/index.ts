import Game from './Game';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("2d context not supported");

const onResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
onResize();

window.addEventListener("resize", onResize);

// this is messy, sending the function to the game cause
// the assets are being loaded in a promise, so we need to start after
const initGame = () => {
  requestAnimationFrame(loop);
};

const game = new Game(ctx, initGame);

let lastTime = 0;

const loop = (now: number) => {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  // clear stuff
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 1;

  game.Update(dt);

  game.Render();

  requestAnimationFrame(loop);
}