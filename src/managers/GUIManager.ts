import GUI from 'lil-gui';

class GUIManager {
  public static Instance: GUIManager | null = null;

  public gui: GUI;

  constructor() {
    /* Singleton */ {
      if (GUIManager.Instance) {
        return GUIManager.Instance
      }

      GUIManager.Instance = this;
    }

    this.gui = new GUI();
  }
}

export default GUIManager;
