import Entity from '../Entity';
import System from '../System';
import LifetimeComponent from '../components/LifetimeComponent';

class LifetimeSystem extends System {
  public override Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const lifetimeComponent = entity.GetComponent(LifetimeComponent);

      if (!lifetimeComponent) continue;

      lifetimeComponent.lifetime += dt;

      if (lifetimeComponent.lifetime >= lifetimeComponent.maxLifetime) {
        lifetimeComponent.entity.Clear();
      }
    }
  }
}

export default LifetimeSystem;
