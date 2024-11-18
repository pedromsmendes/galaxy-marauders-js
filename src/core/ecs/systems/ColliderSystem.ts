import Vec2 from '@/core/utils/Vec2';

import type { Bounds, Collision } from '../types';

import Entity from '../Entity';
import System from '../System';
import PositionComponent from '../components/PositionComponent';
import ColliderComponent from '../components/ColliderComponent';

class ColliderSystem extends System {
  private cellSize: number;

  private grid: Map<string, ColliderComponent[]>;

  constructor(cellSize: number) {
    super();

    this.cellSize = cellSize;

    this.grid = new Map<string, ColliderComponent[]>();
  }

  public override Update(dt: number, entities: Entity[]): void {
    this.grid.clear();

    const validEntities: Entity[] = [];

    for (const entity of entities) {
      const position = entity.GetComponent(PositionComponent)?.position;
      const collider = entity.GetComponent(ColliderComponent);

      if (!position || !collider) continue;

      collider.previousCollisions = collider.currentCollisions;
      collider.currentCollisions = [];

      this.FillGrid(collider, position);

      validEntities.push(entity);
    }

    for (const entity of validEntities) {
      const position = entity.GetComponent(PositionComponent)!.position;
      const collider = entity.GetComponent(ColliderComponent)!;

      const neighbours = this.GetNeighbours(collider, position);

      for (const neighbourCollider of neighbours) {
        const bounds = this.GetBounds(collider, position);
        const neighbourBounds = this.GetBounds(neighbourCollider, neighbourCollider.entity.GetComponent(PositionComponent)!.position);

        if ((collider.masks & neighbourCollider.layers) === 0 || (neighbourCollider.masks & collider.layers) === 0) {
          continue;
        }

        const collisionInfo = this.GetCollision(bounds, neighbourBounds);

        if (collisionInfo) {
          collider.currentCollisions.push({
            collider: neighbourCollider,
            depth: collisionInfo.depth,
            normal: collisionInfo.normal,
          });
        }
      }

      const enteredCollisions = collider.currentCollisions.filter((c) => (
        !collider.previousCollisions.find((previous) => previous.collider.entity.ID === c.collider.entity.ID)
      ));
      const exitedCollisions = collider.previousCollisions.filter((c) => (
        !collider.currentCollisions.find((current) => current.collider.entity.ID === c.collider.entity.ID)
      ));

      for (const collision of enteredCollisions) {
        collider.OnCollisionEnter.Emit(collision);
      }

      for (const otherCollision of exitedCollisions) {
        collider.OnCollisionExit.Emit(otherCollision);
      }
    }
  }

  private FillGrid(collider: ColliderComponent, pos: Vec2): void {
    const cell = this.GetCell(pos.x, pos.y).ToString();

    if (!this.grid.has(cell)) {
      this.grid.set(cell, []);
    }

    this.grid.get(cell)?.push(collider);
  }

  private GetNeighbours(collider: ColliderComponent, pos: Vec2): ColliderComponent[] {
    const neighbours: ColliderComponent[] = [];

    for (let x = pos.x - this.cellSize; x < pos.x + this.cellSize * 2; x += this.cellSize) {
      for (let y = pos.y - this.cellSize; y < pos.y + this.cellSize * 2; y += this.cellSize) {
        const cell = this.GetCell(x, y).ToString();
        neighbours.push(...(this.grid.get(cell) || []));
      }
    }

    return neighbours.filter((e) => e.entity.ID !== collider.entity.ID);
  }

  private GetCell(x: number, y: number): Vec2 {
    return new Vec2(Math.floor(x / this.cellSize), Math.floor(y / this.cellSize));
  }

  private GetBounds(collider: ColliderComponent, pos: Vec2): Bounds {
    return {
      top: pos.y - collider.size.y / 2,
      right: pos.x + collider.size.x / 2,
      bottom: pos.y + collider.size.y / 2,
      left: pos.x - collider.size.x / 2,
    }
  }

  private GetCollision(boundsA: Bounds, boundsB: Bounds): Omit<Collision, 'collider'> | null {
    const overlapX = Math.min(boundsA.right, boundsB.right) - Math.max(boundsA.left, boundsB.left);
    const overlapY = Math.min(boundsA.bottom, boundsB.bottom) - Math.max(boundsA.top, boundsB.top);

    if (overlapX > 0 && overlapY > 0) {
      if (overlapX < overlapY) {
        const normalX = boundsA.right > boundsB.right ? 1 : -1;
        return { normal: new Vec2(normalX, 0), depth: overlapX };
      } else {
        const normalY = boundsA.bottom > boundsB.bottom ? 1 : -1;
        return { normal: new Vec2(0, normalY), depth: overlapY };
      }
    }

    return null;
  }

  // DEBUGGY
  public override Render(): void {
    // const ctx = CanvasManager.ctx;

    // for (let x = 0; x <= window.innerWidth; x += this.cellSize) {
    //   for (let y = 0; y <= window.innerHeight; y += this.cellSize) {
    //     ctx.strokeStyle = "#ffffff99";
    //     ctx.strokeRect(x, y, this.cellSize, this.cellSize);

    //     const centerOfTheRect = this.GetCell(x + this.cellSize / 2, y + this.cellSize / 2).ToString();
    //     const content = this.grid.get(centerOfTheRect);

    //     if (content?.length) {
    //       ctx.fillStyle = "#ff902210";
    //       ctx.fillRect(x, y, this.cellSize, this.cellSize)
    //     }
    //   }
    // }

    // // go over each collider and render it's colliderbox
    // this.grid.forEach((colliders) => {
    //   colliders.forEach((collider) => {
    //     const pos = collider.entity.GetComponent(PositionComponent)!.position;

    //     const bounds = this.GetBounds(collider, pos);

    //     ctx.strokeStyle = "#00ff0040";
    //     ctx.strokeRect(
    //       bounds.left,
    //       bounds.top,
    //       collider.size.x,
    //       collider.size.y,
    //     );

    //     if (collider.currentCollisions.length) {
    //       ctx.fillStyle = "#ff000020";
    //       ctx.fillRect(
    //         bounds.left,
    //         bounds.top,
    //         collider.size.x,
    //         collider.size.y,
    //       )
    //     }
    //   });
    // });
  }
}

export default ColliderSystem;
