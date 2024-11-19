import type Transform from '@/core/utils/Transform';

import Vec2 from '@/core/utils/Vec2';
import { EmissionShape } from '@/core/types';
import ParticleSystem from '@/effects/ParticleSystem';

class Trails {
  private parent: Transform;

  private mainOffset: Vec2;
  private leftOffset: Vec2;
  private rightOffset: Vec2;

  private mainTrail: ParticleSystem;
  private leftTrail: ParticleSystem;
  private rightTrail: ParticleSystem;

  public mainActive = true;
  public leftActive = true;
  public rightActive = true;

  constructor(parent: Transform, mainOffset: Vec2, leftOffset: Vec2, rightOffset: Vec2) {
    this.parent = parent;
    this.mainOffset = mainOffset;
    this.leftOffset = leftOffset;
    this.rightOffset = rightOffset;

    this.mainTrail = new ParticleSystem(
      Vec2.Zero,
      {
        shape: EmissionShape.Point,
        rate: 800,
        maxParticles: 800,
        offset: this.mainOffset,
      },
      {
        color: ["#bad0e6", "#2a93f5"],
        lifetime: [0.1, 0.2],
        size: [3, 6],
        velocity: [[-35, 35], [290, 300]],
      },
    );
    this.mainTrail.Start();
    this.mainTrail.SetParent(this.parent);

    this.leftTrail = new ParticleSystem(
      Vec2.Zero,
      {
        shape: EmissionShape.Point,
        rate: 300,
        maxParticles: 300,
        offset: this.leftOffset,
      },
      {
        color: ["#bad0e6", "#2a93f5"],
        lifetime: [0.1, 0.1],
        size: [2, 4],
        velocity: [[-100, -100], [100, 100]],
      },
    );
    this.leftTrail.Start();
    this.leftTrail.SetParent(this.parent);

    this.rightTrail = new ParticleSystem(
      Vec2.Zero,
      {
        shape: EmissionShape.Point,
        rate: 300,
        maxParticles: 300,
        offset: this.rightOffset,
      },
      {
        color: ["#bad0e6", "#2a93f5"],
        lifetime: [0.1, 0.1],
        size: [2, 4],
        velocity: [[100, 100], [100, 100]],
      },
    );
    this.rightTrail.Start();
    this.rightTrail.SetParent(this.parent);
  }

  public Update(dt: number): void {
    // if (this.mainActive)
    this.mainTrail.Update(dt);

    // if (this.leftActive)
    this.leftTrail.Update(dt);

    // if (this.rightActive)
    this.rightTrail.Update(dt);
  }

  public Render(ctx: CanvasRenderingContext2D) {
    if (this.mainActive)
      this.mainTrail.Render(ctx);

    if (this.leftActive)
      this.leftTrail.Render(ctx);

    if (this.rightActive)
      this.rightTrail.Render(ctx);
  }
}

export default Trails;
