var MGShot = Shot.extend({
	init: function() {
		this._super(MGShot.speed, 25, MGShot.damage, MGShot.impactRadius);
		this.createVisual(MGShot.sprite, [1, 1, 1, 1], 0.3);
		this.playSound('mgnest');
	},
}, function(mg) {
	mg.nickName = 'Nato cal. 7.72';
	mg.description = 'Standard MG shot: 7.72 mm full metal jacket that handles most guys.';
	mg.sprite = 'mgshot';
	mg.frames = 4;
	mg.speed = 8.0;
	mg.damage = 2;
	mg.impactRadius = 0.5;
	mg.rating = Math.log(mg.speed + 1) * mg.damage * Math.log(mg.impactRadius + 1);
	types.shots['MGShot'] = mg;
});
