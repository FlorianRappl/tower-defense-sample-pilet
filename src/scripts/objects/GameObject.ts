import { Base } from './Base';
import { Point } from '../utils';
import { Sound } from '../Sound';
import { constants, sounds, images } from '../manifest';
import { Direction, IVisual } from '../types';

export class GameObject extends Base {
  public z = 0;
  public mazeCoordinates = new Point();
  public dead = false;
  public direction = Direction.right;
  public visual: IVisual;

  constructor(public speed = 0, public animationDelay = 15) {
    super();
  }

  distanceTo(point: Point) {
    return point.subtract(this.mazeCoordinates).norm();
  }

  update() {
    const visual = this.visual;
    const direction = visual.frames.length === 4 ? this.direction : 0;
    visual.time += constants.ticks;

    if (visual.direction !== this.direction) {
      visual.direction = this.direction;
      visual.time = 0;
      visual.index = 0;

      for (let i = 0; i < direction; ++i) {
        visual.index += visual.frames[i];
      }
    } else if (visual.delay < visual.time) {
      let index = 0;
      visual.index++;
      visual.time = 0;

      for (let i = 0; i < direction; ++i) {
        index += visual.frames[i];
      }

      if (visual.index === index + visual.frames[direction]) {
        visual.index = index;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {}

  hit(from: GameObject) {}

  getClosestTarget(targets: Array<GameObject>, maximum: number) {
    let closestTarget: GameObject;
    let dist = Number.MAX_VALUE;

    for (var i = targets.length; i--; ) {
      const target = targets[i];
      const t = this.distanceTo(target.mazeCoordinates);

      if (t < dist) {
        closestTarget = target;
        dist = t;
      }
    }

    if (dist <= maximum) {
      return closestTarget;
    }
  }

  playSound(soundName: string) {
    const audio = sounds[soundName];

    if (audio) {
      const sound = new Sound(audio);
      sound.play();
    }
  }

  createVisual(imageName: string, frames: Array<any>, scale = 1) {
    let length = 0;
    let index = 0;
    const image = images[imageName];

    for (let i = frames.length; i--; ) {
      length += frames[i];

      if (i < this.direction) {
        index += frames[i];
      }
    }

    if (frames.length === 1) {
      index = 0;
    }

    this.visual = {
      direction: this.direction,
      index,
      time: 0,
      length,
      frames: frames,
      image,
      delay: this.animationDelay,
      width: image.width / length,
      height: image.height,
      scale,
    };
  }
}
