var Armos = Unit.extend({
	init: function() {
		this._super(Armos.speed, 125, MazeStrategy.euclidean, Armos.hitpoints);
		this.createVisual(Armos.sprite, [4, 4, 4, 4], 1.2);
	},
}, function(armos) {
	armos.speed = 1.0;
	armos.frames = 16;
	armos.hitpoints = 600;
	armos.description = 'The unit is actually called Armos and not Armor, however, Armor would have been a good name as well. You will need some fire power to bring him down.';
	armos.nickName = 'Armos';
	armos.sprite = 'armos';
	armos.rating = armos.speed * armos.hitpoints;
	types.units['Armos'] = armos;
});
