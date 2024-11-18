import Vec2 from './Vec2';

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  pos: Vec2,
  radius: number,
  color: {
    strokeColor?: string,
    fillColor?: string,
  },
) => {
  ctx.beginPath();
  ctx.arc(
    pos.x,
    pos.y,
    radius,
    0,
    Math.PI * 2,
  );
  if (color.strokeColor) {
    ctx.strokeStyle = color.strokeColor;
    ctx.stroke();
  }

  if (color.fillColor) {
    ctx.fillStyle = color.fillColor;
    ctx.fill();
  };
};

export default drawCircle;
