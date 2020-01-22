import { Shot } from '../objects/Shot';

export class LaserShot extends Shot {
  static nickName = 'Faser';
  static description = 'Neutrino shot: Hits before fired (from the perspective of any observer).';
  static sprite = 'lasershot';
  static frames = 24;
  static speed = 10;
  static damage = 7;
  static impactRadius = 0.5;
  static rating = Math.log(LaserShot.speed + 1) * LaserShot.damage * Math.log(LaserShot.impactRadius + 1);

  constructor() {
    super(LaserShot.speed, 25, LaserShot.damage, LaserShot.impactRadius);
    this.createVisual(LaserShot.sprite, [6, 6, 6, 6]);
    this.playSound('laser');
  }
}
