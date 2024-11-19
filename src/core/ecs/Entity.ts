import Component from '@/core/ecs/Component';

import type { ComponentClass } from '../types';

import Vec2 from '../utils/Vec2';
import Transform from '../utils/Transform';

abstract class Entity extends Transform {
  private static LATEST_ID = 0;

  private static GenerateNewId(): number {
    return ++Entity.LATEST_ID;
  }

  public readonly ID: number;
  private components: Map<Function, Component>;
  private isDestroyed = false;

  constructor(position: Vec2, parent?: Transform) {
    super(position, parent);

    this.components = new Map();
    this.ID = Entity.GenerateNewId();
  }

  public Update(_dt: number): void { };
  public Render(_ctx: CanvasRenderingContext2D): void { };

  public AddComponent(component: Component): void {
    this.components.set(component.constructor, component);
  }

  public AddComponents(...components: Component[]): void {
    for (const component of components) {
      this.AddComponent(component);
    }
  }

  public RemoveComponent(componentClass: ComponentClass): void {
    this.components.delete(componentClass);
  }

  public GetComponent<T extends Component>(componentClass: ComponentClass<T>): T | undefined {
    return this.components.get(componentClass) as T | undefined;
  }

  public HasComponent(componentClass: ComponentClass): boolean {
    return this.components.has(componentClass);
  }

  /** Marks entity for deletion */
  public Destroy(): void {
    this.isDestroyed = true;
  }

  public ShouldClear(): boolean {
    return this.isDestroyed;
  }
}

export default Entity;
