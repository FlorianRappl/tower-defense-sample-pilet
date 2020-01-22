var FlameShot = Shot.extend({
	init: function() {
		this._super(FlameShot.speed, 100, FlameShot.damage, FlameShot.impactRadius);
		this.createVisual(FlameShot.sprite, [8]);
		this.playSound('flames');
	},
}, function(flame) {
	flame.nickName = 'Red Napalm';
	flame.description = "Napalm power you don't want to mess with.";
	flame.sprite = 'flameshot';
	flame.frames = 8;
	flame.speed = 1.5;
	flame.damage = 8;
	flame.impactRadius = 0.5;
	flame.rating = Math.log(flame.speed + 1) * flame.damage * Math.log(flame.impactRadius + 1);
	types.shots['FlameShot'] = flame;
});
