// @ts-check

class Vec2 {
  static get Zero() { return new Vec2(0, 0); }
  static get One() { return new Vec2(1, 1); }

  static get Up() { return new Vec2(0, 1); }
  static get Down() { return new Vec2(0, -1); }
  static get Left() { return new Vec2(-1, 0); }
  static get Right() { return new Vec2(1, 0); }

  x = 0;
  y = 0;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vec2} other
   * @returns {Vec2}
   */
  Add(other) {
    this.x += other.x
    this.y += other.y

    return this;
  }

  /**
   * @param {number} scalar
   * @returns {Vec2}
   */
  Multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * @param {number} scalar
   * @returns {Vec2}
   */
  Divide(scalar) {
    if (scalar === 0) throw new Error("Bro tried to divide by zero, you can't");

    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  /** @returns {number} */
  Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** @returns {number} */
  LengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /** @returns {Vec2} */
  Normalize() {
    const length = this.Length();

    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }

    return this;
  }

  Clone() {
    return new Vec2(this.x, this.y);
  }
}

export default Vec2;
