import Vec2 from '@/core/utils/Vec2';

import Entity from '../Entity';
import System from '../System';
import DashComponent from '../components/DashComponent';
import VelocityComponent from '../components/VelocityComponent';

class DashSystem extends System {
  public override  Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const dashComponent = entity.GetComponent(DashComponent);
      const velComponent = entity.GetComponent(VelocityComponent);

      if (!dashComponent || !velComponent) continue;

      dashComponent.TickCooldown(dt);

      if (!velComponent.velocity.Equals(Vec2.Zero)) {
        dashComponent.lastDirection = velComponent.velocity;
      }

      if (dashComponent.isDashing) {
        dashComponent.dashTimeRemaining -= dt;

        if (dashComponent.dashTimeRemaining <= 0) {
          dashComponent.EndDash();
        } else {
          velComponent.velocity = dashComponent.direction.Clone().Normalize().Multiply(dashComponent.speed);
        }
      }
    }
  }
}

export default DashSystem;
