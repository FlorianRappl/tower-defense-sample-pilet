var GateToHell = Tower.extend({
	init: function() {
		this._super(GateToHell.speed, 200, GateToHell.range, GateToHell.shotType);
		this.typeName = 'GateToHell';
		this.createVisual(GateToHell.sprite, [6]);
	},
}, function(gate) {
	gate.description = 'Paint rules! This is the ultimate weapon of war, but it will not kill high speed units.';
	gate.nickName = 'Hellgate';
	gate.sprite = 'gatetohell';
	gate.frames = 6;
	gate.shotType = HellShot;
	gate.speed = 1.0;
	gate.range = 2.0;
	gate.rating = gate.speed * Math.log(gate.range + 1.0) * gate.shotType.rating;
	gate.cost = 30;
	types.towers['GateToHell'] = gate;
});
