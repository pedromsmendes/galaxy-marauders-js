import Vec2 from '../core/utils/Vec2';

export type Keys = 'w' | 'a' | 's' | 'd' | 'space';
export type MouseButtons = 0 | 1 | 2 | 3 | 4;

class InputManager {
  public static Instance: InputManager | null = null;

  public static keydown: Record<Keys, boolean> = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  }

  public static mouseButtonDown: Record<MouseButtons, boolean> = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  }

  public static mousePos = new Vec2();

  constructor(parent: HTMLElement) {
    /* Singleton */ {
      if (InputManager.Instance) {
        return InputManager.Instance
      }

      InputManager.Instance = this;
    }

    window.addEventListener("keydown", (e) => {
      if (e.code.toLowerCase() === "keyw") InputManager.keydown.w = true;
      if (e.code.toLowerCase() === "keys") InputManager.keydown.s = true;
      if (e.code.toLowerCase() === "keya") InputManager.keydown.a = true;
      if (e.code.toLowerCase() === "keyd") InputManager.keydown.d = true;
      if (e.code.toLowerCase() === "space") InputManager.keydown.space = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.code.toLowerCase() === "keyw") InputManager.keydown.w = false;
      if (e.code.toLowerCase() === "keys") InputManager.keydown.s = false;
      if (e.code.toLowerCase() === "keya") InputManager.keydown.a = false;
      if (e.code.toLowerCase() === "keyd") InputManager.keydown.d = false;
      if (e.code.toLowerCase() === "space") InputManager.keydown.space = false;
    });

    parent.addEventListener("mousedown", (e) => {
      if (e.button === 0) InputManager.mouseButtonDown[0] = true;
      if (e.button === 1) InputManager.mouseButtonDown[1] = true;
      if (e.button === 2) InputManager.mouseButtonDown[2] = true;
      if (e.button === 3) InputManager.mouseButtonDown[3] = true;
      if (e.button === 4) InputManager.mouseButtonDown[4] = true;
    });

    parent.addEventListener("mouseup", (e) => {
      if (e.button === 0) InputManager.mouseButtonDown[0] = false;
      if (e.button === 1) InputManager.mouseButtonDown[1] = false;
      if (e.button === 2) InputManager.mouseButtonDown[2] = false;
      if (e.button === 3) InputManager.mouseButtonDown[3] = false;
      if (e.button === 4) InputManager.mouseButtonDown[4] = false;
    });

    parent.addEventListener("mousemove", (e) => {
      InputManager.mousePos.x = e.x;
      InputManager.mousePos.y = e.y;
    })
  }
}

export default InputManager;
