import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

class PositionComponent extends Component {
  public position: Vec2;

  constructor(entity: Entity, initialPos = Vec2.Zero) {
    super(entity);

    this.position = initialPos;
  }
}

export default PositionComponent;
