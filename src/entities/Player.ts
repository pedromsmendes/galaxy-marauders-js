import Vec2 from '@/core/utils/Vec2';
import Entity from '@/core/ecs/Entity';
import { Collision } from '@/core/types';
import InputManager from '@/managers/InputManager';
import ParticleSystem from '@/effects/ParticleSystem';
import DashComponent from '@/core/ecs/components/DashComponent';
import ShootComponent from '@/core/ecs/components/ShootComponent';
import HealthComponent from '@/core/ecs/components/HealthComponent';
import SpriteComponent from '@/core/ecs/components/SpriteComponent';
import PositionComponent from '@/core/ecs/components/PositionComponent';
import VelocityComponent from '@/core/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/core/ecs/components/ColliderComponent';

import ProjectileTest from './ProjectileTest';

class Player extends Entity {
  /** px/sec */
  private speed = 500;

  private trail: ParticleSystem;

  constructor() {
    super();

    const healthComponent = new HealthComponent(this, 100);
    const colliderComponent = new ColliderComponent(
      this,
      new Vec2(100, 84),
      Layers.Player,
      Layers.Enemy | Layers.EnemyProjectile,
    );

    healthComponent.OnDeath.Connect(this.OnDeath.bind(this));
    colliderComponent.OnCollisionEnter.Connect(this.OnCollisionEnter.bind(this));

    const initialPos = new Vec2(window.innerWidth / 2, window.innerHeight - 100);

    this.AddComponents(
      new PositionComponent(this, initialPos),
      new VelocityComponent(this),
      healthComponent,
      colliderComponent,
      new DashComponent(this, 1800, 0.2, 0.8),
      new ShootComponent(this, Vec2.Zero, ProjectileTest, 1500, 0.05),
      new SpriteComponent(this, 'Ship'),
    );

    this.trail = new ParticleSystem(
      initialPos.Clone(),
      200,
      500,
      {
        color: "lightgray",
        lifetime: [0.5, 1],
        radius: [2, 4],
        velocity: [[-10, 10], [125, 150]],
      }
    );

    this.trail.Start();
    this.trail.SetParent(this);
  }

  public override Update(dt: number): void {
    const positionComponent = this.GetComponent(PositionComponent);
    const velocityComponent = this.GetComponent(VelocityComponent);
    if (!positionComponent || !velocityComponent) return;

    const dashComponent = this.GetComponent(DashComponent);
    if (dashComponent) {
      if (InputManager.keydown.space) {
        dashComponent.Dash(velocityComponent.velocity);
      }
    }

    if (!dashComponent?.isDashing) {
      velocityComponent.velocity = Vec2.Zero;

      if (InputManager.keydown.w) {
        velocityComponent.velocity.y -= this.speed;
      }
      if (InputManager.keydown.s) {
        velocityComponent.velocity.y += this.speed;
      }
      if (InputManager.keydown.a) {
        velocityComponent.velocity.x -= this.speed;
      }
      if (InputManager.keydown.d) {
        velocityComponent.velocity.x += this.speed;
      }
    }

    const shootComponent = this.GetComponent(ShootComponent);
    if (shootComponent) {
      if (InputManager.mouseButtonDown[0]) {
        shootComponent.Shoot(new Vec2(positionComponent.position.x,));
      }
    }

    this.trail.Update(dt);
  }

  public override Render(ctx: CanvasRenderingContext2D): void {
    this.trail.Render(ctx);
  }

  private OnCollisionEnter(collision: Collision): void {
    if (collision.collider.layers & (Layers.Enemy | Layers.EnemyProjectile)) {
      this.GetComponent(HealthComponent)?.Damage(25);
    }
  }

  private OnDeath(): void {
    this.Clear();
  }
}

export default Player;
