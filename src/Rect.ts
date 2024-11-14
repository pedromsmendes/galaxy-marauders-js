import Vec2 from './utils/Vec2';
import Entity from './ecs/Entity';
import { randRangeInt } from './utils/random';
import InputManager from './managers/InputManager';
import PositionComponent from './ecs/components/PositionComponent';
import VelocityComponent from './ecs/components/VelocityComponent';
import ConfinmentComponent from './ecs/components/ConfinmentComponent';
import ColliderComponent, { Layers } from './ecs/components/ColliderComponent';

class Rect extends Entity {
  private size: Vec2;

  private color: string;

  private playable: boolean;

  private speed = 500;

  constructor(initialPos = Vec2.Zero, size = new Vec2(200, 200), color = "#ff0000", playable = false) {
    super();

    this.size = size;

    this.color = color;

    this.playable = playable;

    const initialSpeed = 500;
    this.AddComponents(
      new PositionComponent(this, initialPos),
      new VelocityComponent(
        this,
        new Vec2((randRangeInt(0, 1) ? 1 : -1) * initialSpeed, (randRangeInt(0, 1) ? 1 : -1) * initialSpeed),
      ),
      new ColliderComponent(
        this,
        this.size,
        playable ? Layers.Player : Layers.Enemy,
        playable ? Layers.Enemy | Layers.EnemyProjectile : Layers.Player | Layers.PlayerProjectile,
      ),
      new ConfinmentComponent(this, {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0,
      }, true),
    );
  }

  public Update(_dt: number): void {
    const velocityComponent = this.GetComponent(VelocityComponent);

    if (!velocityComponent) return;

    if (this.playable) {
      velocityComponent.velocity = Vec2.Zero;

      if (InputManager.keydown.w) {
        velocityComponent.velocity.y -= this.speed;
      }
      if (InputManager.keydown.s) {
        velocityComponent.velocity.y += this.speed;
      }
      if (InputManager.keydown.a) {
        velocityComponent.velocity.x -= this.speed;
      }
      if (InputManager.keydown.d) {
        velocityComponent.velocity.x += this.speed;
      }
    }
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    const posCompontent = this.GetComponent(PositionComponent);
    if (!posCompontent) return;

    ctx.fillStyle = this.broIsColliding ? 'green' : this.color;
    ctx.fillRect(
      posCompontent.position.x,
      posCompontent.position.y,
      this.size.x,
      this.size.y,
    );
  }

  public GetBoundingBox() {
    const posCompontent = this.GetComponent(PositionComponent);

    return {
      top: posCompontent!.position.y,
      right: posCompontent!.position.x + this.size.x,
      bottom: posCompontent!.position.y + this.size.y,
      left: posCompontent!.position.x,
    }
  }
}

export default Rect;