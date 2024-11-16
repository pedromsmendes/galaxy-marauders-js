import Vec2 from '@/utils/Vec2';

import type { EntityClass } from '../types';

import Entity from '../Entity';
import Component from '../Component';

class ShootComponent extends Component {
  public shootOrigin: Vec2;

  public projectile: EntityClass;

  public projectileSpeed: number;

  public isShooting = false;

  public direction: Vec2;

  public cooldown: number;

  public cooldownRemaining: number = 0;

  public projectileLifetime: number = 0;

  /**
   * @param entity
   * @param shootOrigin Should be the vector2 relative to the Entity position
   * @param projectile What entity (projectile) to shoot. Should it use its own HitboxComponent?
   * @param projectileSpeed Speed of the projectile
   * @param projectileLifetime Lifetime of the projectile. Defaults to 3
   */
  constructor(
    entity: Entity,
    shootOrigin: Vec2,
    projectile: EntityClass,
    projectileSpeed: number,
    cooldown: number,
    projectileLifetime: number = 3,
  ) {
    super(entity);

    this.shootOrigin = shootOrigin;
    this.projectile = projectile;
    this.projectileSpeed = projectileSpeed;
    this.cooldown = cooldown;
    this.projectileLifetime = projectileLifetime;
  }

  public Shoot(direction: Vec2): void {
    if (!this.CanShoot()) return;

    this.isShooting = true;
    this.direction = direction;
  }

  public CanShoot() {
    return !this.isShooting && this.cooldownRemaining <= 0;
  }

  public EndShoot() {
    this.isShooting = false;
    this.cooldownRemaining = this.cooldown;
  }

  public TickCooldown(dt: number) {
    if (this.cooldownRemaining > 0) {
      this.cooldownRemaining -= dt;
    }
  }
}

export default ShootComponent;
