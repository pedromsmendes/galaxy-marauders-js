import Vec2 from '@/core/utils/Vec2';
import Entity from '@/core/ecs/Entity';
import { Collision } from '@/core/types';
import InputManager from '@/managers/InputManager';
import DashComponent from '@/core/ecs/components/DashComponent';
import ShootComponent from '@/core/ecs/components/ShootComponent';
import HealthComponent from '@/core/ecs/components/HealthComponent';
import SpriteComponent from '@/core/ecs/components/SpriteComponent';
import VelocityComponent from '@/core/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/core/ecs/components/ColliderComponent';

import Trails from './Trails';
import ProjectileTest from '../ProjectileTest';

class Player extends Entity {
  /** px/sec */
  private speed = 500;

  private trails: Trails;

  constructor() {
    const initialPos = new Vec2(window.innerWidth / 2, window.innerHeight - 250);

    super(initialPos);

    const size = new Vec2(100, 84);

    const healthComponent = new HealthComponent(this, 100);
    const colliderComponent = new ColliderComponent(
      this,
      size,
      Layers.Player,
      Layers.Enemy | Layers.EnemyProjectile,
    );

    healthComponent.OnDeath.Connect(this.OnDeath.bind(this));
    colliderComponent.OnCollisionEnter.Connect(this.OnCollisionEnter.bind(this));

    this.AddComponents(
      new VelocityComponent(this),
      healthComponent,
      colliderComponent,
      new DashComponent(this, 1800, 0.2, 0.8),
      new ShootComponent(this, Vec2.Zero, ProjectileTest, 1500, 0.3, 1),
      new SpriteComponent(this, 'Ship'),
    );

    this.trails = new Trails(
      this,
      new Vec2(0, 25),
      new Vec2(-35, 5),
      new Vec2(35, 5),
    );
  }

  public override Update(dt: number): void {
    const velocityComponent = this.GetComponent(VelocityComponent);
    if (!velocityComponent) return;

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

      this.trails.leftActive = InputManager.keydown.d;
      this.trails.rightActive = InputManager.keydown.a;
    }

    const shootComponent = this.GetComponent(ShootComponent);
    if (shootComponent) {
      if (InputManager.mouseButtonDown[0]) {
        const position = this.GetWorldPosition();
        shootComponent.Shoot(new Vec2(position.x, 1));
      }
    }

    this.trails.Update(dt);
  }

  public override Render(ctx: CanvasRenderingContext2D): void {
    this.trails.Render(ctx);
  }

  private OnCollisionEnter(collision: Collision): void {
    if (collision.collider.layers & (Layers.Enemy | Layers.EnemyProjectile)) {
      this.GetComponent(HealthComponent)?.Damage(25);
    }
  }

  private OnDeath(): void {
    this.Destroy();
  }
}

export default Player;
