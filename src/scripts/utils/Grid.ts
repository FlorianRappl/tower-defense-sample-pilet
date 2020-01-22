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
