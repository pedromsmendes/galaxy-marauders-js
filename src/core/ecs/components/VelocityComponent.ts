import Vec2 from '@/core/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

class VelocityComponent extends Component {
  public velocity: Vec2;

  constructor(entity: Entity, initialVel = Vec2.Zero) {
    super(entity);

    this.velocity = initialVel;
  }
}

export default VelocityComponent;
