var LaserShot = Shot.extend({
	init: function() {
		this._super(LaserShot.speed, 25, LaserShot.damage, LaserShot.impactRadius);
		this.createVisual(LaserShot.sprite, [6, 6, 6, 6]);
		this.playSound('laser');
	},
}, function(laser) {
	laser.nickName = 'Faser';
	laser.description = 'Neutrino shot: Hits before fired (from the perspective of any observer).';
	laser.sprite = 'lasershot';
	laser.frames = 24;
	laser.speed = 10;
	laser.damage = 7;
	laser.impactRadius = 0.5;
	laser.rating = Math.log(laser.speed + 1) * laser.damage * Math.log(laser.impactRadius + 1);
	types.shots['LaserShot'] = laser;
});
