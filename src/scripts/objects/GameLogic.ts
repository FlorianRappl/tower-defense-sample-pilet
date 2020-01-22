import * as towers from '../towers';
import { Base } from './Base';
import { Wave } from './Wave';
import { WaveList } from './WaveList';
import { GameObject } from './GameObject';
import { Player } from './Player';
import { Tower } from './Tower';
import { Shot } from './Shot';
import { Unit } from './Unit';
import { Size, Maze, Point, Path } from '../utils';
import { constants, events } from '../manifest';
import { GameState, IView } from '../types';

export class GameLogic extends Base {
  private gameLoop: any;

  public mediPackCost = constants.mediPackCost;
  public mediPackFactor = constants.mediPackFactor;
  public towerBuildCost = constants.towerBuildCost;
  public towerBuildFactor = constants.towerBuildFactor;
  public maxTowerNumber = constants.towerBuildNumber;
  public mediPackHealth = constants.mediPackHealth;
  public waves = new WaveList();
  public currentWave = new Wave();
  public player = new Player();
  public state = GameState.unstarted;
  public maze: Maze;
  public towers: Array<Tower> = [];
  public units: Array<Unit> = [];
  public shots: Array<Shot> = [];
  private view: IView;

  constructor(view: IView, mazeWidth = 20, mazeHeight = 11) {
    super();
    this.maze = new Maze(new Size(mazeWidth, mazeHeight));
    view.mazeSize = this.getMazeSize();
    this.view = view;

    this.player.addEventListener(events.playerDefeated, e => {
      this.triggerEvent(events.playerDefeated, e);
      this.finish();
    });

    this.player.addEventListener(events.moneyChanged, e => {
      this.triggerEvent(events.moneyChanged, e);
    });

    this.player.addEventListener(events.healthChanged, e => {
      this.triggerEvent(events.healthChanged, e);
    });

    this.registerEvent(events.refreshed);
    this.registerEvent(events.waveDefeated);
    this.registerEvent(events.waveFinished);
    this.registerEvent(events.playerDefeated);
    this.registerEvent(events.moneyChanged);
    this.registerEvent(events.healthChanged);
    this.registerEvent(events.waveCreated);
    this.registerEvent(events.unitSpawned);
    this.registerEvent(events.towerNumberChanged);
    this.registerEvent(events.towerBuildCostChanged);
    this.registerEvent(events.mediPackCostChanged);
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
      this.view.start();
      this.gameLoop = setInterval(() => this.tick(), constants.ticks);
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
    const towers = this.towers.map(tower => ({
      point: { x: tower.mazeCoordinates.x, y: tower.mazeCoordinates.y },
      type: tower.typeName,
    }));

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

  loadState(state: any) {
    this.towers = [];

    for (let i = 0; i < state.towers.length; i++) {
      const type = towers[state.towers[i].type];
      const tower = new type();
      const point = state.towers[i].point;
      const pt = new Point(point.x, point.y);

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

  update(objects: Array<GameObject>) {
    for (var i = objects.length; i--; ) {
      objects[i].update();
    }
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
      const newUnits = this.currentWave.update();

      for (var i = newUnits.length; i--; ) {
        const unit = newUnits[i];
        const path = this.maze.getPath(unit.mazeStrategy);
        unit.mazeCoordinates = this.maze.start;
        unit.path = new Path(path);
        this.addUnit(unit);
      }
    }
  }

  finish() {
    this.state = GameState.finished;
  }

  getNumShooting() {
    return this.towers.filter(tower => tower.typeName !== 'Rock').length;
  }

  getMazeSize() {
    return this.maze.size;
  }

  transformCoordinates(screenX: number, screenY: number) {
    var x = (screenX * this.maze.size.width) / this.view.width;
    var y = (screenY * this.maze.size.height) / this.view.height;
    return new Point(~~x, ~~y);
  }

  removeTower(tower: Tower) {
    tower.removeEventListener(events.shot);
    this.towers.splice(this.towers.indexOf(tower), 1);
    this.view.remove(tower);
  }

  addTower(tower: Tower) {
    tower.targets = this.units;
    tower.addEventListener(events.shot, shot => this.addShot(shot));
    this.towers.push(tower);
    this.view.add(tower);
  }

  addShot(shot: Shot) {
    this.shots.push(shot);
    this.view.add(shot);
  }

  addUnit(unit: Unit) {
    unit.addEventListener(events.accomplished, unt => this.player.hit(unt));
    unit.playInitSound();
    this.units.push(unit);
    this.view.add(unit);
  }

  removeDead(objects: Array<GameObject>) {
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

    for (let i = this.shots.length; i--; ) {
      this.view.remove(this.shots[i]);
      this.shots.splice(i, 1);
    }

    this.triggerEvent(events.waveDefeated, this.currentWave);
  }

  beginWave() {
    if (this.state === GameState.building) {
      this.state = GameState.waving;
      const wave = this.waves.next();
      wave.addEventListener(events.waveFinished, () => {
        this.triggerEvent(events.waveFinished);
        wave.removeEventListener(events.waveFinished);
        wave.removeEventListener(events.unitSpawned);
      });
      wave.addEventListener(events.unitSpawned, e => {
        this.triggerEvent(events.unitSpawned, e);
      });
      this.triggerEvent(events.waveCreated, wave);
      this.currentWave = wave;
    }
  }

  buildTower(pt: Point, type: any) {
    const newTower = new type();
    const isrock = newTower.typeName === 'Rock';
    const numShooting = this.getNumShooting();

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

  destroyTower(pt: Point) {
    if (this.state == GameState.building) {
      const [towerToRemove] = this.towers.filter(t => t.mazeCoordinates.x === pt.x && t.mazeCoordinates.y === pt.y);

      if (towerToRemove) {
        const cost = towers[towerToRemove.typeName].cost;
        this.player.addMoney(0.5 * cost);
        this.removeTower(towerToRemove);
        this.maze.tryRemove(pt);

        if (towerToRemove.typeName !== 'Rock') {
          this.triggerEvent(events.towerNumberChanged, {
            current: this.getNumShooting(),
            maximum: this.maxTowerNumber,
          });
        }
      }
    }
  }

  buyMediPack() {
    const cost = this.mediPackCost;

    if (this.player.money >= cost) {
      this.player.addHitpoints(this.mediPackHealth);
      this.setMediPackCost(~~(this.mediPackFactor * cost));
      this.player.addMoney(-cost);
      return true;
    }

    return false;
  }

  buyTowerBuildRight() {
    const cost = this.towerBuildCost;

    if (this.player.money >= cost) {
      this.setMaxTowerNumber(this.maxTowerNumber + 1);
      this.setTowerBuildCost(~~(this.towerBuildFactor * cost));
      this.player.addMoney(-cost);
      return true;
    }

    return false;
  }

  setMediPackCost(cost: number) {
    this.mediPackCost = cost;
    this.triggerEvent(events.mediPackCostChanged, cost);
  }

  setTowerBuildCost(cost: number) {
    this.towerBuildCost = cost;
    this.triggerEvent(events.towerBuildCostChanged, cost);
  }

  setMaxTowerNumber(value: number) {
    const numShooting = this.getNumShooting();
    this.maxTowerNumber = value;

    this.triggerEvent(events.towerNumberChanged, {
      current: numShooting,
      maximum: value,
    });
  }
}
