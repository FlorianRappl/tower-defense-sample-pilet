import { Tower } from '../objects/Tower';
import { LaserShot } from '../shots/LaserShot';

export class LaserTower extends Tower {
  static description = "Won't play with you, but does it with high efficiency. Really fast low damage shots.";
  static nickName = 'Faser';
  static sprite = 'lasertower';
  static frames = 4;
  static shotType = LaserShot;
  static speed = 3.0;
  static range = 5.0;
  static cost = 11;
  static rating = LaserTower.speed * Math.log(LaserTower.range + 1.0) * LaserTower.shotType.rating;

  constructor() {
    super('LaserTower', LaserTower.speed, 25, LaserTower.range, LaserTower.shotType);
    this.createVisual(LaserTower.sprite, [1, 1, 1, 1]);
  }
}
