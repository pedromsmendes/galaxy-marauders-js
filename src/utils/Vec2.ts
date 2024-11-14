class Vec2 {
  public static get Zero() { return new Vec2(0, 0); }
  public static get One() { return new Vec2(1, 1); }

  public static get Up() { return new Vec2(0, 1); }
  public static get Down() { return new Vec2(0, -1); }
  public static get Left() { return new Vec2(-1, 0); }
  public static get Right() { return new Vec2(1, 0); }

  public x = 0;
  public y = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public Add(other: Vec2): Vec2 {
    this.x += other.x
    this.y += other.y

    return this;
  }

  public Multiply(scalar: number): Vec2 {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  public Divide(scalar: number): Vec2 {
    if (scalar === 0) throw new Error("Bro tried to divide by zero, you can't");

    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  public Length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public LengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public Normalize(): Vec2 {
    const length = this.Length();

    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }

    return this;
  }

  public Clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  public Direction(target: Vec2) {
    return new Vec2(target.x - this.x, target.y - this.y);
  }

  public Equals(other: Vec2) {
    return other.x === this.x && other.y === this.y;
  }

  public ToString(): string {
    return `{x=${this.x},y=${this.y}}`;
  }
}

export default Vec2;
