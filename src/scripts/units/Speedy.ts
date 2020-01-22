import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class Speedy extends Unit {
  static speed = 7.0;
  static frames = 20;
  static hitpoints = 200;
  static description =
    'This unit is just a single blob. It is ultra fast and has quite some armor. It will give you some trouble.';
  static nickName = 'HAL';
  static sprite = 'newunit';
  static rating = Speedy.speed * Speedy.hitpoints;

  constructor() {
    super(Speedy.speed, 25, MazeStrategy.diagonalShortCut, Speedy.hitpoints);
    this.createVisual(Speedy.sprite, [20]);
  }
}
