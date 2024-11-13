import Entity from './Entity';

abstract class Component {
  public entity: Entity;

  constructor(parentEntity: Entity) {
    this.entity = parentEntity;
  }
}

export default Component;
