import { Point } from './Point';
import { Direction } from '../types';

export class Path {
  constructor(private list: Array<Point>) {}

  propagate(pathLength: number) {
    const lastIndex = ~~pathLength;
    let dir = Direction.bottom;

    if (lastIndex + 1 >= this.list.length) {
      return false;
    }

    if (this.list[lastIndex].x < this.list[lastIndex + 1].x) {
      dir = Direction.right;
    } else if (this.list[lastIndex].x > this.list[lastIndex + 1].x) {
      dir = Direction.left;
    } else if (this.list[lastIndex].y > this.list[lastIndex + 1].y) {
      dir = Direction.top;
    }

    let point = this.list[lastIndex + 1].subtract(this.list[lastIndex]);
    point = point.scale(pathLength - lastIndex);
    point = this.list[lastIndex].add(point);

    return {
      point: point,
      direction: dir,
    };
  }
}
