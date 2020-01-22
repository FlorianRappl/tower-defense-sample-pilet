import { Shot } from '../objects/Shot';

export class ShellShot extends Shot {
  static nickName = 'Shell';
  static description = 'Hardened steel projectile that is no joke.';
  static sprite = 'shellshot';
  static frames = 4;
  static speed = 40;
  static damage = 15;
  static impactRadius = 0.5;
  static rating = Math.log(ShellShot.speed + 1) * ShellShot.damage * Math.log(ShellShot.impactRadius + 1);

  constructor() {
    super(ShellShot.speed, 25, ShellShot.damage, ShellShot.impactRadius);
    this.createVisual(ShellShot.sprite, [1, 1, 1, 1], 0.3);
    this.playSound('artillery');
  }
}
