import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

type EntityClass = new (...args: unknown[]) => Entity;

class ShootComponent extends Component {
  public shootOrigin: Vec2;

  public projectile: EntityClass;

  public projectileSpeed: number;

  public isShooting = false;

  public direction: Vec2;

  /**
   * @param entity
   * @param shootOrigin Should be the vector2 relative to the Entity position
   * @param projectile What entity (projectile) to shoot. Should it use its own HitboxComponent?
   * @param projectileSpeed Speed of the projectile
   */
  constructor(entity: Entity, shootOrigin: Vec2, projectile: EntityClass, projectileSpeed: number) {
    super(entity);

    this.shootOrigin = shootOrigin;
    this.projectile = projectile;
    this.projectileSpeed = projectileSpeed;
  }

  public Shoot(direction: Vec2): void {
    this.isShooting = true;
    this.direction = direction;
  }
}

export default ShootComponent;
