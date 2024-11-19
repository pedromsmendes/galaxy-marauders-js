import Vec2 from './core/utils/Vec2';
import Entity from './core/ecs/Entity';
import System from './core/ecs/System';
import { EmissionShape } from './core/types';
import Player from './entities/Player/Player';
import GUIManager from './managers/GUIManager';
import AssetManager from './managers/AssetManager';
import InputManager from './managers/InputManager';
import ParticleSystem from './effects/ParticleSystem';
import DashSystem from './core/ecs/systems/DashSystem';
import ShootSystem from './core/ecs/systems/ShootSystem';
import HealthSystem from './core/ecs/systems/HealthSystem';
import SpriteSystem from './core/ecs/systems/SpriteSystem';
import ColliderSystem from './core/ecs/systems/ColliderSystem';
import LifetimeSystem from './core/ecs/systems/LifetimeSystem';
import VelocitySystem from './core/ecs/systems/VelocitySystem';

class Game {
  private systems: System[] = [];
  private entities: Entity[] = [];
  private zippingStars: ParticleSystem;
  public player: Player;

  constructor(canvas: HTMLCanvasElement, startGame: Function) {
    const assetManager = new AssetManager();

    assetManager.LoadAssets()
      .then(() => {
        new InputManager(canvas);
        new GUIManager();

        this.systems.push(
          new VelocitySystem(),
          new HealthSystem(),
          new DashSystem(),
          new ShootSystem(this),
          new ColliderSystem(200),
          new SpriteSystem(),
          new LifetimeSystem(),
        );

        this.zippingStars = new ParticleSystem(
          new Vec2(window.innerWidth / 2, -30),
          {
            shape: EmissionShape.Line,
            start: new Vec2(-30, -30),
            end: new Vec2(window.innerWidth + 30, -30),
            maxParticles: 150,
            rate: 20,
          },
          {
            color: "#ffffff",
            lifetime: [1.5, 1.5],
            size: [1, 3],
            velocity: [[0, 0], [1000, 1000]],
          }
        );
        this.zippingStars.Start();

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
    this.zippingStars.Update(dt);

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
    this.zippingStars.Render(ctx);

    for (const entity of this.entities) {
      entity.Render(ctx);
    }
    for (const system of this.systems) {
      system.Render(ctx, this.entities);
    }
  }
}

export default Game;
