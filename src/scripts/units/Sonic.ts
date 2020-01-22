import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class Sonic extends Unit {
  static speed = 5.0;
  static frames = 5;
  static hitpoints = 1000;
  static description = 'Fast and very deadly. This hedgehog survives a lot and does it with style.';
  static nickName = 'Sonic';
  static sprite = 'sonic';
  static rating = Sonic.speed * Sonic.hitpoints;

  constructor() {
    super(Sonic.speed, 20, MazeStrategy.manhattan, Sonic.hitpoints);
    this.createVisual(Sonic.sprite, [5]);
  }
}
