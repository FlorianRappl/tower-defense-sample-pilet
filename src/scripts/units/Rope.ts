import { Unit } from '../objects/Unit';
import { MazeStrategy } from '../types';

export class Rope extends Unit {
	static speed = 2.0;
	static frames = 16;
	static hitpoints = 20;
	static description = 'An ugly rope that tries to conquer the zone. Watch out when they mass up!';
	static nickName = 'Rope';
	static sprite = 'rope';
  static rating = Rope.speed * Rope.hitpoints;

	constructor() {
		super(Rope.speed, 80, MazeStrategy.euclideanNoSQR, Rope.hitpoints);
		this.createVisual(Rope.sprite, [4, 4, 4, 4], 0.8);
	}
}
