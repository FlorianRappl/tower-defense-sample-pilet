var LaserTower = Tower.extend({
	init: function() {
		this._super(LaserTower.speed, 25, LaserTower.range, LaserTower.shotType);
		this.typeName = 'LaserTower';
		this.createVisual(LaserTower.sprite, [1, 1, 1, 1]);
	},
}, function(laser) {
	laser.description = "Won't play with you, but does it with high efficiency. Really fast low damage shots.";
	laser.nickName = 'Faser';
	laser.sprite = 'lasertower';
	laser.frames = 4;
	laser.shotType = LaserShot;
	laser.speed = 3.0;
	laser.range = 5.0;
	laser.rating = laser.speed * Math.log(laser.range + 1.0) * laser.shotType.rating;
	laser.cost = 11;
	types.towers['LaserTower'] = laser;
});
