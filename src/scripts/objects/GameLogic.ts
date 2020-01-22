import { Base } from './Base';
import { Size, Maze } from '../utils';
import { WaveList } from './WaveList';
import { Wave } from './Wave';

export class GameLogic extends Base {
  constructor(view, mazeWidth, mazeHeight) {
    super();
    const me = this;

    me.towers = [];
    me.units = [];
    me.shots = [];

    me.mediPackCost = constants.mediPackCost;
    me.mediPackFactor = constants.mediPackFactor;
    me.towerBuildCost = constants.towerBuildCost;
    me.towerBuildFactor = constants.towerBuildFactor;
    me.maxTowerNumber = constants.towerBuildNumber;
    me.mediPackHealth = constants.mediPackHealth;

    me.view = view;
    me.player = new Player();
    me.state = GameState.unstarted;
    me.maze = new Maze(new Size(mazeWidth || 20, mazeHeight || 11));
    me.view.mazeSize = me.getMazeSize();
    me.waves = new WaveList();
    me.currentWave = new Wave();

    me.player.addEventListener(events.playerDefeated, e => {
      me.triggerEvent(events.playerDefeated, e);
      me.finish();
    });

    me.player.addEventListener(events.moneyChanged, e => {
      me.triggerEvent(events.moneyChanged, e);
    });

    me.player.addEventListener(events.healthChanged, e => {
      me.triggerEvent(events.healthChanged, e);
    });

    me.registerEvent(events.refreshed);
    me.registerEvent(events.waveDefeated);
    me.registerEvent(events.waveFinished);
    me.registerEvent(events.playerDefeated);
    me.registerEvent(events.moneyChanged);
    me.registerEvent(events.healthChanged);
    me.registerEvent(events.waveCreated);
    me.registerEvent(events.unitSpawned);
    me.registerEvent(events.towerNumberChanged);
    me.registerEvent(events.towerBuildCostChanged);
    me.registerEvent(events.mediPackCostChanged);
  }

  start() {
    if (this.state === GameState.unstarted) {
      this.player.setHitpoints(constants.hitpoints);
      this.player.setMoney(constants.money);
      this.triggerEvent(events.towerNumberChanged, {
        current: this.getNumShooting(),
        maximum: this.maxTowerNumber,
      });
      this.state = GameState.building;
    }

    this.restart();
  }

  restart() {
    if (!this.gameLoop) {
      var me = this;
      this.view.start();
      this.gameLoop = setInterval(function() {
        me.tick();
      }, constants.ticks);
    }
  }

  pause() {
    if (this.gameLoop) {
      this.view.pause();
      clearInterval(this.gameLoop);
      this.gameLoop = undefined;
    }
  }

  saveState() {
    var towers = [];

    for (var i = 0; i < this.towers.length; i++) {
      var tower = this.towers[i];
      towers.push({
        point: { x: tower.mazeCoordinates.x, y: tower.mazeCoordinates.y },
        type: tower.typeName,
      });
    }

    return {
      mediPackCost: this.mediPackCost,
      mediPackFactor: this.mediPackFactor,
      towerBuildCost: this.towerBuildCost,
      towerBuildFactor: this.towerBuildFactor,
      towerBuildNumber: this.maxTowerNumber,
      hitpoints: this.player.hitpoints,
      money: this.player.money,
      points: this.player.points,
      playerName: this.player.name,
      towers: towers,
      wave: this.waves.index,
      state: this.state,
    };
  }

  loadState(state) {
    this.towers = [];

    for (var i = 0; i < state.towers.length; i++) {
      var type = types.towers[state.towers[i].type];
      var tower = new type();
      var point = state.towers[i].point;
      var pt = new Point(point.x, point.y);

      if (this.maze.tryBuild(pt, tower.mazeWeight)) {
        tower.mazeCoordinates = pt;
        tower.cost = type.cost;
        this.addTower(tower);
      }
    }

    this.mediPackFactor = state.mediPackFactor;
    this.towerBuildFactor = state.towerBuildFactor;
    this.player.points = state.points;
    this.player.name = state.playerName;
    this.setMediPackCost(state.mediPackCost);
    this.setTowerBuildCost(state.towerBuildCost);
    this.setMaxTowerNumber(state.towerBuildNumber);
    this.player.setHitpoints(state.hitpoints);
    this.player.setMoney(state.money);
    this.waves.index = state.wave;
    this.state = state.state;
  }

  update(objects) {
    for (var i = objects.length; i--; ) objects[i].update();
  }

  tick() {
    if (this.state !== GameState.building && this.state !== GameState.waving) {
      return;
    }

    this.update(this.towers);

    if (this.state === GameState.waving) {
      this.update(this.shots);
      this.update(this.units);
      this.removeDeadObjects();
      var newUnits = this.currentWave.update();

      for (var i = newUnits.length; i--; ) {
        var unit = newUnits[i];
        var path = this.maze.getPath(unit.strategy);
        unit.mazeCoordinates = this.maze.start;
        unit.path = new Path(path);
        this.addUnit(unit);
      }
    }
  }

