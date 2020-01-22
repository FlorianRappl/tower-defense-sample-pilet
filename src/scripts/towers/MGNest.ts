var MGNest = Tower.extend({
	init: function() {
		this._super(MGNest.speed, 25, MGNest.range, MGNest.shotType);
		this.typeName = 'MGNest';
		this.createVisual(MGNest.sprite, [1]);
	},
}, function(nest) {
	nest.description = 'The MG Nest is cheap but powerful. It can help you a lot against low armored units.';
	nest.nickName = 'MG Nest';
	nest.sprite = 'mgnest';
	nest.frames = 1;
	nest.shotType = MGShot;
	nest.speed = 4.0;
	nest.range = 4.0;
	nest.rating = nest.speed * Math.log(nest.range + 1.0) * nest.shotType.rating;
	nest.cost = Math.round(nest.rating / 6.0 + 1.0);
	types.towers['MGNest'] = nest;
});
