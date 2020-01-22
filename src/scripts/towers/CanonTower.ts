var CanonTower = Tower.extend({
	init: function() {
		this._super(CanonTower.speed, 50, CanonTower.range, CanonTower.shotType);
		this.typeName = 'CanonTower';
		this.createVisual(CanonTower.sprite, [1, 1, 1, 1]);
	},
}, function(canon) {
	canon.description = 'The backbone in war! It has an amazing range and shoots shells, however, the firing speed could be better.';
	canon.nickName = 'Canon';
	canon.sprite = 'canontower';
	canon.frames = 4;
	canon.shotType = ShellShot;
	canon.speed = 1.0;
	canon.range = 8.0;
	canon.rating = canon.speed * Math.log(canon.range + 1.0) * canon.shotType.rating;
	canon.cost = Math.round(canon.rating / 6.0 + 1.0);
	types.towers['CanonTower'] = canon;
});
