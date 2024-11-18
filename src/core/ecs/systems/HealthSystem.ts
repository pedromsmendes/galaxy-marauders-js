import Vec2 from '@/core/utils/Vec2';
import CanvasManager from '@/managers/CanvasManager';

import Entity from '../Entity';
import System from '../System';
import HealthComponent from '../components/HealthComponent';
import PositionComponent from '../components/PositionComponent';
import ColliderComponent from '../components/ColliderComponent';

class HealthSystem extends System {
  public override Update(_dt: number, entities: Entity[]): void {
    for (const entity of entities) {
      const health = entity.GetComponent(HealthComponent);

      if (!health || health.isDead) continue;

      if (health.GetHealth() <= 0) {
        health.Kill();
      }
    }
  }

  public override Render(entities: Entity[]): void {
    if (process.env.NODE_ENV === "development") {
      for (const entity of entities) {
        const health = entity.GetComponent(HealthComponent);
        const position = entity.GetComponent(PositionComponent)?.position;

        if (!health || !position || health.isDead) continue;

        const ctx = CanvasManager.ctx;


        // temporarily getting the size from the colliders
        const entitySize = entity.GetComponent(ColliderComponent)?.size || Vec2.Zero;
        const barSize = new Vec2(150, 20);
        const rectPos = new Vec2(position.x - barSize.x / 2, position.y - entitySize.y / 2 - barSize.y);

        const currentHPInPixels = (barSize.x * health.GetHealth()) / health.GetMaxHealth();

        ctx.fillStyle = "#ff0000"
        ctx.fillRect(
          rectPos.x,
          rectPos.y,
          barSize.x,
          barSize.y,
        );

        ctx.fillStyle = "#00ff00"
        ctx.fillRect(
          rectPos.x,
          rectPos.y,
          currentHPInPixels,
          barSize.y,
        );

        ctx.strokeStyle = "#000"
        ctx.lineWidth = 2;
        ctx.strokeRect(
          rectPos.x,
          rectPos.y,
          currentHPInPixels,
          barSize.y,
        );

        ctx.strokeStyle = "#000"
        ctx.lineWidth = 3;
        ctx.strokeRect(
          rectPos.x,
          rectPos.y,
          barSize.x,
          barSize.y,
        );
      }
    }
  }
}

export default HealthSystem;
