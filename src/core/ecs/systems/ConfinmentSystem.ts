import Entity from '../Entity';
import System from '../System';
import VelocityComponent from '../components/VelocityComponent';
import ColliderComponent from '../components/ColliderComponent';
import ConfinmentComponent from '../components/ConfinmentComponent';

class ConfinmentSystem extends System {
  public override Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const position = entity.GetWorldPosition();
      const confinment = entity.GetComponent(ConfinmentComponent);
      const collider = entity.GetComponent(ColliderComponent);
      const velocity = entity.GetComponent(VelocityComponent)?.velocity;

      if (!position || !confinment || !collider || (confinment.bounce && !velocity)) return;

      if (position.x <= confinment.bounds.left) {
        position.x = confinment.bounds.left;

        if (confinment.bounce) velocity!.x *= -1;
      }

      if (position.x + collider.size.x >= confinment.bounds.right) {
        position.x = confinment.bounds.right - collider.size.x;

        if (confinment.bounce) velocity!.x *= -1;
      }

      if (position.y <= confinment.bounds.top) {
        position.y = confinment.bounds.top;

        if (confinment.bounce) velocity!.y *= -1;
      }

      if (position.y + collider.size.y >= confinment.bounds.bottom) {
        position.y = confinment.bounds.bottom - collider.size.y;

        if (confinment.bounce) velocity!.y *= -1;
      }
    }
  }
}

export default ConfinmentSystem;
