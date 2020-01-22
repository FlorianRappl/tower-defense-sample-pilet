import { PathFinder } from './PathFinder';
import { Grid, MazeStrategy } from './Grid';
import { Size } from './Size';
import { Point } from './Point';

export class Maze {
  private grid: Grid;
  private pf: PathFinder;
  private paths = {};

  constructor(
    private size: Size,
    private start = new Point(0, ~~(size.height * 0.5)),
    private end = new Point(size.width, ~~(size.height * 0.5)),
  ) {
    const grid: Grid = [];

    for (let i = 0; i < size.width + 1; i++) {
      const a: Array<number> = [];

      for (let j = 0; j < size.height; j++) {
        a.push(1);
      }

      grid.push(a);
    }

    this.grid = grid;
    this.pf = new PathFinder(this.grid);
    this.pf.diagonals = false;
  }

  isPointInGrid(point: Point) {
    if (point.x > this.size.width - 1 || point.x < 0) {
      return false;
    } else if (point.y > this.size.height - 1 || point.y < 0) {
      return false;
    } else {
      return true;
    }
  }

  tryBuild(point: Point, weight: number) {
    if (this.grid[point.x][point.y] !== 1) {
      return false;
    } else if (point.x === this.size.width - 1 || point.x === 0) {
      return false;
    }

    this.grid[point.x][point.y] = weight || 0;
    this.pf.formula = MazeStrategy.euclidean;

    if (this.pf.findPath(this.start, this.end)) {
      this.paths = {};
      return true;
    } else {
      this.grid[point.x][point.y] = 1;
      return false;
    }
  }

  tryRemove(point: Point) {
    if (this.grid[point.x][point.y] !== 1) {
      this.grid[point.x][point.y] = 1;
      this.paths = {};
      return true;
    }

    return false;
  }

  getPath(mazeStrategy: MazeStrategy) {
    if (mazeStrategy === MazeStrategy.air) {
      return this.getPathAir();
    }

    if (!this.paths[mazeStrategy]) {
      this.calculate(mazeStrategy);
    }

    return this.paths[mazeStrategy];
  }

  getPathAir() {
    const path = [];

    for (let i = this.start.x; i < this.end.x + 1; ++i) {
      path.push(new Point(i, this.start.y));
    }

    return path;
  }

  calculate(mazeStrategy: MazeStrategy) {
    let path;

    if (mazeStrategy === MazeStrategy.air) {
      path = this.getPathAir();
    } else {
      path = [];
      this.pf.formula = mazeStrategy;
      const nodes = this.pf.findPath(this.start, this.end);

      for (let i = 0; i < nodes.length; i++) {
        path.push(new Point(nodes[i].x, nodes[i].y));
      }
    }

    this.paths[mazeStrategy] = path;
  }
}
