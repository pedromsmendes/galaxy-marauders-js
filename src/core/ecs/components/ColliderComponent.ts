import Vec2 from '@/core/utils/Vec2';
import Signal from '@/core/utils/Signal';

import type { Collision } from '../types';

import Entity from '../Entity';
import Component from '../Component';

export enum Layers {
  Player = 1 << 0,
  PlayerProjectile = 1 << 1,

  Enemy = 1 << 2,
  EnemyProjectile = 1 << 3
}

class ColliderComponent extends Component {
  public size: Vec2;
  public masks: Layers;
  public layers: Layers;

  public currentCollisions: Collision[] = [];
  public previousCollisions: Collision[] = [];

  public OnCollisionEnter = new Signal<Collision>;
  public OnCollisionExit = new Signal<Collision>;

  constructor(parent: Entity, size: Vec2, layers: Layers, masks: Layers) {
    super(parent);

    this.size = size;
    this.layers = layers;
    this.masks = masks;
  }
}

export default ColliderComponent;
