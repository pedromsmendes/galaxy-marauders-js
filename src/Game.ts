import Entity from './ecs/Entity';
import System from './ecs/System';
import Player from './ecs/entities/Player';
import DashSystem from './ecs/systems/DashSystem';
import InputManager from './managers/InputManager';
import EventManager from './managers/EventManager';
import HealthSystem from './ecs/systems/HealthSystem';
import MovementSystem from './ecs/systems/MovementSystem';

class Game {
  private systems: System[] = [];
  private entities: Entity[] = [];

  public player: Player;

  constructor() {
    new InputManager();
    new EventManager();

    this.systems.push(
      new MovementSystem(),
      new HealthSystem(),
      new DashSystem(),
    );

    this.player = new Player();
    this.AddEntity(this.player);
  }

  AddEntity(entity: Entity) {
    this.entities.push(entity);
  }

  Update(dt: number): void {
    this.entities.forEach(entity => entity.Update(dt));
    this.systems.forEach(system => system.Update(dt, this.entities));
  }

  Render(ctx: CanvasRenderingContext2D): void {
    this.entities.forEach(entity => entity.Render(ctx));
  }
}

export default Game;
