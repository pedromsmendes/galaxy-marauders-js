import Component from '@/ecs/Component';

type ComponentClass<T extends Component = Component> = new (...args: unknown[]) => T;

abstract class Entity {
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
