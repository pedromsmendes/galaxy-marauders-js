// @ts-check

import Input from './input.mjs';
import Vec2 from './vec2.mjs';

class Thing {
  position = Vec2.Zero;

  size = Vec2.Zero;

  inputDirection = Vec2.Zero;

  color = "#ddd";

  speed = 500;

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

  /** @param {number} dt */
  ProcessInput(dt) {
    this.inputDirection.x = 0;
    this.inputDirection.y = 0;

    if (Input.keydown.w) {
      this.inputDirection.y += -1;
    }
    if (Input.keydown.s) {
      this.inputDirection.y += 1;
    }
    if (Input.keydown.a) {
      this.inputDirection.x += -1;
    }
    if (Input.keydown.d) {
      this.inputDirection.x += 1;
    }

    this.inputDirection.Normalize();
  }

  /** @param {number} dt */
  ProcessMovement(dt) {
    this.position.x += this.inputDirection.x * dt * this.speed;
    this.position.y += this.inputDirection.y * dt * this.speed;
  }

  /** @param {number} dt */
  Update(dt) {
    this.ProcessInput(dt);
    this.ProcessMovement(dt);
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
