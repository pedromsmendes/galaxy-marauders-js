import Vec2 from './utils/Vec2';
import Entity from './ecs/Entity';
import System from './ecs/System';
import Enemy from './entities/Enemy';
import Player from './entities/Player';
import DashSystem from './ecs/systems/DashSystem';
import InputManager from './managers/InputManager';
import AssetManager from './managers/AssetManager';
import ShootSystem from './ecs/systems/ShootSystem';
import CanvasManager from './managers/CanvasManager';
import HealthSystem from './ecs/systems/HealthSystem';
import SpriteSystem from './ecs/systems/SpriteSystem';
import ColliderSystem from './ecs/systems/ColliderSystem';
import MovementSystem from './ecs/systems/MovementSystem';

class Game {
  private systems: System[] = [];
  private entities: Entity[] = [];

  public player: Player;

  constructor(ctx: CanvasRenderingContext2D) {
    const assetManager = new AssetManager();

    assetManager.LoadAssets()
      .then(() => {
        new InputManager();
        new CanvasManager(ctx);

        this.systems.push(
          new MovementSystem(),
          new HealthSystem(),
          new DashSystem(),
          new ShootSystem(this),
          new ColliderSystem(200),
          new SpriteSystem(),
        );

        this.player = new Player();
        this.AddEntity(this.player)

        for (let i = 0; i < 9; i++) {
          this.AddEntity(new Enemy(new Vec2((i * 200) + 100, 50)))
        }
      })
  }

  AddEntity(entity: Entity) {
    this.entities.push(entity);
  }

  Update(dt: number): void {
    for (const entity of this.entities) {
      entity.Update(dt);
    }
    for (const system of this.systems) {
      system.Update(dt, this.entities);
    }
  }

  Render(): void {
    for (const entity of this.entities) {
      entity.Render();
    }
    for (const system of this.systems) {
      system.Render(this.entities);
    }
  }
}

export default Game;
