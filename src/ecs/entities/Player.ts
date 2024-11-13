
import Vec2 from '@/utils/Vec2';
import InputManager from '@/managers/InputManager';

import Entity from '../Entity';
import DashComponent from '../components/DashComponent';
import HealthComponent from '../components/HealthComponent';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class Player extends Entity {
  /** px/sec */
  private speed = 500;

  constructor() {
    super();

    this.AddComponents(
      new PositionComponent(this),
      new VelocityComponent(this),
      new HealthComponent(this, 100),
      new DashComponent(this, 1500, 0.2, 1),
    )
  }

  public Update(_dt: number): void {
    const positionComponent = this.GetComponent(PositionComponent);
    const velocityComponent = this.GetComponent(VelocityComponent);
    if (!positionComponent || !velocityComponent) return;

    const dashComponent = this.GetComponent(DashComponent);
    if (dashComponent) {
      if (InputManager.keydown.space) {
        dashComponent.Dash(velocityComponent.velocity);
      }
    }

    if (!dashComponent.isDashing) {
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
    const positionComponent = this.GetComponent(PositionComponent);
    if (!positionComponent) return;

    ctx.fillStyle = '#0f0';
    ctx.fillRect(positionComponent.position.x, positionComponent.position.y, 50, 50);
  }
}

export default Player;
