import { Base } from './Base';
import { Point } from '../utils';

export class GameObject extends Base {
  constructor(speed, animationDelay) {
    super();
    this.z = 0;
    this.mazeCoordinates = new Point();
    this.speed = speed || 0;
    this.animationDelay = animationDelay || 15;
    this.dead = false;
    this.direction = Direction.right;
  }

  distanceTo(point) {
    return point.subtract(this.mazeCoordinates).norm();
  }

  update() {
    var visual = this.visual;
    var direction = visual.frames.length === 4 ? this.direction : 0;
    visual.time += constants.ticks;

    if (visual.direction !== this.direction) {
      visual.direction = this.direction;
      visual.time = 0;
      visual.index = 0;

      for (var i = 0; i < direction; ++i) visual.index += visual.frames[i];
    } else if (visual.delay < visual.time) {
      var frames = 0;
      var index = 0;
      visual.index++;
      visual.time = 0;

      for (var i = 0; i < direction; ++i) index += visual.frames[i];

      if (visual.index === index + visual.frames[direction]) visual.index = index;
    }
  }

  draw(ctx, x, y, width, height) {}

  getClosestTarget(targets, maximum) {
    var closestTarget;
    var dist = Number.MAX_VALUE;

    for (var i = targets.length; i--; ) {
      var target = targets[i];
      var t = this.distanceTo(target.mazeCoordinates);

      if (t < dist) {
        closestTarget = target;
        dist = t;
      }
    }

    if (dist <= maximum) return closestTarget;
  }

  playSound(soundName) {
    var audio = sounds[soundName];

    if (audio) {
      var sound = new Sound(audio);
      sound.play();
    }
  }

  createVisual(imageName, frames, scale) {
    var total = 0;
    var index = 0;
    var image = images[imageName];

    for (var i = frames.length; i--; ) {
      total += frames[i];

      if (i < this.direction) index += frames[i];
    }

    if (frames.length === 1) index = 0;

    this.visual = {
      direction: this.direction,
      index: index,
      time: 0,
      length: total,
      frames: frames,
      image: image,
      delay: this.animationDelay,
      width: image.width / total,
      height: image.height,
      scale: scale || 1,
    };
  }
}
