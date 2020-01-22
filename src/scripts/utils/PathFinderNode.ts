export class PathFinderNode {
  f = 0;
  g = 0;
  h = 0;
  x = 0;
  y = 0;
  px = 0;
  py = 0;

  clone() {
    const c = new PathFinderNode();
    c.f = this.f;
    c.g = this.g;
    c.h = this.h;
    c.x = this.x;
    c.y = this.y;
    c.px = this.px;
    c.py = this.py;
    return c;
  }
}

export const enum PathFinderNodeType {
  start = 1,
  end = 2,
  open = 4,
  close = 8,
  current = 16,
  path = 32,
}
