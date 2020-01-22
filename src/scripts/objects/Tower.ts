import { GameObject } from './GameObject';
import { Unit } from './Unit';
import { ShotConstructor, Shot } from './Shot';
import { events, constants } from '../manifest';
import { Direction, MazeStrategy } from '../types';

export class Tower extends GameObject {
  public targets: Array<Unit> = [];
  public timeToNextShot = 0;
  public mazeWeight = 0;
  public direction = Direction.left;

  constructor(
    public typeName: string,
    speed?: number,
    animationDelay?: number,
    public range = 0,
    public shotType?: ShotConstructor,
  ) {
    super(speed, animationDelay);
    this.registerEvent(events.shot);
  }

  targetFilter(target: Unit) {
    return target.mazeStrategy !== MazeStrategy.air;
  }

  update() {
    super.update();
    let shot: Shot = undefined;

    if (this.timeToNextShot <= 0) {
      shot = this.shoot();
    }

    if (shot) {
      this.triggerEvent(events.shot, shot);
      this.timeToNextShot = ~~(1000 / this.speed);
    } else {
      this.timeToNextShot -= constants.ticks;
    }
  }

  shoot() {
    const targets = this.targets.filter(this.targetFilter);
    const closestTarget = this.getClosestTarget(targets, this.range);

    if (closestTarget && this.shotType) {
      const shot = new this.shotType();
      shot.mazeCoordinates = this.mazeCoordinates;
      shot.velocity = closestTarget.mazeCoordinates.subtract(this.mazeCoordinates);
      shot.direction = shot.velocity.toDirection();
      shot.targets = targets;
      this.direction = shot.direction;
      return shot;
    }

    return undefined;
  }
}
