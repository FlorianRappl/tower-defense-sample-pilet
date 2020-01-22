var HellShot = Shot.extend({
	init: function() {
		this._super(HellShot.speed, 75, HellShot.damage, HellShot.impactRadius);
		this.createVisual(HellShot.sprite, [12]);
		this.playSound('hellshot');
	},
}, function(hell) {
	hell.nickName = 'HDEB';
	hell.description = 'The High Dark Energy Density is shot by the gate to hell. It catches your soul and gives you the rest.';
	hell.sprite = 'hellshot';
	hell.frames = 12;
	hell.speed = 2.0;
	hell.damage = 300;
	hell.impactRadius = 0.5;
	hell.rating = Math.log(hell.speed + 1) * hell.damage * Math.log(hell.impactRadius + 1);
	types.shots['HellShot'] = hell;
});
