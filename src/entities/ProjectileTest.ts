import Vec2 from '@/utils/Vec2';
import Entity from '@/ecs/Entity';
import CanvasManager from '@/managers/CanvasManager';
import PositionComponent from '@/ecs/components/PositionComponent';
import VelocityComponent from '@/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/ecs/components/ColliderComponent';

class ProjectileTest extends Entity {
  private size = new Vec2(10, 10);

  constructor() {
    super();

    this.AddComponents(
      new PositionComponent(this),
      new VelocityComponent(this),
      new ColliderComponent(
        this,
        this.size,
        Layers.PlayerProjectile,
        Layers.Enemy,
      ),
    );
  }

  public override Render(): void {
    const ctx = CanvasManager.ctx;

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