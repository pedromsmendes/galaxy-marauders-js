import type Vec2 from '@/core/utils/Vec2';

import type Entity from './ecs/Entity';
import type Component from './ecs/Component';
import type ColliderComponent from './ecs/components/ColliderComponent';

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

export type Range = [number, number];