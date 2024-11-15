import shipFile from "@/assets/images/ship.png";
import algaeFile from "@/assets/images/algae.png";

export const ImageAsset = {
  Ship: shipFile,
  Algae: algaeFile,
}

export type ImageAssetKey = keyof typeof ImageAsset;

class AssetManager {
  public static Instance: AssetManager | null = null;

  private static images: Map<ImageAssetKey, HTMLImageElement> = new Map();

  constructor() {
    /* Singleton */ {
      if (AssetManager.Instance) {
        return AssetManager.Instance
      }

      AssetManager.Instance = this;
    }
  }

  public async LoadAssets(): Promise<void> {
    const keys = Object.keys(ImageAsset) as ImageAssetKey[];

    for (const key of keys) {
      if (AssetManager.images.get(key)) continue;

      const img = await this.LoadImg(ImageAsset[key]);

      AssetManager.images.set(key, img);
    }
  }

  public static GetImage(key: ImageAssetKey): HTMLImageElement | undefined {
    return AssetManager.images.get(key);
  }

  private LoadImg(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;

      img.onload = () => resolve(img);

      img.onerror = (err) => {
        console.error("Failed to lad image with path: " + path)
        reject(err);
      };
    });
  };
};

export default AssetManager;
