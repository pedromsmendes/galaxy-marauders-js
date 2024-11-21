import type Vec2 from '@/core/utils/Vec2';

import type Entity from './ecs/Entity';
import type Component from './ecs/Component';
import type State from './stateMachine/State';
import type StateMachine from './stateMachine/StateMachine';
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

export type Range<T extends number | string> = [T, T];

export enum EmissionShape {
  Point,
  Line,
  Rectangle,
  Circle,
}

export type PointEmission = {
  shape: EmissionShape.Point;
};

export type LineEmission = {
  shape: EmissionShape.Line;
  start: Vec2;
  end: Vec2;
};

export type RectangleEmission = {
  shape: EmissionShape.Rectangle;
  width: number;
  height: number;
};

export type CircleEmission = {
  shape: EmissionShape.Circle;
  radius: number;
};

export type CommonEmission = {
  rate: number;
  offset?: Vec2;
  maxParticles: number;
};

export type Emission = CommonEmission & (PointEmission | LineEmission | RectangleEmission | CircleEmission);

export type ParticleParams = {
  /** Initial velocity X and velocity Y */
  velocity: [Range<number>, Range<number>];
  color: string | Range<string>;
  size: Range<number>;
  lifetime: Range<number>;
};

export type StateId = string | symbol;

export type StateConstructor<TStateId extends StateId> = new (stateMachine: StateMachine<TStateId>) => State<TStateId>;