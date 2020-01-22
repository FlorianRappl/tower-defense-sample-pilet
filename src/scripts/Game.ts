import * as units from './units';
import * as towers from './towers';
import { Sound } from './Sound';
import { CanvasView } from './View';
import { GameLogic, Wave } from './objects';
import { events, resources, images, sounds } from './manifest';
import { Loader, ImageLoader, SoundLoader } from './resources';
import { ProgressEventData, GameState } from './types';

export class Game {
  private logic: GameLogic;
  private loader: Loader;
  private canvas: HTMLCanvasElement;
  private view: CanvasView;
  private nextwave: HTMLElement;
  private towerPanel: HTMLElement;
  private moneyInfo: HTMLElement;
  private healthInfo: HTMLElement;
  private towerInfo: HTMLElement;
  private timeInfo: HTMLElement;
  private frame: HTMLElement;
  private wait: HTMLElement;
  private waitMessage: HTMLElement;
  private soundInfo: HTMLElement;
  private startWaveButton: HTMLButtonElement;
  private buyMedipackButton: HTMLButtonElement;
  private buyTowerbuildButton: HTMLButtonElement;
  private towerButtons = [];
  private towerType: any;
  private fresh = true;
  private music: Sound;

  constructor(host: HTMLElement) {
    const loader = new Loader(this.completed, this.progress);
    loader.set('Images', new ImageLoader(images), resources.images);
    loader.set('Sounds', new SoundLoader(sounds), resources.sounds);
    this.loader = loader;
    this.setElements(host);
    this.view = new CanvasView(this.canvas);
    this.logic = new GameLogic(this.view, 30, 15);
  }

  private setElements(host: HTMLElement) {
    this.canvas = host.querySelector<HTMLCanvasElement>('#game');
    this.nextwave = host.querySelector<HTMLElement>('#nextwave');
    this.towerPanel = host.querySelector<HTMLElement>('#towers');
    this.moneyInfo = host.querySelector<HTMLElement>('#money-info');
    this.healthInfo = host.querySelector<HTMLElement>('#health-info');
    this.towerInfo = host.querySelector<HTMLElement>('#tower-info');
    this.timeInfo = host.querySelector<HTMLElement>('#time-info');
    this.soundInfo = host.querySelector<HTMLElement>('#sound-info');
    this.startWaveButton = host.querySelector<HTMLButtonElement>('#startWave');
    this.buyMedipackButton = host.querySelector<HTMLButtonElement>('#buyMedipack');
    this.buyTowerbuildButton = host.querySelector<HTMLButtonElement>('#buyTowerbuild');
    this.frame = host.querySelector<HTMLElement>('#frame');
    this.wait = host.querySelector('#wait');
    this.waitMessage = host.querySelector('#wait-message');
  }

  continue() {
    this.loader.start();
  }

  pause() {
    this.removeHandlers();
    this.logic.pause();

    if (this.music) {
      this.music.pause();
    }
  }

  connect(host: HTMLElement) {
    this.setElements(host);
    this.view.reconnect(this.canvas);
  }

  private getMousePosition = (evt: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  private updateNextWave = () => {
    const names = this.logic.waves.nextOpponents();

    this.nextwave.innerHTML = '';

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const unit = units[name];
      const img = images[unit.sprite];
      const div = document.createElement('div');
      const icon = document.createElement('canvas');
      const width = img.width / unit.frames;
      icon.width = 32;
      icon.height = 32;
      const targetHeight = img.height > 32 ? 32 : img.height;
      const targetWidth = (width * targetHeight) / img.height;
      const ctx = icon.getContext('2d');
      ctx.drawImage(
        img,
        0,
        0,
        width,
        img.height,
        16 - targetWidth * 0.5,
        16 - targetHeight * 0.5,
        targetWidth,
        targetHeight,
      );
      div.appendChild(icon);
      const info = document.createElement('div');
      info.innerHTML = `<div class=title>${unit.nickName}</div><div class=description>${
        unit.description
      }</div><div class=rating>${~~unit.rating}</div><div class=speed>${unit.speed}</div><div class=damage>${
        unit.hitpoints
      }</div><div style="clear:both"></div>`;
      info.classList.add('info');
      div.appendChild(info);
      this.nextwave.appendChild(div);
    }
  };

