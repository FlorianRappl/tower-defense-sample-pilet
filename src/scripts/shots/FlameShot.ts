import { Shot } from '../objects/Shot';

export class FlameShot extends Shot {
  static nickName = 'Red Napalm';
  static description = "Napalm power you don't want to mess with.";
  static sprite = 'flameshot';
  static frames = 8;
  static speed = 1.5;
  static damage = 8;
  static impactRadius = 0.5;
  static rating = Math.log(FlameShot.speed + 1) * FlameShot.damage * Math.log(FlameShot.impactRadius + 1);

  constructor() {
    super(FlameShot.speed, 100, FlameShot.damage, FlameShot.impactRadius);
    this.createVisual(FlameShot.sprite, [8]);
    this.playSound('flames');
  }
}
