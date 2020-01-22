import { Shot } from '../objects/Shot';

export class HellShot extends Shot {
  static nickName = 'HDEB';
  static description =
    'The High Dark Energy Density is shot by the gate to static  It catches your soul and gives you the rest.';
  static sprite = 'hellshot';
  static frames = 12;
  static speed = 2.0;
  static damage = 300;
  static impactRadius = 0.5;
  static rating = Math.log(HellShot.speed + 1) * HellShot.damage * Math.log(HellShot.impactRadius + 1);

  constructor() {
    super(HellShot.speed, 75, HellShot.damage, HellShot.impactRadius);
    this.createVisual(HellShot.sprite, [12]);
    this.playSound('hellshot');
  }
}
