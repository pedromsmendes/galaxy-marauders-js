import Entity from '../Entity';
import Component from '../Component';

class HealthComponent extends Component {
  public currentHealth: number;

  public readonly maxHealth: number;

  constructor(entity: Entity, maxHealth: number) {
    super(entity);

    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;
  }
}

export default HealthComponent;
