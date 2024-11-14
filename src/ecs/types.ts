import type Entity from './Entity';
import type Component from './Component';

export type ComponentClass<T extends Component = Component> = new (...args: unknown[]) => T;

export type EntityClass = new (...args: unknown[]) => Entity;

export type Bounds = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}