import Vec2 from '@/utils/Vec2';
import Component from '@/ecs/Component';

abstract class Entity {
  private position: Vec2 = Vec2.Zero;

  private components: Map<Function, Component>;

  constructor() {
    this.components = new Map();
  }

  public abstract Update(dt: number): void;
  public abstract Render(ctx: CanvasRenderingContext2D): void;

  public AddComponent(component: Component): void {
    this.components.set(component.constructor, component);
  }

  public AddComponents(...components: Component[]) {
    components.forEach(component => this.AddComponent(component));
  }

  public RemoveComponent(componentClass: new (...args: unknown[]) => Component): void {
    this.components.delete(componentClass);
  }

  public GetComponent<T extends Component>(componentClass: new (...args: unknown[]) => T): T | undefined {
    return this.components.get(componentClass) as T;
  }

  public HasComponent(componentClass: new (...args: unknown[]) => Component): boolean {
    return this.components.has(componentClass);
  }
}

export default Entity;
