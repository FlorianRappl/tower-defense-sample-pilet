import { PathFinderNode } from './PathFinderNode';

export interface PathFinderComparer {
  (a: PathFinderNode, b: PathFinderNode): -1 | 0 | 1;
}

export class PriorityQueue {
  private innerList: Array<PathFinderNode> = [];

  constructor(private comparer: PathFinderComparer) {}

  switchElements(i: number, j: number) {
    const h = this.innerList[i];
    this.innerList[i] = this.innerList[j];
    this.innerList[j] = h;
  }

  onCompare(i: number, j: number) {
    return this.comparer(this.innerList[i], this.innerList[j]);
  }

  push(item: PathFinderNode) {
    let p = this.innerList.length;
    this.innerList.push(item);

    while (p !== 0) {
      const p2 = ~~((p - 1) * 0.5);

      if (this.onCompare(p, p2) < 0) {
        this.switchElements(p, p2);
        p = p2;
      } else {
        break;
      }
    }

    return p;
  }

  pop() {
    const result = this.innerList[0];
    let p = 0;
    this.innerList[0] = this.innerList[this.innerList.length - 1];
    this.innerList.splice(this.innerList.length - 1, 1);

    do {
      const pn = p;
      const p1 = 2 * p + 1;
      const p2 = 2 * p + 2;

      if (this.innerList.length > p1 && this.onCompare(p, p1) > 0) {
        p = p1;
      }

      if (this.innerList.length > p2 && this.onCompare(p, p2) > 0) {
        p = p2;
      }

      if (p === pn) {
        break;
      }

      this.switchElements(p, pn);
    } while (true);

    return result;
  }

  update(i: number) {
    let p = i;

    while (p !== 0) {
      const p2 = ~~((p - 1) * 0.5);

      if (this.onCompare(p, p2) < 0) {
        this.switchElements(p, p2);
        p = p2;
      } else {
        break;
      }
    }

    if (p < i) return;

    do {
      const pn = p;
      const p1 = 2 * p + 1;
      const p2 = 2 * p + 2;

      if (this.innerList.length > p1 && this.onCompare(p, p1) > 0) {
        p = p1;
      }

      if (this.innerList.length > p2 && this.onCompare(p, p2) > 0) {
        p = p2;
      }

      if (p === pn) {
        break;
      }

      this.switchElements(p, pn);
    } while (true);
  }

  peek() {
    if (this.innerList.length) {
      return this.innerList[0];
    }

    return new PathFinderNode();
  }

  clear() {
    this.innerList = [];
  }

  count() {
    return this.innerList.length;
  }

  removeLocation(item: PathFinderNode) {
    for (let i = 0; i < this.innerList.length; i++) {
      if (this.comparer(this.innerList[i], item) === 0) {
        this.innerList.splice(i, 1);
        return;
      }
    }
  }

  get(index: number) {
    return this.innerList[index];
  }

  set(index: number, value: PathFinderNode) {
    this.innerList[index] = value;
    this.update(index);
  }
}
