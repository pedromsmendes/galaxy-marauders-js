// @ts-check

import Vec2 from './vec2.mjs';

class Square {
  position = Vec2.Zero;

  size = Vec2.Zero;

  color = "#ddd";

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

  Update() {
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

export default Square;
