import { Wave } from './Wave';

export class WaveList {
  constructor() {
    this.waves = [];
    this.index = 0;
    this.unitNames = Object.keys(types.units);
  }

  random() {
    var wave = new Wave(this.index);
    //The equation is a polynomfit (done with Sumerics) to yield the desired results
    var n = ~~(1.580451 - 0.16983 * this.index + 0.071592 * this.index * this.index);
    //This is the number of opponent unit types
    var upper = this.index * 0.3 + 1;
    var m = Math.min(this.unitNames.length, ~~upper);
    var maxtime = 1000 * this.index;
    wave.prizeMoney = n;

    for (var i = 0; i < n; ++i) {
      var j = Math.max(Math.min(m - 1, ~~randg(1.0, 0.5 * upper)), 0);
      var name = this.unitNames[j];
      var unit = new types.units[name]();
      wave.add(unit, i === 0 ? 0 : randd(maxtime));
    }

    return wave;
  }

  nextOpponents() {
    var upper = this.index * 0.3 + 1.3;
    var m = Math.min(this.unitNames.length, ~~upper);
    var units = [];

    for (var i = 0; i < this.unitNames.length && i < m; i++) {
      units.push(this.unitNames[i]);
    }

    return units;
  }

  next() {
    if (this.index < this.waves.length) {
      return this.waves[this.index++];
    }

    ++this.index;
    return this.random();
  }
}
