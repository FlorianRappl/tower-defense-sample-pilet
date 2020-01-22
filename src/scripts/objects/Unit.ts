import { GameObject } from './GameObject';
import { Shot } from './Shot';
import { Path, Point } from '../utils';
import { events, constants } from '../manifest';
import { MazeStrategy, Direction } from '../types';

export class Unit extends GameObject {
  public health: number;
  public damage = 1;
  public timer = 0;
  public path = new Path([]);
  public direction = Direction.right;
  public mazeCoordinates = new Point();

  constructor(speed?: number, animationDelay?: number, public mazeStrategy = MazeStrategy.air, public hitpoints = 0) {
    super(speed, animationDelay);
    this.health = hitpoints;
    this.registerEvent(events.accomplished);
    this.registerEvent(events.died);
  }

  playInitSound() {
    this.playSound('humm');
  }

  playDeathSound() {
    this.playSound('explosion');
  }

  playVictorySound() {
    this.playSound('laugh');
  }

  update() {
    super.update();
    this.timer += constants.ticks;
    const s = this.speed * 0.001;

    if (!this.dead && s > 0) {
      const sigma = this.path.propagate(s * this.timer);

      if (!sigma) {
        this.dead = true;
        this.triggerEvent(events.accomplished, this);
        this.playVictorySound();
      } else {
        this.mazeCoordinates = sigma.point;
        this.direction = sigma.direction;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const maxLength = 12;
    const barLength = (maxLength * this.health) / this.hitpoints;
    x += (width - maxLength) * 0.5;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x, y - 6, maxLength, 3);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x, y - 6, barLength, 3);
  }

  hit(shot: Shot) {
    this.health -= shot.damage;

    if (!this.dead && this.health <= 0) {
      this.health = 0;
      this.dead = true;
      this.triggerEvent(events.died, this);
      this.playDeathSound();
    }
  }
}
