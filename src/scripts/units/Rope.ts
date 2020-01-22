var Rope = Unit.extend({
	init: function() {
		this._super(Rope.speed, 80, MazeStrategy.euclideanNoSQR, Rope.hitpoints);
		this.createVisual(Rope.sprite, [4, 4, 4, 4], 0.8);
	},
}, function(rope) {
	rope.speed = 2.0;
	rope.frames = 16;
	rope.hitpoints = 20;
	rope.description = 'An ugly rope that tries to conquer the zone. Watch out when they mass up!';
	rope.nickName = 'Rope';
	rope.sprite = 'rope';
	rope.rating = rope.speed * rope.hitpoints;
	types.units['Rope'] = rope;
});
