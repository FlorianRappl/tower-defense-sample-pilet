import { Tower } from '../objects/Tower';
import { IceShot } from '../shots/IceShot';

export class IceTower extends Tower {
  static description =
    'Cool. Slow shots, but with high efficiency. The right choice against slow strongly armored units.';
  static nickName = 'Ice-Tower';
  static sprite = 'icetower';
  static frames = 4;
  static shotType = IceShot;
  static speed = 2.0;
  static range = 6.0;
  static cost = 9;
  static rating = IceTower.speed * Math.log(IceTower.range + 1.0) * IceTower.shotType.rating;

  constructor() {
    super('IceTower', IceTower.speed, 200, IceTower.range, IceTower.shotType);
    this.createVisual(IceTower.sprite, [1, 1, 1, 1]);
  }
}
