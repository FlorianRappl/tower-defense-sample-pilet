import { Base } from './Base';

export class Wave extends Base {
	constructor(index) {
		super();
		this.index = index || 0;
		this.startTime = 0;
		this.units = [];
		this.prizeMoney = 0;
		this.finished = false;
		this.registerEvent(events.unitSpawned)
		this.registerEvent(events.waveFinished);
  }

	add(unit, time) {
		this.units.push({
			time: time,
			unit: unit
		});
  }

	update() {
		var unitsToSpawn = [];

		if (!this.finished) {
			for (var i = this.units.length; i--; ) {
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
				var remaining = this.units.length;
				this.triggerEvent(events.unitSpawned, remaining);
			}

			this.startTime += constants.ticks;
		}

		return unitsToSpawn;
	}
}
