var AirWolf = Unit.extend({
	init: function() {
		this._super(AirWolf.speed, 50, MazeStrategy.air, AirWolf.hitpoints);
		this.createVisual(AirWolf.sprite, [4]);
	},
}, function(wolf) {
	wolf.speed = 2.0;
	wolf.frames = 4;
	wolf.hitpoints = 40;
	wolf.description = 'The air wolf is the only aerial unit in the game. Do not underestimate him as an air wolf fleet could kill you.';
	wolf.nickName = 'Wolf';
	wolf.sprite = 'airwolf';
	wolf.rating = wolf.speed * wolf.hitpoints * 1.2;
	types.units['AirWolf'] = wolf;
});
