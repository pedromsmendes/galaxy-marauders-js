class CanvasManager {
  public static Instance: CanvasManager | null = null;

  public static ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    /* Singleton */ {
      if (CanvasManager.Instance) {
        return CanvasManager.Instance
      }

      CanvasManager.Instance = this;
    }

    CanvasManager.ctx = ctx;
  }
}

export default CanvasManager