  private addHandlers = () => {
    const { logic, startWaveButton, buyMedipackButton, buyTowerbuildButton, canvas, soundInfo } = this;

    logic.addEventListener(events.waveFinished, this.onWaveFinished);
    logic.addEventListener(events.waveDefeated, this.onWaveDefeated);
    logic.addEventListener(events.playerDefeated, this.onPlayerDefeated);
    logic.addEventListener(events.waveCreated, this.onWaveCreated);
    logic.addEventListener(events.unitSpawned, this.onUnitSpawned);
    logic.addEventListener(events.moneyChanged, this.onMoneyChanged);
    logic.addEventListener(events.healthChanged, this.onHealthChanged);
    logic.addEventListener(events.towerBuildCostChanged, this.onTowerBuildCostChanged);
    logic.addEventListener(events.mediPackCostChanged, this.onMediPackCostChanged);
    logic.addEventListener(events.towerNumberChanged, this.onTowerNumberChanged);
    startWaveButton.addEventListener(events.click, this.onStartWave);
    buyMedipackButton.addEventListener(events.click, this.onBuyMedipack);
    buyTowerbuildButton.addEventListener(events.click, this.onBuyTower);
    soundInfo.addEventListener(events.click, this.onSoundSwitch);
    canvas.addEventListener(events.click, this.onCanvasLeftClick);
    canvas.addEventListener(events.contextmenu, this.onCanvasRightClick);
    canvas.addEventListener(events.mouseover, this.onCanvasMouseOver);
    canvas.addEventListener(events.mouseout, this.onCanvasMouseOut);
  };

  private removeHandlers = () => {
    const { logic, startWaveButton, buyMedipackButton, buyTowerbuildButton, canvas, soundInfo } = this;

    logic.removeEventListener(events.waveFinished, this.onWaveFinished);
    logic.removeEventListener(events.waveDefeated, this.onWaveDefeated);
    logic.removeEventListener(events.playerDefeated, this.onPlayerDefeated);
    logic.removeEventListener(events.waveCreated, this.onWaveCreated);
    logic.removeEventListener(events.unitSpawned, this.onUnitSpawned);
    logic.removeEventListener(events.moneyChanged, this.onMoneyChanged);
    logic.removeEventListener(events.healthChanged, this.onHealthChanged);
    logic.removeEventListener(events.towerBuildCostChanged, this.onTowerBuildCostChanged);
    logic.removeEventListener(events.mediPackCostChanged, this.onMediPackCostChanged);
    logic.removeEventListener(events.towerNumberChanged, this.onTowerNumberChanged);
    startWaveButton.removeEventListener(events.click, this.onStartWave);
    buyMedipackButton.removeEventListener(events.click, this.onBuyMedipack);
    buyTowerbuildButton.removeEventListener(events.click, this.onBuyTower);
    soundInfo.removeEventListener(events.click, this.onSoundSwitch);
    canvas.removeEventListener(events.click, this.onCanvasLeftClick);
    canvas.removeEventListener(events.contextmenu, this.onCanvasRightClick);
    canvas.removeEventListener(events.mouseover, this.onCanvasMouseOver);
    canvas.removeEventListener(events.mouseout, this.onCanvasMouseOut);
  };

  private onWaveFinished = () => {
    this.timeInfo.textContent = 'All units are out!';
  };

  private onWaveDefeated = () => {
    this.timeInfo.textContent = 'Game saved';
    this.startWaveButton.disabled = false;
    localStorage.towerDefense = JSON.stringify(this.logic.saveState());
    this.updateNextWave();
  };

  private onWaveCreated = () => {
    const { currentWave } = this.logic;
    this.timeInfo.textContent = `${currentWave.units.length} units remaining`;
    this.startWaveButton.querySelector('span').textContent = `${currentWave.index + 1}`;
    this.startWaveButton.disabled = true;
    delete localStorage.towerDefense;
  };

  private onUnitSpawned = (remaining: number) => {
    this.timeInfo.textContent = `${remaining} units remaining`;
  };

  private onPlayerDefeated = () => {
    this.timeInfo.textContent = 'Game over ...';
    alert('You lost! Press refresh for a restart.');
  };

  private onMoneyChanged = () => {
    const { player } = this.logic;
    this.moneyInfo.textContent = `${player.money}`;
    this.buyMedipackButton.disabled = player.money < this.logic.mediPackCost;
    this.buyTowerbuildButton.disabled = player.money < this.logic.towerBuildCost;

    for (let i = 0; i < this.towerButtons.length; ++i) {
      this.towerButtons[i].element.disabled = this.towerButtons[i].tower.cost > player.money;
    }
  };

  private onHealthChanged = () => {
    const { player } = this.logic;
    this.healthInfo.textContent = `${player.hitpoints}`;
  };

  private onTowerBuildCostChanged = () => {
    this.buyTowerbuildButton.querySelector('span').textContent = `${this.logic.towerBuildCost}`;
  };

