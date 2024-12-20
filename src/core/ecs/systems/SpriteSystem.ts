import AssetManager from '@/managers/AssetManager';

import Entity from '../Entity';
import System from '../System';
import SpriteComponent from '../components/SpriteComponent';

class SpriteSystem extends System {
  public override Render(ctx: CanvasRenderingContext2D, entities: Entity[]): void {
    for (const entity of entities) {
      const sprite = entity.GetComponent(SpriteComponent);

      if (!sprite) continue;

      const position = entity.GetWorldPosition();

      const image = AssetManager.GetImage(sprite.imageKey);

      if (image) {
        ctx.drawImage(image, position.x - image.width / 2, position.y - image.height / 2);

        // if (process.env.NODE_ENV === 'development') {
        //   ctx.strokeStyle = "#ffffff80";
        //   ctx.strokeRect(position.x - image.width / 2, position.y - image.height / 2, image.width, image.height);
        // }
      }
    }
  }
}

export default SpriteSystem;
