// @ts-check

import Vec2 from './vec2.mjs';

/** @typedef {'w' | 'a' | 's' | 'd'} Keys */

/** @typedef {0 | 1 | 2 | 3 | 4} MouseButtons */

class Input {
  /** @type {Input | null} */
  static Instance = null;

  /** @type {Record<Keys, boolean>} */
  static keydown = {
    w: false,
    a: false,
    s: false,
    d: false,
  }

  /** @type {Record<MouseButtons, boolean>} */
  static mouseButtonDown = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  }

  static mousePos = new Vec2();

  constructor() {
    /* Singleton */ {
      if (Input.Instance) {
        return Input.Instance
      }

      Input.Instance = this;
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "w") Input.keydown.w = true;
      if (e.key === "s") Input.keydown.s = true;
      if (e.key === "a") Input.keydown.a = true;
      if (e.key === "d") Input.keydown.d = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "w") Input.keydown.w = false;
      if (e.key === "s") Input.keydown.s = false;
      if (e.key === "a") Input.keydown.a = false;
      if (e.key === "d") Input.keydown.d = false;
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button === 0) Input.mouseButtonDown[0] = true;
      if (e.button === 1) Input.mouseButtonDown[1] = true;
      if (e.button === 2) Input.mouseButtonDown[2] = true;
      if (e.button === 3) Input.mouseButtonDown[3] = true;
      if (e.button === 4) Input.mouseButtonDown[4] = true;
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button === 0) Input.mouseButtonDown[0] = false;
      if (e.button === 1) Input.mouseButtonDown[1] = false;
      if (e.button === 2) Input.mouseButtonDown[2] = false;
      if (e.button === 3) Input.mouseButtonDown[3] = false;
      if (e.button === 4) Input.mouseButtonDown[4] = false;
    });

    window.addEventListener("mousemove", (e) => {
      Input.mousePos.x = e.x;
      Input.mousePos.y = e.y;
    })
  }
}

export default Input;