  finish() {
    this.state = GameState.finished;
  }

  getViewSize() {
    return this.view.getSize();
  }

  getNumShooting() {
    return this.towers.filter(tower => tower instanceof Rock === false).length;
  }

  getMazeSize() {
    return this.maze.gridDim;
  }

  transformCoordinates(screenX, screenY) {
    var x = (screenX * this.maze.gridDim.width) / this.view.width;
    var y = (screenY * this.maze.gridDim.height) / this.view.height;
    return new Point(~~x, ~~y);
  }

  removeTower(tower) {
    tower.removeEventListener(events.shot);
    this.towers.splice(this.towers.indexOf(tower), 1);
    this.view.remove(tower);
  }

  addTower(tower) {
    var me = this;
    tower.targets = me.units;
    tower.addEventListener(events.shot, shot => me.addShot(shot));
    me.towers.push(tower);
    me.view.add(tower);
  }

  addShot(shot) {
    this.shots.push(shot);
    this.view.add(shot);
  }

  addUnit(unit) {
    var me = this;
    unit.addEventListener(events.accomplished, unt => me.player.hit(unt));
    unit.playInitSound();
    me.units.push(unit);
    me.view.add(unit);
  }

  removeDead(objects) {
    for (let i = objects.length; i--; ) {
      if (objects[i].dead) {
        this.view.remove(objects[i]);
        objects.splice(i, 1);
      }
    }
  }

  removeDeadObjects() {
    this.removeDead(this.towers);
    this.removeDead(this.shots);
    this.removeDead(this.units);

    if (this.currentWave.finished && this.units.length === 0) {
      this.endWave();
    }
  }

  endWave() {
    this.player.addMoney(this.currentWave.prizeMoney);
    this.state = GameState.building;

    for (var i = this.shots.length; i--; ) {
      this.view.remove(this.shots[i]);
      this.shots.splice(i, 1);
    }

    this.triggerEvent(events.waveDefeated, this.currentWave);
  }

  beginWave() {
    if (this.state === GameState.building) {
      var me = this;
      me.state = GameState.waving;
      var wave = me.waves.next();
      wave.addEventListener(events.waveFinished, () => {
        me.triggerEvent(events.waveFinished);
        wave.removeEventListener(events.waveFinished);
        wave.removeEventListener(events.unitSpawned);
      });
      wave.addEventListener(events.unitSpawned, e => {
        me.triggerEvent(events.unitSpawned, e);
      });
      me.triggerEvent(events.waveCreated, wave);
      me.currentWave = wave;
    }
  }

  buildTower(pt, type) {
    var newTower = new type();
    var isrock = newTower instanceof Rock;
    var numShooting = this.getNumShooting();

    if (
      this.state === GameState.building &&
      type.cost <= this.player.money &&
      (isrock || numShooting < this.maxTowerNumber)
    ) {
      newTower.mazeCoordinates = pt;
      newTower.cost = type.cost;

      if (this.maze.tryBuild(pt, newTower.mazeWeight)) {
        this.player.addMoney(-type.cost);
        this.addTower(newTower);

        if (!isrock) {
          this.triggerEvent(events.towerNumberChanged, {
            current: numShooting + 1,
            maximum: this.maxTowerNumber,
          });
        }

        return true;
      }
    }

    return false;
  }

  destroyTower(pt) {
    if (this.state == GameState.building) {
      var towerToRemove = this.towers.filter(function(t) {
        return t.mazeCoordinates.x === pt.x && t.mazeCoordinates.y === pt.y;
      })[0];

      if (towerToRemove) {
        this.player.addMoney(0.5 * towerToRemove.cost);
        this.removeTower(towerToRemove);
        this.maze.tryRemove(pt);

        if (!(towerToRemove instanceof Rock)) {
          this.triggerEvent(events.towerNumberChanged, {
            current: this.getNumShooting(),
            maximum: this.maxTowerNumber,
          });
        }
      }
    }
  }

  buyMediPack() {
    var cost = this.mediPackCost;

    if (this.player.money >= cost) {
      this.player.addHitpoints(this.mediPackHealth);
      this.setMediPackCost(~~(this.mediPackFactor * cost));
      this.player.addMoney(-cost);
      return true;
    }

    return false;
  }

  buyTowerBuildRight() {
    var cost = this.towerBuildCost;

    if (this.player.money >= cost) {
      this.setMaxTowerNumber(this.maxTowerNumber + 1);
      this.setTowerBuildCost(~~(this.towerBuildFactor * cost));
      this.player.addMoney(-cost);
      return true;
    }

    return false;
  }

  setMediPackCost(cost) {
    this.mediPackCost = cost;
    this.triggerEvent(events.mediPackCostChanged, cost);
  }

  setTowerBuildCost(cost) {
    this.towerBuildCost = cost;
    this.triggerEvent(events.towerBuildCostChanged, cost);
  }

  setMaxTowerNumber(number) {
    var numShooting = this.getNumShooting();
    this.maxTowerNumber = number;

    this.triggerEvent(events.towerNumberChanged, {
      current: numShooting,
      maximum: number,
    });
  }
}
