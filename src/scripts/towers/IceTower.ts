var IceTower = Tower.extend({
	init: function() {
		this._super(IceTower.speed, 200, IceTower.range, IceTower.shotType);
		this.typeName = 'IceTower';
		this.createVisual(IceTower.sprite, [1, 1, 1, 1]);
	},
}, function(ice) {
	ice.description = 'Cool. Slow shots, but with high efficiency. The right choice against slow strongly armored units.';
	ice.nickName = 'Ice-Tower';
	ice.sprite = 'icetower';
	ice.frames = 4;
	ice.shotType = IceShot;
	ice.speed = 2.0;
	ice.range = 6.0;
	ice.rating = ice.speed * Math.log(ice.range + 1.0) * ice.shotType.rating;
	ice.cost = 9;
	types.towers['IceTower'] = ice;
});
