import Entity from '../Entity';
import Component from '../Component';

class LifetimeComponent extends Component {
  public readonly lifetime: number;
  public age: number;

  constructor(parent: Entity, lifetime: number) {
    super(parent);

    this.lifetime = lifetime;
    this.age = 0;
  }
}

export default LifetimeComponent;
