import { GameObject } from './GameObject';
import { events, constants } from '../manifest';
import { Point } from '../utils';

export interface ShotConstructor {
  new(): Shot;
}

export class Shot extends GameObject {
  public targets: Array<GameObject> = [];
  public velocity = new Point();
  public timeToDamagability: number;

  constructor(speed?: number, animationDelay?: number, public damage = 0, public impactRadius = 0.5) {
    super(speed, animationDelay);
    this.timeToDamagability = ~~(200 / this.speed);
    this.registerEvent(events.hit);
  }

  update() {
    const pt = this.velocity.scale(this.speed * constants.ticks * 0.001);
    this.mazeCoordinates = this.mazeCoordinates.add(pt);
    super.update();

    if (this.timeToDamagability > 0) {
      this.timeToDamagability -= constants.ticks;
    } else {
      const closestTarget = this.getClosestTarget(this.targets, this.impactRadius);

      if (closestTarget) {
        closestTarget.hit(this);
        this.dead = true;
        this.triggerEvent(events.hit, closestTarget);
      }
    }
  }
}
