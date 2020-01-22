import { Base } from './Base';

export class Player extends Base {
  constructor(name) {
    super();
    this.name = name || 'Player';
    this.money = 0;
    this.points = 0;
    this.hitpoints = 0;
    this.registerEvent(events.playerDefeated);
    this.registerEvent(events.moneyChanged);
    this.registerEvent(events.healthChanged);
  }

  setMoney(value) {
    this.money = value;
    this.triggerEvent(events.moneyChanged, this);
  }

  addMoney(value) {
    this.points += Math.max(0, value);
    this.setMoney(this.money + value);
  }

  getMoney() {
    return this.money;
  }

  setHitpoints(value) {
    this.hitpoints = Math.max(0, value);
    this.triggerEvent(events.healthChanged, this);

    if (this.hitpoints === 0) {
      this.triggerEvent(events.playerDefeated, this);
    }
  }

  addHitpoints(value) {
    this.setHitpoints(this.hitpoints + value);
  }

  getHitpoints() {
    return this.hitpoints;
  }

  hit(unit) {
    this.setHitpoints(this.hitpoints - unit.damage);
  }
}
