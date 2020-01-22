var FlameTower = Tower.extend({
	init: function() {
		this._super(FlameTower.speed, 200, FlameTower.range, FlameTower.shotType);
		this.typeName = 'FlameTower';
		this.createVisual(FlameTower.sprite, [4]);
	},
}, function(flame) {
	flame.description = 'Burn them down but a bit faster ... Excellent for slow armored units, but fails against strong armored enemies.';
	flame.nickName = 'Flame tower';
	flame.sprite = 'flametower';
	flame.frames = 4;
	flame.shotType = FlameShot;
	flame.speed = 6.0;
	flame.range = 2.0;
	flame.rating = flame.speed * Math.log(flame.range + 1.0) * flame.shotType.rating;
	flame.cost = 5;
	types.towers['FlameTower'] = flame;
});
