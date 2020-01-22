var FireWizzrobe = Unit.extend({
	init: function() {
		this._super(FireWizzrobe.speed, 70, MazeStrategy.manhattan, FireWizzrobe.hitpoints);
		this.createVisual(FireWizzrobe.sprite, [3, 3, 3, 3], 1.4);
	},
}, function(wizz) {
	wizz.speed = 3.0;
	wizz.frames = 12;
	wizz.hitpoints = 30;
	wizz.description = 'The wizard with the fire robe is quite fast, but does not take very much.';
	wizz.nickName = 'Wizzrobe';
	wizz.sprite = 'firewizzrobe';
	wizz.rating = wizz.speed * wizz.hitpoints;
	types.units['FireWizzrobe'] = wizz;
});
