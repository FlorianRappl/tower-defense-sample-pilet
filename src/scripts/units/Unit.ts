var Unit = GameObject.extend({
  init: function(speed, animationDelay, mazeStrategy, hitpoints) {
   this._super(speed, animationDelay);
    this.timer = 0;
    this.path = new Path([]);
    this.mazeCoordinates = new Point();
    this.damage = 1;
    this.strategy = mazeStrategy || MazeStrategy.air;
    this.hitpoints = hitpoints || 0;
    this.health = this.hitpoints;
    this.direction = Direction.right;
    this.registerEvent(events.accomplished);
    this.registerEvent(events.died);
  },
  playInitSound: function() {
   this.playSound('humm');
  },
  playDeathSound: function() {
    this.playSound('explosion');
  },
  playVictorySound: function() {
   this.playSound('laugh');
  },
  update: function() {
    this._super();
    this.timer += constants.ticks;
    var s = this.speed * 0.001;

    if (!this.dead && s > 0) {
      var sigma = this.path.propagate(s * this.timer);

      if (!sigma) {
        this.dead = true;
        this.triggerEvent(events.accomplished, this);
        this.playVictorySound();
      } else {
        this.mazeCoordinates = sigma.point;
        this.direction = sigma.direction;
      }
    }
  },
 draw: function(ctx, x, y, width, height) {
   var maxLength = 12;
   var barLength = maxLength * this.health / this.hitpoints;
   x += (width - maxLength) * 0.5;
   ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
   ctx.fillRect(x, y - 6, maxLength, 3);
   ctx.fillStyle = '#00ff00';
   ctx.fillRect(x, y - 6, barLength, 3);
 },
  hit: function(shot) {
    this.health -= shot.damage;

    if (!this.dead && this.health <= 0) {
      this.health = 0;
      this.dead = true;
      this.triggerEvent(events.died, this);
      this.playDeathSound();
    }
  },
});
