import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class Armos extends Unit {
  static speed = 1.0;
  static frames = 16;
  static hitpoints = 600;
  static description =
    'The unit is actually called Armos and not Armor, however, Armor would have been a good name as well. You will need some fire power to bring him down.';
  static nickName = 'Armos';
  static sprite = 'armos';
  static rating = Armos.speed * Armos.hitpoints;

  constructor() {
    super(Armos.speed, 125, MazeStrategy.euclidean, Armos.hitpoints);
    this.createVisual(Armos.sprite, [4, 4, 4, 4], 1.2);
  }
}
