import { PathFinderNode } from './PathFinderNode';
import { PriorityQueue } from './PriorityQueue';
import { Grid, MazeStrategy } from './Grid';
import { Point } from './Point';

const Steps = {
  WithDiagonals: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [1, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
  ],
  OnlyStraight: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ],
};

export class PathFinder {
  diagonals = true;
  formula = MazeStrategy.manhattan;
  horiz = 0;
  stopped = true;
  stop = false;
  heuristicEstimate = 2;
  punishChangeDirection = false;
  reopenCloseNodes = false;
  tieBreaker = false;
  heavyDiagonals = false;
  searchLimit = 2000;

  private close: Array<PathFinderNode>;
  private open: PriorityQueue;

  constructor(private grid: Grid) {
    this.reset();
  }

  reset() {
    this.close = [];
    this.open = new PriorityQueue((x, y) => {
      if (x.f > y.f) {
        return 1;
      } else if (x.f < y.f) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  findPath(start: Point, end: Point) {
    let parentNode = new PathFinderNode();
    let found = false;
    const gridX = this.grid.length;
    const gridY = this.grid[0].length;
    this.stop = false;
    this.stopped = false;
    this.reset();
    const direction = this.diagonals ? Steps.WithDiagonals : Steps.OnlyStraight;
    const ndiag = this.diagonals ? 8 : 4;

    parentNode.g = 0;
    parentNode.h = this.heuristicEstimate;
    parentNode.f = parentNode.g + parentNode.h;
    parentNode.x = start.x;
    parentNode.y = start.y;
    parentNode.px = parentNode.x;
    parentNode.py = parentNode.y;

    this.open.push(parentNode);

    while (this.open.count() > 0 && !this.stop) {
      parentNode = this.open.pop();

      if (parentNode.x === end.x && parentNode.y === end.y) {
        this.close.push(parentNode);
        found = true;
        break;
      }

      if (this.close.length > this.searchLimit) {
        this.stopped = true;
        return;
      }

      if (this.punishChangeDirection) {
        this.horiz = parentNode.x - parentNode.px;
      }

      for (let i = 0; i < ndiag; i++) {
        const newNode = new PathFinderNode();
        newNode.x = parentNode.x + direction[i][0];
        newNode.y = parentNode.y + direction[i][1];

        if (newNode.x < 0 || newNode.y < 0 || newNode.x >= gridX || newNode.y >= gridY) {
          continue;
        }

        let newG = parentNode.g;

        if (this.heavyDiagonals && i > 3) {
          newG += ~~(this.grid[newNode.x][newNode.y] * 2.41);
        } else {
          newG += this.grid[newNode.x][newNode.y];
        }

        if (newG === parentNode.g) {
          continue;
        }

        if (this.punishChangeDirection) {
          if (newNode.x - parentNode.x && !this.horiz) {
            newG += 20;
          }

          if (newNode.y - parentNode.y && this.horiz) {
            newG += 20;
          }
        }

        let foundInOpenIndex = -1;

        for (let j = 0, n = this.open.count(); j < n; j++) {
          if (this.open.get(j).x === newNode.x && this.open.get(j).y === newNode.y) {
            foundInOpenIndex = j;
            break;
          }
        }

        if (foundInOpenIndex !== -1 && this.open.get(foundInOpenIndex).g <= newG) {
          continue;
        }

        let foundInCloseIndex = -1;

        for (let j = 0, n = this.close.length; j < n; j++) {
          if (this.close[j].x === newNode.x && this.close[j].y === newNode.y) {
            foundInCloseIndex = j;
            break;
          }
        }

        if (foundInCloseIndex !== -1 && (this.reopenCloseNodes || this.close[foundInCloseIndex].g <= newG)) {
          continue;
        }

        newNode.px = parentNode.x;
        newNode.py = parentNode.y;
        newNode.g = newG;

        switch (this.formula) {
          case MazeStrategy.maxDXDY:
            newNode.h = this.heuristicEstimate * Math.max(Math.abs(newNode.x - end.x), Math.abs(newNode.y - end.y));
            break;

          case MazeStrategy.diagonalShortCut:
            const h_diagonal = Math.min(Math.abs(newNode.x - end.x), Math.abs(newNode.y - end.y));
            const h_straight = Math.abs(newNode.x - end.x) + Math.abs(newNode.y - end.y);
            newNode.h =
              this.heuristicEstimate * 2 * h_diagonal + this.heuristicEstimate * (h_straight - 2 * h_diagonal);
            break;

          case MazeStrategy.euclidean:
            newNode.h = ~~(
              this.heuristicEstimate * Math.sqrt(Math.pow(newNode.x - end.x, 2) + Math.pow(newNode.y - end.y, 2))
            );
            break;

          case MazeStrategy.euclideanNoSQR:
            newNode.h = ~~(this.heuristicEstimate * (Math.pow(newNode.x - end.x, 2) + Math.pow(newNode.y - end.y, 2)));
            break;

          case MazeStrategy.custom:
            const dxy = new Point(Math.abs(end.x - newNode.x), Math.abs(end.y - newNode.y));
            const orthogonal = Math.abs(dxy.x - dxy.y);
            const diagonal = Math.abs((dxy.x + dxy.y - orthogonal) * 0.5);
            newNode.h = this.heuristicEstimate * (diagonal + orthogonal + dxy.x + dxy.y);
            break;

          case MazeStrategy.manhattan:
          default:
            newNode.h = this.heuristicEstimate * (Math.abs(newNode.x - end.x) + Math.abs(newNode.y - end.y));
            break;
        }

        if (this.tieBreaker) {
          const dx1 = parentNode.x - end.x;
          const dy1 = parentNode.y - end.y;
          const dx2 = start.x - end.x;
          const dy2 = start.y - end.y;
          const cross = Math.abs(dx1 * dy2 - dx2 * dy1);
          newNode.h = ~~(newNode.h + cross * 0.001);
        }

        newNode.f = newNode.g + newNode.h;
        this.open.push(newNode);
      }

      this.close.push(parentNode);
    }

    if (found) {
      let fNode = this.close[this.close.length - 1].clone();

      for (let i = this.close.length - 1; i >= 0; i--) {
        if ((fNode.px === this.close[i].x && fNode.py === this.close[i].y) || i === this.close.length - 1) {
          fNode = this.close[i].clone();
        } else {
          this.close.splice(i, 1);
        }
      }

      this.stopped = true;
      return this.close;
    }

    this.stopped = true;
  }
}
