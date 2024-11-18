import Entity from './core/ecs/Entity';
import System from './core/ecs/System';
import Player from './entities/Player';
import AssetManager from './managers/AssetManager';
import InputManager from './managers/InputManager';
import DashSystem from './core/ecs/systems/DashSystem';
import ShootSystem from './core/ecs/systems/ShootSystem';
import HealthSystem from './core/ecs/systems/HealthSystem';
import SpriteSystem from './core/ecs/systems/SpriteSystem';
import ColliderSystem from './core/ecs/systems/ColliderSystem';
import LifetimeSystem from './core/ecs/systems/LifetimeSystem';
import MovementSystem from './core/ecs/systems/MovementSystem';

class Game {
  private systems: System[] = [];
  private entities: Entity[] = [];

  public player: Player;

  constructor(startGame: Function) {
    const assetManager = new AssetManager();

    assetManager.LoadAssets()
      .then(() => {
        new InputManager();

        this.systems.push(
          new MovementSystem(),
          new HealthSystem(),
          new DashSystem(),
          new ShootSystem(this),
          new ColliderSystem(200),
          new SpriteSystem(),
          new LifetimeSystem(),
        );

        this.player = new Player();
        this.AddEntity(this.player)

        // for (let i = 0; i < 5; i++) {
        //   this.AddEntity(new Enemy(new Vec2((i * 200) + 100, 100)))
        // }

        startGame();
      })
  }

  public AddEntity(entity: Entity) {
    this.entities.push(entity);
  }

  public Update(dt: number): void {
    for (const entity of this.entities) {
      entity.Update(dt);
    }
    for (const system of this.systems) {
      system.Update(dt, this.entities);
    }

    // cleanup
    this.entities = this.entities.filter((entity) => !entity.ShouldClear());
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    for (const entity of this.entities) {
      entity.Render(ctx);
    }
    for (const system of this.systems) {
      system.Render(ctx, this.entities);
    }
  }
}

export default Game;
