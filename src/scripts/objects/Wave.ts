import { Base } from './Base';
import { Unit } from './Unit';
import { events, constants } from '../manifest';

export interface UnitDef {
  time: number;
  unit: Unit;
}

export class Wave extends Base {
  public startTime = 0;
  public units: Array<UnitDef> = [];
  public prizeMoney = 0;
  public finished = false;

  constructor(public index = 0) {
    super();
    this.registerEvent(events.unitSpawned);
    this.registerEvent(events.waveFinished);
  }

  add(unit: Unit, time: number) {
    this.units.push({
      time,
      unit,
    });
  }

  update() {
    const unitsToSpawn: Array<Unit> = [];

    if (!this.finished) {
      for (let i = this.units.length; i--; ) {
        if (this.units[i].time < this.startTime) {
          unitsToSpawn.push(this.units[i].unit);
          this.units.splice(i, 1);
        }
      }

      if (this.units.length === 0) {
        this.finished = true;
        this.triggerEvent(events.waveFinished);
      }

      if (unitsToSpawn.length > 0) {
        const remaining = this.units.length;
        this.triggerEvent(events.unitSpawned, remaining);
      }

      this.startTime += constants.ticks;
    }

    return unitsToSpawn;
  }
}
