import { Shot } from '../objects/Shot';

export class StandardShot extends Shot {
  static nickName = 'Standard';
  static description = 'Just an ordinary shot with no special ability.';
  static sprite = 'sunshot';
  static frames = 1;
  static speed = 10;
  static damage = 1;
  static impactRadius = 0.5;
  static rating = Math.log(StandardShot.speed + 1) * StandardShot.damage * Math.log(StandardShot.impactRadius + 1);

  constructor() {
    super(StandardShot.speed, 15, StandardShot.damage, StandardShot.impactRadius);
    this.createVisual(StandardShot.sprite, [1], 0.25);
    this.playSound('wowpulse');
  }
}
