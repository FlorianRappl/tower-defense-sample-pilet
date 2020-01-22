export const enum GameState {
  unstarted = 0,
  building = 1,
  waving = 2,
  finished = 3,
}

export const enum MazeStrategy {
  manhattan = 1,
  maxDXDY = 2,
  diagonalShortCut = 3,
  euclidean = 4,
  euclideanNoSQR = 5,
  custom = 6,
  air = 7,
}

export type Grid = Array<Array<number>>;

export const enum Direction {
  right = 0,
  top = 1,
  left = 2,
  bottom = 3,
}

export const enum PathFinderNodeType {
  start = 1,
  end = 2,
  open = 4,
  close = 8,
  current = 16,
  path = 32,
}

export interface IVisual {
  frames: Array<number>;
  direction: Direction;
  time: number;
  index: number;
  delay: number;
  image: HTMLImageElement;
  length: number;
  width: number;
  height: number;
  scale: number;
}

export interface IView {
  background: HTMLImageElement;
  showGrid: boolean;
  mazeSize: {
    width: number;
    height: number;
  };
  width: number;
  height: number;
  pause(): void;
  start(): void;
  add(go: any): void;
  remove(go: any): void;
}

export interface ProgressEventData {
  name: string;
  progress: number;
  total: number;
}
