import Vec2 from './core/utils/Vec2';
import { EmissionShape } from './core/types';
import ScreenManager from './managers/ScreenManager';
import ParticleSystem from './effects/ParticleSystem';

type NewSize = { width: number; height: number };

const OFFSET = 30;

class Background {
  private zippingStars: ParticleSystem;

  constructor() {
    const screenWidth = ScreenManager.Instance.Width;

    this.zippingStars = new ParticleSystem(
      new Vec2(screenWidth / 2, -OFFSET),
      {
        shape: EmissionShape.Line,
        start: new Vec2(-OFFSET, -OFFSET),
        end: new Vec2(screenWidth + OFFSET, -OFFSET),
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
    this.zippingStars.Update(dt);

  }

  public Render(ctx: CanvasRenderingContext2D): void {
    this.zippingStars.Render(ctx);
  }

  public OnScreenResize({ width }: NewSize): void {
    this.zippingStars.SetPosition(new Vec2(width / 2, -OFFSET));
    this.zippingStars.SetEmission({
      start: new Vec2(-OFFSET, -OFFSET),
      end: new Vec2(width + OFFSET, -OFFSET),
    })
  }
}

export default Background;
