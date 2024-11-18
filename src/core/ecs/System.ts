import Entity from '@/core/ecs/Entity';

abstract class System {
  public Render(_ctx: CanvasRenderingContext2D, _entities: Entity[]): void { }
  public Update(_dt: number, _entities: Entity[]): void { }
}

export default System;
