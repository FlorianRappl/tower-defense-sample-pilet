var Tower = GameObject.extend({
	init: function(speed, animationDelay, range, shotType) {
		this._super(speed, animationDelay);
		this.range = range || 0;
		this.targets = [];
		this.timeToNextShot = 0;
		this.mazeWeight = 0;
		this.direction = Direction.left;
		this.shotType = shotType || {};
		this.registerEvent(events.shot);
	},
	targetFilter: function(target) {
		return target.strategy !== MazeStrategy.air;
	},
	update: function() {
		this._super();
		var shot = undefined;

		if (this.timeToNextShot <= 0)
			shot = this.shoot();

		if (shot) {
			this.triggerEvent(events.shot, shot);
			this.timeToNextShot = ~~(1000 / this.speed);
		} else
			this.timeToNextShot -= constants.ticks;
	},
	shoot: function() {
		var targets = this.targets.filter(this.targetFilter);
		var closestTarget = this.getClosestTarget(targets, this.range);

		if (closestTarget) {
			var shot = new (this.shotType)();
            shot.mazeCoordinates = this.mazeCoordinates;
            shot.velocity = closestTarget.mazeCoordinates.subtract(this.mazeCoordinates);
            shot.direction = shot.velocity.toDirection();
            shot.targets = targets;
            this.direction = shot.direction;
            return shot;
		}
	},
});
