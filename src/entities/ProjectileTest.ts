import Vec2 from '@/core/utils/Vec2';
import Entity from '@/core/ecs/Entity';
import VelocityComponent from '@/core/ecs/components/VelocityComponent';
import ColliderComponent, { Layers } from '@/core/ecs/components/ColliderComponent';

class ProjectileTest extends Entity {
  private size = new Vec2(10, 10);

  constructor() {
    super(Vec2.Zero);

    this.AddComponents(
      new VelocityComponent(this),
      // new LifetimeComponent(this, 1),
      new ColliderComponent(
        this,
        this.size.Clone().Multiply(2),
        Layers.PlayerProjectile,
        Layers.Enemy,
      ),
    );
  }

  public override Render(ctx: CanvasRenderingContext2D): void {
    const position = this.GetWorldPosition();

    ctx.fillStyle = '#fff';
    ctx.fillRect(
      position.x - this.size.x / 2,
      position.y - this.size.y / 2,
      this.size.x,
      this.size.y,
    )
    ctx.fill();
  }
}

export default ProjectileTest;