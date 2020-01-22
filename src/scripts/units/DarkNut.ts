import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class DarkNut extends Unit {
  static speed = 2.5;
  static frames = 16;
  static hitpoints = 150;
  static description =
    'The dark nut is an ancient warrier that takes quite some hits. His speed is superior to most other units.';
  static nickName = 'Dark Nut';
  static sprite = 'darknut';
  static rating = DarkNut.speed * DarkNut.hitpoints;

  constructor() {
    super(DarkNut.speed, 80, MazeStrategy.euclideanNoSQR, DarkNut.hitpoints);
    this.createVisual(DarkNut.sprite, [4, 4, 4, 4]);
  }
}
