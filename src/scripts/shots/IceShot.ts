var IceShot = Shot.extend({
	init: function() {
		this._super(IceShot.speed, 200, IceShot.damage, IceShot.impactRadius);
		this.createVisual(IceShot.sprite, [4]);
		this.playSound('icy');
	},
}, function(ice) {
	ice.nickName = 'Snowball 5';
	ice.description = 'An experimental super cold plasma (cold is relative here).';
	ice.sprite = 'iceshot';
	ice.frames = 4;
	ice.speed = 3.5;
	ice.damage = 15;
	ice.impactRadius = 0.5;
	ice.rating = Math.log(ice.speed + 1) * ice.damage * Math.log(ice.impactRadius + 1);
	types.shots['IceShot'] = ice;
});
