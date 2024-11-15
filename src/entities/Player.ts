import Vec2 from '@/utils/Vec2';
import Entity from '@/ecs/Entity';
import InputManager from '@/managers/InputManager';
import DashComponent from '@/ecs/components/DashComponent';
import ShootComponent from '@/ecs/components/ShootComponent';
import HealthComponent from '@/ecs/components/HealthComponent';
import SpriteComponent from '@/ecs/components/SpriteComponent';
import PositionComponent from '@/ecs/components/PositionComponent';
import VelocityComponent from '@/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/ecs/components/ColliderComponent';

import ProjectileTest from './ProjectileTest';

class Player extends Entity {
  /** px/sec */
  private speed = 500;

  constructor() {
    super();

    this.AddComponents(
      new PositionComponent(this, new Vec2(window.innerWidth / 2, window.innerHeight - 100)),
      new VelocityComponent(this),
      new ColliderComponent(
        this,
        new Vec2(100, 84),
        Layers.Player,
        Layers.Enemy | Layers.EnemyProjectile,
      ),
      new HealthComponent(this, 100),
      new DashComponent(this, 1800, 0.2, 0.8),
      new ShootComponent(this, Vec2.Zero, ProjectileTest, 60, 0.1),
      new SpriteComponent(this, 'Ship'),
    );
  }

  public override Update(_dt: number): void {
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
  }
}

export default Player;
