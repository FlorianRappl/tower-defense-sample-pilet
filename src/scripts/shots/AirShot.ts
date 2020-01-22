var AirShot = Shot.extend({
	init: function() {
		this._super(AirShot.speed, 10, AirShot.damage, AirShot.impactRadius);
		this.createVisual(AirShot.sprite, [1, 1, 1, 1], 0.2);
		this.playSound('flak');
	},
}, function(air) {
	air.nickName = 'SAM';
	air.description = 'Surface to air missile that is highly effective.';
	air.sprite = 'airshot';
	air.frames = 4;
	air.speed = 2.5;
	air.damage = 5;
	air.impactRadius = 0.5;
	air.rating = Math.log(air.speed + 1) * air.damage * Math.log(air.impactRadius + 1);
	types.shots['AirShot'] = air;
});
