import * as units from '../units';
import { Wave } from './Wave';
import { randg, randd } from '../utils';

export class WaveList {
  public waves: Array<Wave> = [];
  public index = 0;
  public unitNames = Object.keys(units);

  random() {
    const wave = new Wave(this.index);

    //The equation is a polynomfit (done with Sumerics) to yield the desired results
    const n = ~~(1.580451 - 0.16983 * this.index + 0.071592 * this.index * this.index);

    //This is the number of opponent unit types
    const upper = this.index * 0.3 + 1;
    const m = Math.min(this.unitNames.length, ~~upper);
    const maxtime = 1000 * this.index;
    wave.prizeMoney = n;

    for (let i = 0; i < n; ++i) {
      const j = Math.max(Math.min(m - 1, ~~randg(1.0, 0.5 * upper)), 0);
      const name = this.unitNames[j];
      const unit = new units[name]();
      wave.add(unit, i === 0 ? 0 : randd(maxtime));
    }

    return wave;
  }

  nextOpponents() {
    const upper = this.index * 0.3 + 1.3;
    const m = Math.min(this.unitNames.length, ~~upper);
    return this.unitNames.filter((_, i) => i < m);
  }

  next() {
    if (this.index < this.waves.length) {
      return this.waves[this.index++];
    }

    ++this.index;
    return this.random();
  }
}
