// @ts-check

import Thing from './thing.mjs';
import Vec2 from './vec2.mjs';
import Input from './input.mjs';
import Square from './square.mjs';

class Game {
  thing = new Thing(new Vec2(100, 100), '#f00');
  mouseThing = new Square(new Vec2(100, 100), '#0f0');

  constructor() {
    new Input();
  }

  /** @param {number} dt */
  Update(dt) {
    this.mouseThing.SetPosition(
      Input.mousePos.x - this.mouseThing.size.x / 2,
      Input.mousePos.y - this.mouseThing.size.y / 2,
    );

    this.thing.Update(dt);
    this.mouseThing.Update();
  }

  /**
   * @param {CanvasRenderingContext2D } ctx
   */
  Render(ctx) {
    this.thing.Render(ctx);
    this.mouseThing.Render(ctx);
  }
}

export default Game;
