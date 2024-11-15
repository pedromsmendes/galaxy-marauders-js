import Game from '@/Game';

import Entity from '../Entity';
import System from '../System';
import ShootComponent from '../components/ShootComponent';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class ShootSystem extends System {
  constructor(private game: Game) {
    super();
  }

  Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const shootComponent = entity.GetComponent(ShootComponent);
      const posComponent = entity.GetComponent(PositionComponent);

      if (!shootComponent || !posComponent) return;

      shootComponent.TickCooldown(dt);

      if (shootComponent.isShooting) {
      shootComponent.EndShoot();

      // instantiating a new projectile like this feels weird, could need params
      const projectile = new shootComponent.projectile();

      const projectilePosComponent = projectile.GetComponent(PositionComponent);
      const projectileVelComponent = projectile.GetComponent(VelocityComponent);

      if (!projectilePosComponent || !projectileVelComponent) return;

      /** A vector from the position of the entity to the {@link ShootComponent.shootOrigin} */
      const originPos = posComponent.position.Clone().Add(shootComponent.shootOrigin);

      projectilePosComponent.position = originPos;

      projectileVelComponent.velocity =
        originPos.Direction(shootComponent.direction).Normalize().Multiply(shootComponent.projectileSpeed);

      this.game.AddEntity(projectile);
      }
    }
  }
}

export default ShootSystem;
