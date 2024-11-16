import Entity from '../Entity';
import Component from '../Component';

class LifetimeComponent extends Component {
  public readonly maxLifetime: number;
  public lifetime: number;

  constructor(parent: Entity, maxLifetime: number) {
    super(parent);

    this.maxLifetime = maxLifetime;
    this.lifetime = 0;
  }
}

export default LifetimeComponent;
