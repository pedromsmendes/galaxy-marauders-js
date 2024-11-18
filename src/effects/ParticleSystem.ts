import Vec2 from '@/core/utils/Vec2';
import { Range } from '@/core/types';
import Entity from '@/core/ecs/Entity';
import drawCircle from '@/core/utils/drawCircle';
import { interpolateColor } from '@/core/utils/ColorUtils';
import { mapRange, randRangeFloat } from '@/core/utils/MathUtils';
import PositionComponent from '@/core/ecs/components/PositionComponent';

import Particle from './Particle';

type ParticleParams = {
  /** Initial velocity X and velocity Y */
  velocity: [Range<number>, Range<number>];
  color: string | Range<string>;
  radius: Range<number>;
  lifetime: Range<number>;
};

class ParticleSystem {
  private position: Vec2;
  private emissionRate: number;
  private emissionOffset: Vec2;
  private maxParticles: number;
  private particleParams: ParticleParams;
  private parent?: Entity;

  private particles: Particle[];
  private pool: Particle[];
  private active = false;
  private timeSinceEmission = 0;

  /**
   *
   * @param position The initial system position
   * @param emissionRate Number of particles to spawn per second
   * @param emissionOffset
   * @param maxParticles Max particles the system will deal with
   * @param particleParams
   */
  constructor(position: Vec2, emissionRate: number, emissionOffset: Vec2, maxParticles: number, particleParams: ParticleParams) {
    this.position = position;
    this.emissionRate = emissionRate;
    this.emissionOffset = emissionOffset;
    this.maxParticles = maxParticles;
    this.particleParams = particleParams;

    this.particles = [];
    this.pool = [];

    // filling the pool right away?
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool.push(new Particle());
    }
  }

  public Start(): void {
    this.active = true;
  }

  public Stop(): void {
    this.active = false;
  }

  public SetParent(parent?: Entity): void {
    this.parent = parent;
  }

  public Update(dt: number): void {
    if (!this.active) return;

    if (this.parent) {
      const parentPos = this.parent.GetComponent(PositionComponent)?.position;
      if (parentPos) {
        this.position = parentPos.Clone();
      }
    }

    this.timeSinceEmission += dt
    const particlesToEmit = Math.floor(this.emissionRate * this.timeSinceEmission);
    this.timeSinceEmission -= particlesToEmit / this.emissionRate;

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
    drawCircle(ctx, this.position, 20, { strokeColor: "white" })

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

      drawCircle(ctx, particle.position, particle.radius, { fillColor: color })
    }

    ctx.globalAlpha = 1;
  }

  private ResetParticle(particle: Particle): void {
    particle.age = 0;
    particle.lifetime = randRangeFloat(...this.particleParams.lifetime);

    particle.opacity = 1;

    particle.radius = randRangeFloat(...this.particleParams.radius);

    particle.position = this.position.Clone().Add(this.emissionOffset);

    particle.color = this.particleParams.color;

    particle.velocity.x = randRangeFloat(...this.particleParams.velocity[0]);
    particle.velocity.y = randRangeFloat(...this.particleParams.velocity[1]);
  }
}

export default ParticleSystem;
