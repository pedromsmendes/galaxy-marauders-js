import Entity from '../Entity';
import PositionComponent from '../components/PositionComponent';
import VelocityComponent from '../components/VelocityComponent';

class ProjectileTest extends Entity {
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

    ctx.fillStyle = '#ff0';
    ctx.fillRect(positionComponent.position.x, positionComponent.position.y, 10, 20);
  }
}

export default ProjectileTest;