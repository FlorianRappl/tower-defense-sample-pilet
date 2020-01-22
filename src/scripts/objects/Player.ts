import { Base } from './Base';
import { Unit } from './Unit';
import { events } from '../manifest';

export class Player extends Base {
  public money = 0;
  public points = 0;
  public hitpoints = 0;

  constructor(public name = 'Player') {
    super();
    this.registerEvent(events.playerDefeated);
    this.registerEvent(events.moneyChanged);
    this.registerEvent(events.healthChanged);
  }

  setMoney(value: number) {
    this.money = value;
    this.triggerEvent(events.moneyChanged, this);
  }

  addMoney(value: number) {
    this.points += Math.max(0, value);
    this.setMoney(this.money + value);
  }

  getMoney() {
    return this.money;
  }

  setHitpoints(value: number) {
    this.hitpoints = Math.max(0, value);
    this.triggerEvent(events.healthChanged, this);

    if (this.hitpoints === 0) {
      this.triggerEvent(events.playerDefeated, this);
    }
  }

  addHitpoints(value: number) {
    this.setHitpoints(this.hitpoints + value);
  }

  getHitpoints() {
    return this.hitpoints;
  }

  hit(unit: Unit) {
    this.setHitpoints(this.hitpoints - unit.damage);
  }
}
