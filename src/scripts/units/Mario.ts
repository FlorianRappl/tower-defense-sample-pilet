var Mario = Unit.extend({
	init: function() {
		this._super(Mario.speed, 100, MazeStrategy.manhattan, Mario.hitpoints);
		this.createVisual(Mario.sprite, [8, 8, 8, 8]);
	},
}, function(enemy) {
	enemy.speed = 2.0;
	enemy.frames = 32;
	enemy.hitpoints = 10;
	enemy.description = 'You have to be careful with that plumber.';
	enemy.nickName = 'Mario';
	enemy.sprite = 'mario';
	enemy.rating = enemy.speed * enemy.hitpoints;
	types.units['Mario'] = enemy;
});
