import Vec2 from '@/utils/Vec2';
import InputManager from '@/managers/InputManager';

import Entity from '../Entity';
import ProjectileTest from './ProjectileTest';
import DashComponent from '../components/DashComponent';
import ShootComponent from '../components/ShootComponent';
import HealthComponent from '../components/HealthComponent';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class Player extends Entity {
  /** px/sec */
  private speed = 500;

  private size = new Vec2(100, 100);

  constructor() {
    super();

    this.AddComponents(
      new PositionComponent(this, new Vec2(300, 300)),
      new VelocityComponent(this),
      new HealthComponent(this, 100),
      new DashComponent(this, 1800, 0.2, 0.8),
      new ShootComponent(this, Vec2.Zero, ProjectileTest, 1000, 0.2),
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

    if (!dashComponent?.isDashing) {
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

    const shootComponent = this.GetComponent(ShootComponent);
    if (shootComponent) {
      if (InputManager.mouseButtonDown[0]) {
        shootComponent.Shoot(InputManager.mousePos);
      }
    }
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    const positionComponent = this.GetComponent(PositionComponent);
    if (!positionComponent) return;

    ctx.fillStyle = '#0f0';
    ctx.fillRect(
      positionComponent.position.x - this.size.x / 2,
      positionComponent.position.y - this.size.y / 2,
      this.size.x,
      this.size.y,
    );

    // debugging the center of the object
    if (process.env.NODE_ENV === 'development') {
      ctx.beginPath();
      ctx.moveTo(positionComponent.position.x, positionComponent.position.y - this.size.y / 2);
      ctx.lineTo(positionComponent.position.x, positionComponent.position.y + this.size.y / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(positionComponent.position.x - this.size.x / 2, positionComponent.position.y);
      ctx.lineTo(positionComponent.position.x + this.size.x / 2, positionComponent.position.y);
      ctx.stroke();
    }
  }
}

export default Player;
