var StandardShot = Shot.extend({
	init: function() {
		this._super(StandardShot.speed, 15, StandardShot.damage, StandardShot.impactRadius);
		this.createVisual(StandardShot.sprite, [1], 0.25);
		this.playSound('wowpulse');
	},
}, function(std) {
	std.nickName = 'Standard';
	std.description = 'Just an ordinary shot with no special ability.';
	std.sprite = 'sunshot';
	std.frames = 1;
	std.speed = 10;
	std.damage = 1;
	std.impactRadius = 0.5;
	std.rating = Math.log(std.speed + 1) * std.damage * Math.log(std.impactRadius + 1);
	//types.shots['StandardShot'] = std;
});
