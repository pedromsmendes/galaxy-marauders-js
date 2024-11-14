import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

export enum Layers {
  Player = 1 << 0,
  PlayerProjectile = 1 << 1,

  Enemy = 1 << 2,
  EnemyProjectile = 1 << 3,
}

class ColliderComponent extends Component {
  public size: Vec2;
  public masks: Layers;
  public layers: Layers;

  public currentCollisions: ColliderComponent[] = [];
  public previousCollisions: ColliderComponent[] = [];

  constructor(parent: Entity, size: Vec2, layers: Layers, masks: Layers) {
    super(parent);

    this.size = size;
    this.layers = layers;
    this.masks = masks;
  }

  // we need some sort of event system
  public OnCollisionEnter(_other: ColliderComponent): void {
    this.entity.broIsColliding = true;
  }

  public OnCollisionExit(_other: ColliderComponent): void {
    this.entity.broIsColliding = false;
  }
}

export default ColliderComponent;
