var Flak = Tower.extend({
	init: function() {
		this._super(Flak.speed, 200, Flak.range, Flak.shotType);
		this.typeName = 'Flak';
		this.createVisual(Flak.sprite, [1, 1, 1, 1]);
	},
	targetFilter: function(target) {
			return target.strategy === MazeStrategy.air;
	},
}, function(flak) {
	flak.description = 'SAM! The only anti-air tower you will ever want (and you will ever get in this game).';
	flak.nickName = 'SAM';
	flak.sprite = 'flak';
	flak.frames = 4;
	flak.shotType = AirShot;
	flak.speed = 5.0;
	flak.range = 5.0;
	flak.rating = flak.speed * Math.log(flak.range + 1.0) * flak.shotType.rating;
	flak.cost = 4;
	types.towers['Flak'] = flak;
});
