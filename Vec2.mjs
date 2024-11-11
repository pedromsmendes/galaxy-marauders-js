// @ts-check

class Vec2 {
  x = 0;
  y = 0;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
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
    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  /**
   * @returns {number}
   */
  Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @returns {Vec2}
   */
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
