import type { Bounds } from '../../types';

import Entity from '../Entity';
import Component from '../Component';

class ConfinmentComponent extends Component {
  public bounds: Bounds;
  public bounce: boolean;

  constructor(parent: Entity, bounds: Bounds, bounce = false) {
    super(parent);

    this.bounds = bounds;
    this.bounce = bounce;
  }
}

export default ConfinmentComponent;
