import Vec2 from '@/core/utils/Vec2';
import { Range } from '@/core/types';
import Entity from '@/core/ecs/Entity';
import GUIManager from '@/managers/GUIManager';
import { drawCircle } from '@/core/utils/DrawUtils';
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
  public emissionRate: number;
  private emissionOffset: Vec2;
  public maxParticles: number;
  public particleParams: ParticleParams;
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

    const gui = GUIManager.Instance!.gui.addFolder("Particle system");

    gui.add(this, "emissionRate").min(0).max(5000).step(100).name("Emission rate");
    gui.add(this, "maxParticles").min(0).max(10000).step(200).name("Max particles")
      .onFinishChange(() => {
        this.ResetSystem();
      });

    gui.add(this.particleParams.lifetime, "0").min(0).max(60).step(1).name("Life time min");
    gui.add(this.particleParams.lifetime, "1").min(0).max(60).step(1).name("Life time max");

    gui.add(this.particleParams.radius, "0").min(0).max(100).step(1).name("Radius min");
    gui.add(this.particleParams.radius, "1").min(0).max(100).step(1).name("Radius max");

    gui.add(this.particleParams.velocity[0], "0").min(-500).max(500).step(1).name("Velocity x min");
    gui.add(this.particleParams.velocity[0], "1").min(-500).max(500).step(1).name("Velocity x max");
    gui.add(this.particleParams.velocity[1], "1").min(-500).max(500).step(1).name("Velocity y min");
    gui.add(this.particleParams.velocity[1], "0").min(-500).max(500).step(1).name("Velocity y max");

    if (Array.isArray(this.particleParams.color)) {
      gui.addColor(this.particleParams.color, "0").name("Color start");
      gui.addColor(this.particleParams.color, "1").name("Color end");
    } else {
      gui.addColor(this.particleParams, "color").name("Color");
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

    if (!this.emissionRate) return;

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

  private ResetSystem(): void {
    this.pool = [];
    this.particles = [];
    this.timeSinceEmission = 0;

    // filling the pool right away?
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool.push(new Particle());
    }
  }
}

export default ParticleSystem;
