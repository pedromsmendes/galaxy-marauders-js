import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import Component from '../Component';

class DashComponent extends Component {
  public speed: number;
  public duration: number;
  public cooldown: number;
  public isDashing: boolean = false;
  public dashTimeRemaining: number = 0;
  public direction: Vec2 = Vec2.Zero;
  public lastDirection: Vec2 = Vec2.Right;
  public cooldownRemaining: number = 0;

  constructor(entity: Entity, dashSpeed: number, dashDuration = 0.5, dashCooldown = 2) {
    super(entity);

    this.speed = dashSpeed;
    this.duration = dashDuration;
    this.cooldown = dashCooldown;
  }

  public Dash(direction: Vec2) {
    if (!this.CanDash()) return;

    this.isDashing = true;
    this.dashTimeRemaining = this.duration;
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
    this.cooldownRemaining = this.cooldown;
  }

  public TickCooldown(dt: number) {
    if (this.cooldownRemaining > 0) {
      this.cooldownRemaining -= dt;
    }
  }
}

export default DashComponent;
