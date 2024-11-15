import Entity from '../Entity';
import System from '../System';
import HealthComponent from '../components/HealthComponent';

class HealthSystem extends System {
  Update(dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const healthComponent = entity.GetComponent(HealthComponent);

      if (!healthComponent) continue;

      healthComponent.currentHealth -= dt;

      if (healthComponent.currentHealth <= 0) {
      healthComponent.currentHealth = 0;

      // EventManager.Emit(Event.EntityDeath, healthComponent);
      }
    }
  }
}

export default HealthSystem;
