import Rect from './Rect';
import Vec2 from './utils/Vec2';
import Entity from './ecs/Entity';
import System from './ecs/System';
import Player from './ecs/entities/Player';
import { randRangeInt } from './utils/random';
import DashSystem from './ecs/systems/DashSystem';
import InputManager from './managers/InputManager';
import ShootSystem from './ecs/systems/ShootSystem';
import HealthSystem from './ecs/systems/HealthSystem';
import ColliderSystem from './ecs/systems/ColliderSystem';
import MovementSystem from './ecs/systems/MovementSystem';
import ConfinmentSystem from './ecs/systems/ConfinmentSystem';

class Game {
  private systems: System[] = [];
  private entities: Entity[] = [];

  public player: Player;

  constructor() {
    new InputManager();

    this.systems.push(
      new MovementSystem(),
      new HealthSystem(),
      new DashSystem(),
      new ShootSystem(this),
      new ColliderSystem(200),
      new ConfinmentSystem(),
    );

    for (let i = 0; i < 500; i++) {
      const randomSize = new Vec2(randRangeInt(25, 50), randRangeInt(25, 50));

      const randomPos = new Vec2(
        randRangeInt(randomSize.x / 2, window.innerWidth - randomSize.x / 2 ),
        randRangeInt(randomSize.y / 2, window.innerHeight - randomSize.y / 2 ),
      );

      const randomColor = [
        "green",
        "blue",
        "yellow",
        "red",
        "purple",
        "orange",
      ][randRangeInt(0, 5)];

      this.AddEntity(new Rect(randomPos, randomSize, randomColor));
    }
  }

  AddEntity(entity: Entity) {
    this.entities.push(entity);
  }

  Update(dt: number): void {
    this.entities.forEach(entity => entity.Update(dt));
    this.systems.forEach(system => system.Update(dt, this.entities));
  }

  Render(ctx: CanvasRenderingContext2D): void {
    // debuggy
    // colliderSystem.Render(ctx);

    this.entities.forEach(entity => entity.Render(ctx));
  }
}

export default Game;
