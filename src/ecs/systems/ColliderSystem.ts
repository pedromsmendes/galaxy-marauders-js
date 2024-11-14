import Vec2 from '@/utils/Vec2';

import type { Bounds } from '../types';

import Entity from '../Entity';
import System from '../System';
import PositionComponent from '../components/PositionComponent';
import ColliderComponent from '../components/ColliderComponent';

class ColliderSystem extends System {
  private cellSize: number;

  private grid: Map<string, Entity[]>;

  constructor(cellSize: number) {
    super();

    this.cellSize = cellSize;

    this.grid = new Map<string, Entity[]>();
  }

  public Update(dt: number, entities: Entity[]): void {
    this.grid.clear();

    const validEntities: Entity[] = [];

    entities.forEach(entity => {
      const position = entity.GetComponent(PositionComponent)?.position;
      const collider = entity.GetComponent(ColliderComponent);

      if (!position || !collider) return;

      collider.previousCollisions = collider.currentCollisions;
      collider.currentCollisions = [];

      this.FillGrid(entity, collider, position);

      validEntities.push(entity);
    });

    validEntities.forEach((entity) => {
      const position = entity.GetComponent(PositionComponent)!.position;
      const collider = entity.GetComponent(ColliderComponent)!;

      const neighbours = this.GetNeighbours(collider, position);

      neighbours.forEach((neighbour) => {
        const bounds = this.GetBounds(collider, position);
        const neighbourCollider = neighbour.GetComponent(ColliderComponent)!;
        const neighbourBounds = this.GetBounds(neighbourCollider, neighbour.GetComponent(PositionComponent)!.position)

        if (this.Intersects(bounds, neighbourBounds)
          && !((collider.masks & neighbourCollider.layers) === 0 || (neighbourCollider.masks & collider.layers) === 0)) {
          collider.currentCollisions.push(neighbourCollider);
        }
      });

      const enteredCollisions = collider.currentCollisions.filter((c) => (
        !collider.previousCollisions.find((previous) => previous.entity.ID === c.entity.ID)
      ));
      const exitedCollisions = collider.previousCollisions.filter((c) => (
        !collider.currentCollisions.find((current) => current.entity.ID === c.entity.ID)
      ));

      enteredCollisions.forEach((otherCollider) => {
        collider.OnCollisionEnter(otherCollider);
      });

      exitedCollisions.forEach((otherCollider) => {
        collider.OnCollisionExit(otherCollider);
      });
    });
  }

  private FillGrid(entity: Entity, collider: ColliderComponent, pos: Vec2): void {
    const centerOfEntity = this.GetCenter(collider, pos);

    const cell = this.GetCell(centerOfEntity.x, centerOfEntity.y);

    if (!this.grid.has(cell)) {
      this.grid.set(cell, []);
    }

    this.grid.get(cell)?.push(entity);
  }

  private GetNeighbours(collider: ColliderComponent, pos: Vec2): Entity[] {
    const centerPos = this.GetCenter(collider, pos);

    const neighbours: Entity[] = [];

    for (let x = centerPos.x - this.cellSize; x < centerPos.x + this.cellSize * 2; x += this.cellSize) {
      for (let y = centerPos.y - this.cellSize; y < centerPos.y + this.cellSize * 2; y += this.cellSize) {
        const cell = this.GetCell(x, y);
        neighbours.push(...(this.grid.get(cell) || []));
      }
    }

    return neighbours.filter((e) => e.ID !== collider.entity.ID);
  }

  private GetCenter(collider: ColliderComponent, pos: Vec2): Vec2 {
    return new Vec2(pos.x + collider.size.x / 2, pos.y + collider.size.y / 2);
  }

  private GetCell(x: number, y: number): string {
    return new Vec2(Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)).ToString();
  }

  private GetBounds(collider: ColliderComponent, pos: Vec2): Bounds {
    return {
      top: pos.y,
      right: pos.x + collider.size.x,
      bottom: pos.y + collider.size.y,
      left: pos.x,
    }
  }

  private Intersects(boundsA: Bounds, boundsB: Bounds): boolean {
    const AisToTheRightOfB = boundsA.left > boundsB.right;
    const AisToTheLeftOfB = boundsA.right < boundsB.left;
    const AisAboveB = boundsA.bottom < boundsB.top;
    const AisBelowB = boundsA.top > boundsB.bottom;

    return !(AisToTheRightOfB
      || AisToTheLeftOfB
      || AisAboveB
      || AisBelowB);
  }

  // DEBUGGY
  public Render(ctx: CanvasRenderingContext2D): void {
    for (let x = 0; x <= window.innerWidth; x += this.cellSize) {
      for (let y = 0; y <= window.innerHeight; y += this.cellSize) {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);

        const centerOfTheRect = this.GetCell(x + this.cellSize / 2, y + this.cellSize / 2);
        const content = this.grid.get(centerOfTheRect);

        if (content?.length) {
          ctx.fillStyle = "#ff902230";
          ctx.fillRect(x, y, this.cellSize, this.cellSize)
        }
      }
    }
  }
}

export default ColliderSystem;
