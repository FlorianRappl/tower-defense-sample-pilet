import { Shot } from '../objects/Shot';

export class IceShot extends Shot {
  static nickName = 'Snowball 5';
  static description = 'An experimental super cold plasma (cold is relative here).';
  static sprite = 'iceshot';
  static frames = 4;
  static speed = 3.5;
  static damage = 15;
  static impactRadius = 0.5;
  static rating = Math.log(IceShot.speed + 1) * IceShot.damage * Math.log(IceShot.impactRadius + 1);

  constructor() {
    super(IceShot.speed, 200, IceShot.damage, IceShot.impactRadius);
    this.createVisual(IceShot.sprite, [4]);
    this.playSound('icy');
  }
}
