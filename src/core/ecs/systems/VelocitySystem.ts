import Vec2 from '@/core/utils/Vec2';

import type Entity from '../Entity';

import System from '../System';
import VelocityComponent from '../components/VelocityComponent';

class VelocitySystem extends System {
  public override Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const velocity = entity.GetComponent(VelocityComponent)?.velocity;

      if (!velocity) continue;

      const previousPos = entity.GetWorldPosition();

      entity.SetPosition(
        new Vec2(
          previousPos.x += velocity.x * dt,
          previousPos.y += velocity.y * dt,
        ),
      )
    }
  }
}

export default VelocitySystem;
