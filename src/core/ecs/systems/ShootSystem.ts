import Game from '@/Game';

import Entity from '../Entity';
import System from '../System';
import ShootComponent from '../components/ShootComponent';
import VelocityComponent from '../components/VelocityComponent';
import LifetimeComponent from '../components/LifetimeComponent';

class ShootSystem extends System {
  constructor(private game: Game) {
    super();
  }

  public override Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const shootComponent = entity.GetComponent(ShootComponent);
      const position = entity.GetWorldPosition();

      if (!shootComponent || !position) return;

      shootComponent.TickCooldown(dt);

      if (shootComponent.isShooting) {
        shootComponent.EndShoot();

        // instantiating a new projectile like this feels weird, could need params
        const projectile = new shootComponent.projectile();
        if (!projectile.HasComponent(LifetimeComponent)) {
          // add lifetime component so projectile despawns
          projectile.AddComponent(new LifetimeComponent(projectile, shootComponent.projectileLifetime));
        }

        const projectileVelComponent = projectile.GetComponent(VelocityComponent);

        if (!projectileVelComponent) return;

        /** A vector from the position of the entity to the {@link ShootComponent.shootOrigin} */
        const originPos = position.Clone().Add(shootComponent.shootOrigin);

        projectile.SetPosition(originPos);

        projectileVelComponent.velocity =
          originPos.Direction(shootComponent.direction).Normalize().Multiply(shootComponent.projectileSpeed);

        this.game.AddEntity(projectile);
      }
    }
  }
}

export default ShootSystem;
