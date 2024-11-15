import Component from '@/ecs/Component';

import type { ComponentClass } from './types';

abstract class Entity {
  private static LATEST_ID = 0;
  private static get NewId() { return ++Entity.LATEST_ID; }

  public static get LatestId() { return Entity.LATEST_ID; }

  private components: Map<Function, Component>;

  public readonly ID: number;


  constructor() {
    this.components = new Map();
    this.ID = Entity.NewId;
  }

  public abstract Update(dt: number): void;
  public abstract Render(ctx: CanvasRenderingContext2D): void;

  public AddComponent(component: Component): void {
    this.components.set(component.constructor, component);
  }

  public AddComponents(...components: Component[]) {
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
}

export default Entity;
