import Entity from '../Entity';
import System from '../System';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class MovementSystem extends System {
  Update(dt: number, entities: Entity[]): void {
    entities.forEach((entity) => {
      if (!entity.HasComponent(PositionComponent) || !entity.HasComponent(VelocityComponent)) return;

      const posComponent = entity.GetComponent(PositionComponent);
      const velComponent = entity.GetComponent(VelocityComponent);

      posComponent.position.x += velComponent.velocity.x * dt;
      posComponent.position.y += velComponent.velocity.y * dt;
    });
  }
}

export default MovementSystem;
