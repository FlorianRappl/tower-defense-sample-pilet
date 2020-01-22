import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class FireWizzrobe extends Unit {
  static speed = 3.0;
  static frames = 12;
  static hitpoints = 30;
  static description = 'The wizard with the fire robe is quite fast, but does not take very much.';
  static nickName = 'Wizzrobe';
  static sprite = 'firewizzrobe';
  static rating = FireWizzrobe.speed * FireWizzrobe.hitpoints;

  constructor() {
    super(FireWizzrobe.speed, 70, MazeStrategy.manhattan, FireWizzrobe.hitpoints);
    this.createVisual(FireWizzrobe.sprite, [3, 3, 3, 3], 1.4);
  }
}
