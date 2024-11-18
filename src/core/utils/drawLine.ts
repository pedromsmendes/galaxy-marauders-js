import Vec2 from './Vec2';

const drawLine = (ctx: CanvasRenderingContext2D, start: Vec2, end: Vec2, color = "green") => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

export default drawLine;
