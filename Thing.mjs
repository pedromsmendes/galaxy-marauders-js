// @ts-check

import Vec2 from './Vec2.mjs';

class Thing {
  position = new Vec2(0, 0);

  size = new Vec2(0, 0);

  color = "#ddd";

  speed = 10;

  /**
   * @param {Vec2} size
   * @param {string} color
   */
  constructor(size, color = "#ddd") {
    this.size = size;
    this.color = color;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  SetPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  /**
   * @param {Vec2} inputDirection
   */
  Update(inputDirection) {
    this.position.x += inputDirection.x * this.speed;
    this.position.y += inputDirection.y * this.speed;
  }

  /**
   * @param {CanvasRenderingContext2D } ctx
   */
  Render(ctx) {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}

export default Thing;
