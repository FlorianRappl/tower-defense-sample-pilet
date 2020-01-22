import { Tower } from '../objects/Tower';
import { MGShot } from '../shots/MGShot';

export class MGNest extends Tower {
  static description = 'The MG Nest is cheap but powerful. It can help you a lot against low armored units.';
  static nickName = 'MG Nest';
  static sprite = 'mgnest';
  static frames = 1;
  static shotType = MGShot;
  static speed = 4.0;
  static range = 4.0;
  static rating = MGNest.speed * Math.log(MGNest.range + 1.0) * MGNest.shotType.rating;
  static cost = Math.round(MGNest.rating / 6.0 + 1.0);

  constructor() {
    super('MGNest', MGNest.speed, 25, MGNest.range, MGNest.shotType);
    this.createVisual(MGNest.sprite, [1]);
  }
}
