import { Shot } from '../objects/Shot';

export class MGShot extends Shot {
  static nickName = 'Nato cal. 7.72';
  static description = 'Standard MG shot: 7.72 mm full metal jacket that handles most guys.';
  static sprite = 'mgshot';
  static frames = 4;
  static speed = 8.0;
  static damage = 2;
  static impactRadius = 0.5;
  static rating = Math.log(MGShot.speed + 1) * MGShot.damage * Math.log(MGShot.impactRadius + 1);

  constructor() {
    super(MGShot.speed, 25, MGShot.damage, MGShot.impactRadius);
    this.createVisual(MGShot.sprite, [1, 1, 1, 1], 0.3);
    this.playSound('mgnest');
  }
}
