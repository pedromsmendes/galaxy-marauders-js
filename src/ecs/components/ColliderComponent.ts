import Vec2 from '@/utils/Vec2';

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
  public bounce: boolean;

  public currentCollisions: Collision[] = [];
  public previousCollisions: Collision[] = [];

  constructor(parent: Entity, size: Vec2, layers: Layers, masks: Layers, bounce = false) {
    super(parent);

    this.size = size;
    this.layers = layers;
    this.masks = masks;
    this.bounce = bounce;
  }

  // we need some sort of event system
  public OnCollisionEnter(collision: Collision): void {
    console.log(`${this.entity.constructor.name} with ID: ${this.entity.ID} has collided with ${collision.collider.entity.constructor.name} with ID: ${collision.collider.entity.ID}`);
  }

  public OnCollisionExit(_collision: Collision): void {
  }
}

export default ColliderComponent;
