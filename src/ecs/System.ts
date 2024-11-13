import Entity from '@/ecs/Entity';

abstract class System {
  abstract Update(dt: number, entities: Entity[]): void;
}

export default System;
