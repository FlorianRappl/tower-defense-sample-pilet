import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class AirWolf extends Unit {
  static speed = 2.0;
  static frames = 4;
  static hitpoints = 40;
  static description =
    'The air wolf is the only aerial unit in the game. Do not underestimate him as an air wolf fleet could kill you.';
  static nickName = 'Wolf';
  static sprite = 'airwolf';
  static rating = AirWolf.speed * AirWolf.hitpoints * 1.2;

  constructor() {
    super(AirWolf.speed, 50, MazeStrategy.air, AirWolf.hitpoints);
    this.createVisual(AirWolf.sprite, [4]);
  }
}
