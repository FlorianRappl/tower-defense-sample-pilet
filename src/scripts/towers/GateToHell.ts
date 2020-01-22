import { Tower } from '../objects/Tower';
import { HellShot } from '../shots/HellShot';

export class GateToHell extends Tower {
  static description = 'Paint rules! This is the ultimate weapon of war, but it will not kill high speed units.';
  static nickName = 'Hellgate';
  static sprite = 'gatetohell';
  static frames = 6;
  static shotType = HellShot;
  static speed = 1.0;
  static range = 2.0;
  static cost = 30;
  static rating = GateToHell.speed * Math.log(GateToHell.range + 1.0) * GateToHell.shotType.rating;

  constructor() {
    super('GateToHell', GateToHell.speed, 200, GateToHell.range, GateToHell.shotType);
    this.createVisual(GateToHell.sprite, [6]);
  }
}
