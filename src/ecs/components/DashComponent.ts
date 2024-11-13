import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

class DashComponent extends Component {
  public dashSpeed: number;
  public dashDuration: number;
  public dashCooldown: number;
  public isDashing: boolean = false;
  public dashTimeRemaining: number = 0;
  public direction: Vec2 = Vec2.Zero;
  public lastDirection: Vec2 = Vec2.Right;
  public cooldownRemaining: number = 0;

  constructor(entity: Entity, dashSpeed: number, dashDuration = 0.5, dashCooldown = 2) {
    super(entity);

    this.dashSpeed = dashSpeed;
    this.dashDuration = dashDuration;
    this.dashCooldown = dashCooldown;
  }

  public Dash(direction: Vec2) {
    if (!this.CanDash()) return;

    this.isDashing = true;
    this.dashTimeRemaining = this.dashDuration;
    this.direction = direction.Equals(Vec2.Zero)
      ? this.lastDirection.Equals(Vec2.Zero)
        ? Vec2.Right
        : this.lastDirection
      : direction;
  }

  public CanDash() {
    return !this.isDashing && this.cooldownRemaining <= 0;
  }

  public EndDash() {
    this.isDashing = false;
    this.cooldownRemaining = this.dashCooldown;
  }

  public TickCooldown(dt: number) {
    if (this.cooldownRemaining > 0) {
      this.cooldownRemaining -= dt;
    }
  }
}

export default DashComponent;
