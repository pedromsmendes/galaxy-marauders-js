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
        this.size.Clone().Multiply(2),
        Layers.PlayerProjectile,
        Layers.Enemy,
      ),
    );
  }

  public override Render(): void {
    const ctx = CanvasManager.ctx;

    const positionComponent = this.GetComponent(PositionComponent);
    if (!positionComponent) return;

    ctx.fillStyle = '#fff';
    ctx.fillRect(
      positionComponent.position.x - this.size.x / 2,
      positionComponent.position.y - this.size.y / 2,
      this.size.x,
      this.size.y,
    )
    ctx.fill();
  }
}

export default ProjectileTest;