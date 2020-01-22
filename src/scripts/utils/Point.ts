export class Point {
  constructor(public x = 0, public y = 0) {}

  clone() {
    return new Point(this.x, this.y);
  }

  add(pt: Point) {
    return new Point(this.x + pt.x, this.y + pt.y);
  }

  subtract(pt: Point) {
    return new Point(this.x - pt.x, this.y - pt.y);
  }

  projectOn(pt: Point) {
    return this.x * pt.x + this.y * pt.y;
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  square() {
    return this.x * this.x + this.y * this.y;
  }

  scale(factor: number) {
    return new Point(this.x * factor, this.y * factor);
  }

  normalize() {
    const norm = 1.0 / this.norm();
    return this.scale(norm);
  }

  regularize() {
    if (this.x === 0 && this.y === 0) {
      return new Point(2 * Math.round(Math.random()) - 1, 2 * Math.round(Math.random()) - 1);
    }

    return this;
  }

  toDirection() {
    if (this.x > this.y) {
      return this.x > -this.y ? Direction.right : Direction.top;
    } else if (this.x > -this.y) {
      return Direction.bottom;
    } else {
      return Direction.left;
    }
  }
}
