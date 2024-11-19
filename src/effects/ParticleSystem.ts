import Vec2 from '@/core/utils/Vec2';
import Transform from '@/core/utils/Transform';
import { drawCircle } from '@/core/utils/DrawUtils';
import { interpolateColor } from '@/core/utils/ColorUtils';
import { mapRange, randRangeFloat } from '@/core/utils/MathUtils';
import { EmissionShape, type Emission, type ParticleParams } from '@/core/types';

import Particle from './Particle';

class ParticleSystem extends Transform {
  private emission: Emission;
  private particleParams: ParticleParams;

  private particles: Particle[];
  private pool: Particle[];
  private active = false;
  private timeSinceEmission = 0;

  /**
   * @param position The initial system position
   * @param maxParticles Max particles the system will deal with
   * @param particleParams
   */
  constructor(position: Vec2, emission: Emission, particleParams: ParticleParams) {
    super(position);

    this.emission = emission;
    this.particleParams = particleParams;

    this.particles = [];
    this.pool = [];

    // filling the pool right away?
    for (let i = 0; i < this.emission.maxParticles; i++) {
      this.pool.push(new Particle());
    }
  }

  public Start(): void {
    this.active = true;
  }

  public Stop(): void {
    this.active = false;
  }

  public Update(dt: number): void {
    if (!this.active) return;

    if (!this.emission.rate) return;

    this.timeSinceEmission += dt
    const particlesToEmit = Math.floor(this.emission.rate * this.timeSinceEmission);
    this.timeSinceEmission -= particlesToEmit / this.emission.rate;

    for (let i = 0; i < particlesToEmit; i++) {
      if (!this.pool.length) break;

      const particle = this.pool.pop()!;

      this.ResetParticle(particle);

      this.particles.push(particle);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      particle.age += dt;

      if (particle.age >= particle.lifetime) {
        this.particles.splice(i, 1);
        this.pool.push(particle);
      } else {
        particle.position.Add(particle.velocity.Clone().Multiply(dt))
      }
    }
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    // DEBUG
    // drawCircle(ctx, this.position, 20, { strokeColor: "white" })

    if (!this.active) return;

    for (const particle of this.particles) {
      // ctx.globalAlpha = particle.opacity;
      ctx.globalAlpha = mapRange(
        particle.lifetime - particle.age,
        [0, particle.lifetime],
        [0, 1],
      );

      const lifetimeRation = particle.age / particle.lifetime;

      let color: string;
      if (Array.isArray(particle.color)) {
        color = interpolateColor(particle.color[0], particle.color[1], lifetimeRation);
      } else {
        color = particle.color;
      }

      drawCircle(ctx, particle.position, particle.size, { fillColor: color })
    }

    ctx.globalAlpha = 1;
  }

  private ResetParticle(particle: Particle): void {
    particle.age = 0;
    particle.lifetime = randRangeFloat(...this.particleParams.lifetime);

    particle.opacity = 1;

    particle.size = randRangeFloat(...this.particleParams.size);


    particle.position = this.GetParticlePosition().Add(this.emission.offset || Vec2.Zero);

    particle.color = this.particleParams.color;

    particle.velocity.x = randRangeFloat(...this.particleParams.velocity[0]);
    particle.velocity.y = randRangeFloat(...this.particleParams.velocity[1]);
  }

  private GetParticlePosition(): Vec2 {
    switch (this.emission.shape) {
      case EmissionShape.Line:
        return new Vec2(
          this.emission.start.x + (this.emission.end.x - this.emission.start.x) * Math.random(),
          this.emission.start.y + (this.emission.end.y - this.emission.start.y) * Math.random(),
        );

      case EmissionShape.Rectangle:
        return this.GetWorldPosition().Add(
          new Vec2(
            (Math.random() - 0.5) * this.emission.width,
            (Math.random() - 0.5) * this.emission.height,
          ),
        );

      // not implemented
      case EmissionShape.Circle:
      case EmissionShape.Point:
      default: {
        return this.GetWorldPosition();
      }
    }
  }

  private ResetSystem(): void {
    this.pool = [];
    this.particles = [];
    this.timeSinceEmission = 0;

    // filling the pool right away?
    for (let i = 0; i < this.emission.maxParticles; i++) {
      this.pool.push(new Particle());
    }
  }
}

export default ParticleSystem;
