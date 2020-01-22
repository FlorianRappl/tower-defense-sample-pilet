import { Tower } from '../objects/Tower';
import { Unit } from '../objects/Unit';
import { AirShot } from '../shots/AirShot';
import { MazeStrategy } from '../types';

export class Flak extends Tower {
  static description = 'SAM! The only anti-air tower you will ever want (and you will ever get in this game).';
  static nickName = 'SAM';
  static sprite = 'flak';
  static frames = 4;
  static shotType = AirShot;
  static speed = 5.0;
  static range = 5.0;
  static cost = 4;
  static rating = Flak.speed * Math.log(Flak.range + 1.0) * Flak.shotType.rating;

  constructor() {
    super('Flak', Flak.speed, 200, Flak.range, Flak.shotType);
    this.createVisual(Flak.sprite, [1, 1, 1, 1]);
  }

  targetFilter(target: Unit) {
    return target.mazeStrategy === MazeStrategy.air;
  }
}
