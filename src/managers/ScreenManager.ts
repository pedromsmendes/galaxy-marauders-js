import Signal from '@/core/utils/Signal';

class ScreenManager {
  private static _instance: ScreenManager;
  public static get Instance() {
    if (!ScreenManager._instance) {
      throw new Error("Forgot to initialize ScreenManager");
    }

    return ScreenManager._instance;
  }

  public OnResize: Signal<{ width: number; height: number }>;

  public get Width() { return this.width }
  public get Height() { return this.height }

  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    /* Singleton */ {
      if (ScreenManager._instance) {
        return ScreenManager._instance;
      }

      ScreenManager._instance = this;
    }

    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.OnResize = new Signal();

    window.addEventListener("resize", this.OnWindowResize.bind(this));
  }

  private OnWindowResize(_evt: UIEvent): void {
    // resize the canvas to fit screen
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // set new screen values
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // emit resize event
    this.OnResize.Emit({ width: this.width, height: this.height })
  }
}

export default ScreenManager;
