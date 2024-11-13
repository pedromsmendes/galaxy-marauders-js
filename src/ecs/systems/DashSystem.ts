import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import System from '../System';
import DashComponent from '../components/DashComponent';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class DashSystem extends System {
  Update(dt: number, entities: Entity[]): void {
    entities.forEach(entity => {
      if (
        !entity.HasComponent(DashComponent)
        || !entity.HasComponent(VelocityComponent)
        || !entity.HasComponent(PositionComponent)
      ) return;

      const dashComponent = entity.GetComponent(DashComponent);
      const velComponent = entity.GetComponent(VelocityComponent);

      dashComponent.TickCooldown(dt);
      if (!velComponent.velocity.Equals(Vec2.Zero)) {
        dashComponent.lastDirection = velComponent.velocity;
      }

      if (dashComponent.isDashing) {
        dashComponent.dashTimeRemaining -= dt;

        if (dashComponent.dashTimeRemaining <= 0) {
          dashComponent.EndDash();
        } else {
          velComponent.velocity = dashComponent.direction.Clone().Normalize().Multiply(dashComponent.dashSpeed);
        }
      }
    });
  }
}

export default DashSystem;
