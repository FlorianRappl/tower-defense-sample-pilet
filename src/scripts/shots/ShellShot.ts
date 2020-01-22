var ShellShot = Shot.extend({
	init: function() {
		this._super(ShellShot.speed, 25, ShellShot.damage, ShellShot.impactRadius);
		this.createVisual(ShellShot.sprite, [1, 1, 1, 1], 0.3);
		this.playSound('artillery');
	},
}, function(shell) {
	shell.nickName = 'Shell';
	shell.description = 'Hardened steel projectile that is no joke.';
	shell.sprite = 'shellshot';
	shell.frames = 4;
	shell.speed = 40;
	shell.damage = 15;
	shell.impactRadius = 0.5;
	shell.rating = Math.log(shell.speed + 1) * shell.damage * Math.log(shell.impactRadius + 1);
	types.shots['ShellShot'] = shell;
});
