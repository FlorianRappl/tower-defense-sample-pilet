var Sonic = Unit.extend({
	init: function() {
		this._super(Sonic.speed, 20, MazeStrategy.manhattan, Sonic.hitpoints);
		this.createVisual(Sonic.sprite, [5]);
	},
}, function(sonic) {
	sonic.speed = 5.0;
	sonic.frames = 5;
	sonic.hitpoints = 1000;
	sonic.description = 'Fast and very deadly. This hedgehog survives a lot and does it with style.';
	sonic.nickName = 'Sonic';
	sonic.sprite = 'sonic';
	sonic.rating = sonic.speed * sonic.hitpoints;
	types.units['Sonic'] = sonic;
});