  private onMediPackCostChanged = () => {
    this.buyMedipackButton.querySelector('span').textContent = `${this.logic.mediPackCost}`;
  };

  private onTowerNumberChanged = () => {
    const current = this.logic.getNumShooting();
    const maximum = this.logic.maxTowerNumber;
    this.towerInfo.textContent = `${current} / ${maximum}`;
  };

  private onStartWave = () => {
    this.logic.beginWave();
  };

  private onBuyMedipack = () => {
    this.logic.buyMediPack();
  };

  private onBuyTower = () => {
    this.logic.buyTowerBuildRight();
  };

  private onSoundSwitch = () => {
    const on = 'on';
    const off = 'off';
    const status = this.soundInfo.classList.contains('on');
    this.soundInfo.classList.remove(status ? on : off);
    this.soundInfo.classList.add(status ? off : on);

    if (status) {
      Sound.disable();
    } else {
      Sound.enable();
    }
  };

  private onCanvasLeftClick = (evt: MouseEvent) => {
    const mousePos = this.getMousePosition(evt);
    const pos = this.logic.transformCoordinates(mousePos.x, mousePos.y);
    evt.preventDefault();

    if (this.towerType) {
      this.logic.buildTower(pos, this.towerType);
    } else {
      this.logic.destroyTower(pos);
    }
  };

  private onCanvasRightClick = (evt: MouseEvent) => {
    const mousePos = this.getMousePosition(evt);
    const pos = this.logic.transformCoordinates(mousePos.x, mousePos.y);
    evt.preventDefault();
    this.logic.destroyTower(pos);
  };

  private onCanvasMouseOver = () => {
    this.view.showGrid = true;
  };

  private onCanvasMouseOut = () => {
    this.view.showGrid = false;
  };

  private addTower = (tower: any) => {
    const { towerButtons, towerPanel } = this;
    const img = images[tower.sprite];
    const div = document.createElement('button');

    div.innerHTML = `<div class=preview><div style="background: url(${img.src}) no-repeat; width: ${~~(
      img.naturalWidth / tower.frames
    )}px; height: ${img.naturalHeight}px" class="preview-image"></div></div><div class=title>${
      tower.nickName
    }</div><div class=info><div class=description>${
      tower.description
    }</div><div class=rating>${~~tower.rating}</div><div class=speed>${tower.speed}</div><div class=damage>${
      tower.shotType.damage
    }</div><div class=range>${tower.range}</div><div class=cost>${tower.cost}</div></div>`;

    towerButtons.push({
      tower: tower,
      element: div,
    });

    div.addEventListener(events.click, () => {
      this.towerType = tower;

      for (let i = towerButtons.length; i--; ) {
        towerButtons[i].element.classList.remove('selected-tower');
      }

      div.classList.add('selected-tower');
    });

    towerPanel.appendChild(div);
  };

  private startMusic = () => {
    const music = sounds['burn_them_down'];

    if (music) {
      const sound = new Sound(music, true);
      sound.setVolume(0.3);
      sound.play();
      this.music = sound;
    } else {
      this.soundInfo.classList.add('hidden');
    }
  };

  private setupElements() {
    const { frame, wait, towerButtons } = this;
    towerButtons.splice(0, towerButtons.length);

    for (const key in towers) {
      this.addTower(towers[key]);
    }

    this.onMediPackCostChanged();
    this.onTowerBuildCostChanged();
    this.onTowerNumberChanged();
    this.onHealthChanged();
    this.onMoneyChanged();
    this.addHandlers();

    if (this.logic.state === GameState.waving) {
      this.onWaveCreated();
    }

    frame.classList.remove('hidden');
    wait.classList.add('hidden');
  }

  private completed = () => {
    if (this.fresh) {
      const { view, logic, startWaveButton } = this;
      view.background = images.background;
      view.showGrid = false;
      this.setupElements();
      this.startMusic();
      logic.start();

      if (localStorage.towerDefense !== undefined) {
        const result = confirm('Previous game found. Load previous game?');

        if (result) {
          const state = JSON.parse(localStorage.towerDefense);
          logic.loadState(state);
          startWaveButton.querySelector('span').textContent = `${logic.waves.index + 1}`;
        }
      }

      this.fresh = false;
    } else {
      this.setupElements();
      this.startMusic();
      this.logic.start();
    }

    this.updateNextWave();
  };

  private progress = (e: ProgressEventData) => {
    const text = `Loading (${e.name}, ${~~(e.progress * 100)}% of ${e.total})`;
    this.waitMessage.textContent = text;
  };
}
