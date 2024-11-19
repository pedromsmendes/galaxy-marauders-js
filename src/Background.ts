import Vec2 from './core/utils/Vec2';
import { EmissionShape } from './core/types';
import ScreenManager from './managers/ScreenManager';
import ParticleSystem from './effects/ParticleSystem';
import { randRangeFloat, randRangeInt } from './core/utils/MathUtils';
import AssetManager, { ImageAssetKey } from './managers/AssetManager';

// just prototyping
type CosmosElement = {
  position: Vec2;
  velocity: Vec2;
  imageKey: ImageAssetKey;
  scale: number;
}

type NewSize = { width: number; height: number };

const OFFSET = 30;

class Background {
  private zippingStars: ParticleSystem;
  private cosmosElements: CosmosElement[];

  private maxLeft: number;
  private maxRight: number;

  constructor() {
    const screenWidth = ScreenManager.Instance.Width;

    this.maxLeft = 0 - OFFSET;
    this.maxRight = screenWidth + OFFSET;

    this.cosmosElements = [
      this.GenerateCosmosElementParams('CosmosBaren'),
      this.GenerateCosmosElementParams('CosmosBlackHole'),
      this.GenerateCosmosElementParams('CosmosIce'),
      this.GenerateCosmosElementParams('CosmosLava'),
      this.GenerateCosmosElementParams('CosmosTerran'),
    ];

    this.zippingStars = new ParticleSystem(
      new Vec2(screenWidth / 2, -OFFSET),
      {
        shape: EmissionShape.Line,
        start: new Vec2(this.maxLeft, -OFFSET),
        end: new Vec2(this.maxRight, -OFFSET),
        maxParticles: 150,
        rate: 20,
      },
      {
        color: "#ffffff",
        lifetime: [1.5, 1.5],
        size: [1, 3],
        velocity: [[0, 0], [1000, 1000]],
      }
    );
    this.zippingStars.Start();

    ScreenManager.Instance.OnResize.Connect(this.OnScreenResize.bind(this));
  }

  public Update(dt: number): void {
    for (let i = 0; i < this.cosmosElements.length; i++) {
      this.cosmosElements[i].position.x += this.cosmosElements[i].velocity.x * dt;
      this.cosmosElements[i].position.y += this.cosmosElements[i].velocity.y * dt;

      if (this.cosmosElements[i].position.y >= ScreenManager.Instance.Height + OFFSET) {
        this.cosmosElements[i] = this.GenerateCosmosElementParams(this.cosmosElements[i].imageKey);
      }
    }

    this.zippingStars.Update(dt);
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    for (const cosmosElement of this.cosmosElements) {
      const image = AssetManager.GetImage(cosmosElement.imageKey);

      if (image) {
        ctx.drawImage(
          image,
          cosmosElement.position.x - image.width / 2,
          cosmosElement.position.y - image.height / 2,
          image.width * cosmosElement.scale,
          image.height * cosmosElement.scale,
        );
      }
    }

    this.zippingStars.Render(ctx);
  }

  private OnScreenResize({ width }: NewSize): void {
    this.maxLeft = 0 - OFFSET;
    this.maxRight = ScreenManager.Instance.Width + OFFSET;

    this.zippingStars.SetPosition(new Vec2(width / 2, -OFFSET));
    this.zippingStars.SetEmission({
      start: new Vec2(this.maxLeft, -OFFSET),
      end: new Vec2(this.maxRight, -OFFSET),
    })
  }

  private GenerateCosmosElementParams(imageKey: ImageAssetKey): CosmosElement {
    return {
      position: new Vec2(randRangeFloat(this.maxLeft, this.maxRight), randRangeFloat(-OFFSET - 300, -OFFSET)),
      velocity: Vec2.Down.Multiply(randRangeInt(-200, -500)),
      scale: randRangeFloat(0.5, 2.5),
      imageKey: imageKey,
    };
  }
}

export default Background;
