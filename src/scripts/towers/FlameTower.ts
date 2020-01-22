import { Tower } from '../objects/Tower';
import { FlameShot } from '../shots/FlameShot';

export class FlameTower extends Tower {
  static description =
    'Burn them down but a bit faster ... Excellent for slow armored units, but fails against strong armored enemies.';
  static nickName = 'Flame tower';
  static sprite = 'flametower';
  static frames = 4;
  static shotType = FlameShot;
  static speed = 6.0;
  static range = 2.0;
  static cost = 5;
  static rating = FlameTower.speed * Math.log(FlameTower.range + 1.0) * FlameTower.shotType.rating;

  constructor() {
    super('FlameTower', FlameTower.speed, 200, FlameTower.range, FlameTower.shotType);
    this.createVisual(FlameTower.sprite, [4]);
  }
}
