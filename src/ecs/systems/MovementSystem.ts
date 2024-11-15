import Entity from '../Entity';
import System from '../System';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class MovementSystem extends System {
  Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const posComponent = entity.GetComponent(PositionComponent);
      const velComponent = entity.GetComponent(VelocityComponent);

      if (!posComponent || !velComponent) continue;

      posComponent.position.x += velComponent.velocity.x * dt;
      posComponent.position.y += velComponent.velocity.y * dt;
    }
  }
}

export default MovementSystem;
