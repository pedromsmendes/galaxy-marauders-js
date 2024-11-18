import type Vec2 from '@/core/utils/Vec2';

import type Entity from './Entity';
import type Component from './Component';
import type ColliderComponent from './components/ColliderComponent';

export type ComponentClass<T extends Component = Component> = new (...args: unknown[]) => T;

export type EntityClass = new (...args: unknown[]) => Entity;

export type Bounds = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type Collision = {
  collider: ColliderComponent;
  normal: Vec2;
  depth: number;
};
