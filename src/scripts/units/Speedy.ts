var Speedy = Unit.extend({
	init: function() {
		this._super(Speedy.speed, 25, MazeStrategy.diagonalShortCut, Speedy.hitpoints);
		this.createVisual(Speedy.sprite, [20]);
	},
}, function(unit) {
	unit.speed = 7.0;
	unit.frames = 20;
	unit.hitpoints = 200;
	unit.description = 'This unit is just a single blob. It is ultra fast and has quite some armor. It will give you some trouble.';
	unit.nickName = 'HAL';
	unit.sprite = 'newunit';
	unit.rating = unit.speed * unit.hitpoints;
	types.units['Speedy'] = unit;
});
