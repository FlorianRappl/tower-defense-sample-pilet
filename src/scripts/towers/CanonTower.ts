import { Tower } from '../objects/Tower';
import { ShellShot } from '../shots/ShellShot';

export class CanonTower extends Tower {
  static description =
    'The backbone in war! It has an amazing range and shoots shells, however, the firing speed could be better.';
  static nickName = 'Canon';
  static sprite = 'canontower';
  static frames = 4;
  static shotType = ShellShot;
  static speed = 1.0;
  static range = 8.0;
  static rating = CanonTower.speed * Math.log(CanonTower.range + 1.0) * CanonTower.shotType.rating;
  static cost = Math.round(CanonTower.rating / 6.0 + 1.0);

  constructor() {
    super('CanonTower', CanonTower.speed, 50, CanonTower.range, CanonTower.shotType);
    this.createVisual(CanonTower.sprite, [1, 1, 1, 1]);
  }
}
