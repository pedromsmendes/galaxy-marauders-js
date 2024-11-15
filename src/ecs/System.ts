import Entity from '@/ecs/Entity';

abstract class System {
  public Render(_entities: Entity[]): void { }
  public Update(_dt: number, _entities: Entity[]): void { }
}

export default System;
