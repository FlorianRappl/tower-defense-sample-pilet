import { Tower } from '../objects/Tower';

export class Rock extends Tower {
	static description = "Just a rock ... a big ROCK. If you can't boulder you have to go around.";
	static nickName = 'Rock';
	static sprite = 'rock';
	static frames = 1;
	static shotType = {};
	static speed = 0;
	static range = 0;
	static rating = 0;
  static cost = 1.0;

	constructor() {
		super('Rock', Rock.speed, 200, Rock.range);
		this.createVisual(Rock.sprite, [1]);
  }
};
