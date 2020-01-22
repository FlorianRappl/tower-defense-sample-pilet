var DarkNut = Unit.extend({
	init: function() {
		this._super(DarkNut.speed, 80, MazeStrategy.euclideanNoSQR, DarkNut.hitpoints);
		this.createVisual(DarkNut.sprite, [4, 4, 4, 4]);
	},
}, function(nut) {
	nut.speed = 2.5;
	nut.frames = 16;
	nut.hitpoints = 150;
	nut.description = 'The dark nut is an ancient warrier that takes quite some hits. His speed is superior to most other units.';
	nut.nickName = 'Dark Nut';
	nut.sprite = 'darknut';
	nut.rating = nut.speed * nut.hitpoints;
	types.units['DarkNut'] = nut;
});
