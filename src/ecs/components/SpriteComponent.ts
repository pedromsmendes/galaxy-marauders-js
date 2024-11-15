import type { ImageAssetKey } from '@/managers/AssetManager';

import Entity from '../Entity';
import Component from '../Component';

class SpriteComponent extends Component {
  public imageKey: ImageAssetKey;

  constructor(parent: Entity, imageKey: ImageAssetKey) {
    super(parent);

    this.imageKey = imageKey;
  }
}

export default SpriteComponent;
