import { GameObject } from '../objects';

export class Shot extends GameObject {
  constructor(speed, animationDelay, damage, impactRadius) {
    super(speed, animationDelay);
    this.damage = damage || 0;
    this.targets = [];
    this.impactRadius = impactRadius || 0.5;
    this.timeToDamagability = ~~(200 / this.speed);
    this.velocity = new Point();
    this.registerEvent(events.hit);
  }

  update() {
    var pt = this.velocity.scale(this.speed * constants.ticks * 0.001);
    this.mazeCoordinates = this.mazeCoordinates.add(pt);
    super.update();

    if (this.timeToDamagability > 0) {
      this.timeToDamagability -= constants.ticks;
    } else {
      var closestTarget = this.getClosestTarget(this.targets, this.impactRadius);

      if (closestTarget) {
        closestTarget.hit(this);
        this.dead = true;
        this.triggerEvent(events.hit, closestTarget);
      }
    }
  }
}
