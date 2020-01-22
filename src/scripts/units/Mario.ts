import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class Mario extends Unit {
  static speed = 2.0;
  static frames = 32;
  static hitpoints = 10;
  static description = 'You have to be careful with that plumber.';
  static nickName = 'Mario';
  static sprite = 'mario';
  static rating = Mario.speed * Mario.hitpoints;

  constructor() {
    super(Mario.speed, 100, MazeStrategy.manhattan, Mario.hitpoints);
    this.createVisual(Mario.sprite, [8, 8, 8, 8]);
  }
}
