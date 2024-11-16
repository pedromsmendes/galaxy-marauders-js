import Vec2 from '@/utils/Vec2';
import Entity from '@/ecs/Entity';
import { Collision } from '@/ecs/types';
import ShootComponent from '@/ecs/components/ShootComponent';
import HealthComponent from '@/ecs/components/HealthComponent';
import SpriteComponent from '@/ecs/components/SpriteComponent';
import PositionComponent from '@/ecs/components/PositionComponent';
import VelocityComponent from '@/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/ecs/components/ColliderComponent';

import ProjectileTest from './ProjectileTest';

class Enemy extends Entity {
  constructor(initialPos?: Vec2) {
    super();

    const healthComponent = new HealthComponent(this, 100);
    const colliderComponent = new ColliderComponent(
      this,
      new Vec2(80, 64),
      Layers.Enemy,
      Layers.Player | Layers.PlayerProjectile,
    );

    colliderComponent.OnCollisionEnter.Connect(this.OnCollisionEnter.bind(this));
    healthComponent.OnDeath.Connect(this.OnDeath.bind(this));

    this.AddComponents(
      new PositionComponent(this, initialPos || new Vec2(window.innerWidth / 2, window.innerHeight - 100)),
      new VelocityComponent(this),
      healthComponent,
      new ShootComponent(this, Vec2.Zero, ProjectileTest, 1000, 0.2),
      new SpriteComponent(this, 'Algae'),
      colliderComponent,
    )
  }

  private OnCollisionEnter(collision: Collision): void {
    if (collision.collider.layers & (Layers.Player | Layers.PlayerProjectile)) {
      this.GetComponent(HealthComponent)?.Damage(10);
    }
  }

  private OnDeath(): void {
    this.Clear();
  }
}

export default Enemy;
