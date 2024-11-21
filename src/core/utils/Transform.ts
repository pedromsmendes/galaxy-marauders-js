import Vec2 from './Vec2';

class Transform {
  private position: Vec2;
  private parent?: Transform;
  private children: Transform[];

  constructor(localPos = Vec2.Zero, parent?: Transform) {
    this.position = localPos;

    this.parent = parent;
    if (this.parent) this.parent.AddChild(this);

    this.children = [];
  }

  public AddChild(child: Transform): void {
    this.children.push(child);
  }

  // public RemoveChild(child: Transform): void {
  // const foundIdx = this.children.indexOf(child);
  // if (foundIdx !== -1) {
  //   this.children[foundIdx].SetParent(undefined);
  //   this.children.splice(foundIdx, 1);
  // }
  // }

  public GetParent(): Transform | undefined {
    return this.parent;
  }

  public SetParent(parent: Transform | undefined): void {
    this.parent = parent;
  }

  public GetWorldPosition(): Vec2 {
    if (!this.parent) return this.position.Clone();

    return this.parent.GetWorldPosition().Add(this.position);
  }

  public GetLocalPosition(): Vec2 {
    return this.position.Clone();
  }

  /** Sets the world position */
  public SetPosition(newWorldPos: Vec2): void {
    if (this.parent) {
      this.position = newWorldPos.Clone().Subtract(this.parent.GetWorldPosition());
    } else {
      this.position = newWorldPos.Clone();
    }
  }
}

export default Transform;
