import { Shot } from '../objects/Shot';

export class AirShot extends Shot {
  static nickName = 'SAM';
  static description = 'Surface to air missile that is highly effective.';
  static sprite = 'airshot';
  static frames = 4;
  static speed = 2.5;
  static damage = 5;
  static impactRadius = 0.5;
  static rating = Math.log(AirShot.speed + 1) * AirShot.damage * Math.log(AirShot.impactRadius + 1);

  constructor() {
    super(AirShot.speed, 10, AirShot.damage, AirShot.impactRadius);
    this.createVisual(AirShot.sprite, [1, 1, 1, 1], 0.2);
    this.playSound('flak');
  }
}
