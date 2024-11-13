import Vec2 from '@/utils/Vec2';

import Entity from '../Entity';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class ProjectileTest extends Entity {
  private size = new Vec2(10, 10);

  constructor() {
    super();

    this.AddComponents(
      new PositionComponent(this),
      new VelocityComponent(this),
    );
  }

  public Update(_dt: number): void {
  }

  public Render(ctx: CanvasRenderingContext2D): void {
    const positionComponent = this.GetComponent(PositionComponent);
    if (!positionComponent) return;

    ctx.strokeStyle = '#f00';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(
      positionComponent.position.x,
      positionComponent.position.y,
      this.size.x,
      0,
      2 * Math.PI,
    )
    ctx.stroke();
    ctx.fill();
  }
}

export default ProjectileTest;