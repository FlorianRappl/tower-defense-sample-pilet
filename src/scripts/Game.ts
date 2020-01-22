import { events } from './manifest';
import { Sound } from './Sound';
import { CanvasView } from './View';
import { GameLogic } from './objects';

export const enum GameState {
  unstarted = 0,
  building = 1,
  waving = 2,
  finished = 3,
}

export class Game {
  private types = {
    units: {},
    towers: {},
    shots: {},
  };
  private images = {};
  private sounds = {};

  connect() {
    const { types, images, sounds } = this;
    const towerButtons = [];
    const canvas = document.querySelector<HTMLCanvasElement>('#game');
    const nextwave = document.querySelector<HTMLElement>('#nextwave');
    const towerPanel = document.querySelector<HTMLElement>('#towers');
    const moneyInfo = document.querySelector<HTMLElement>('#money-info');
    const healthInfo = document.querySelector<HTMLElement>('#health-info');
    const towerInfo = document.querySelector<HTMLElement>('#tower-info');
    const timeInfo = document.querySelector<HTMLElement>('#time-info');
    const soundInfo = document.querySelector<HTMLElement>('#sound-info');
    const startWaveButton = document.querySelector<HTMLButtonElement>('#startWave');
    const buyMedipackButton = document.querySelector<HTMLButtonElement>('#buyMedipack');
    const buyTowerbuildButton = document.querySelector<HTMLButtonElement>('#buyTowerbuild');
    let towerType = undefined;

    const getMousePosition = evt => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    };
    const updateNextWave = () => {
      nextwave.innerHTML = '';
      const names = logic.waves.nextOpponents();

      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const unit = types.units[name];
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
        info.innerHTML = [
          '<div class=title>',
          unit.nickName,
          '</div>',
          '<div class=description>',
          unit.description,
          '</div>',
          '<div class=rating>',
          ~~unit.rating,
          '</div>',
          '<div class=speed>',
          unit.speed,
          '</div>',
          '<div class=damage>',
          unit.hitpoints,
          '</div><div style="clear:both"></div>',
        ].join('');
        info.classList.add('info');
        div.appendChild(info);
        nextwave.appendChild(div);
      }
    };
    const addHandlers = () => {
      logic.addEventListener(events.waveFinished, () => {
        timeInfo.textContent = 'All units are out!';
      });
      logic.addEventListener(events.waveDefeated, () => {
        timeInfo.textContent = 'Game saved';
        startWaveButton.disabled = false;
        localStorage.towerDefense = JSON.stringify(logic.saveState());
        updateNextWave();
      });
      logic.addEventListener(events.playerDefeated, () => {
        timeInfo.textContent = 'Game over ...';
        alert('You lost! Press refresh for a restart.');
      });
      logic.addEventListener(events.waveCreated, wave => {
        timeInfo.textContent = wave.units.length + ' units remaining';
        startWaveButton.querySelector('span').textContent = wave.index + 1;
        startWaveButton.disabled = true;
        delete localStorage.towerDefense;
      });
      logic.addEventListener(events.unitSpawned, remaining => {
        timeInfo.textContent = remaining + ' units remaining';
      });
      logic.addEventListener(events.moneyChanged, player => {
        moneyInfo.textContent = player.money;
        buyMedipackButton.disabled = player.money < logic.mediPackCost;
        buyTowerbuildButton.disabled = player.money < logic.towerBuildCost;

        for (let i = 0; i < towerButtons.length; ++i)
          towerButtons[i].element.disabled = towerButtons[i].tower.cost > player.money;
      });
      logic.addEventListener(events.healthChanged, player => {
        healthInfo.textContent = player.hitpoints;
      });
      logic.addEventListener(events.towerBuildCostChanged, cost => {
        buyTowerbuildButton.querySelector('span').textContent = cost;
      });
      logic.addEventListener(events.mediPackCostChanged, cost => {
        buyMedipackButton.querySelector('span').textContent = cost;
      });
      logic.addEventListener(events.towerNumberChanged, info => {
        towerInfo.textContent = info.current + ' / ' + info.maximum;
      });
      startWaveButton.addEventListener(events.click, () => {
        logic.beginWave();
      });
      buyMedipackButton.addEventListener(events.click, () => {
        logic.buyMediPack();
      });
      buyTowerbuildButton.addEventListener(events.click, () => {
        logic.buyTowerBuildRight();
      });
      soundInfo.addEventListener(events.click, () => {
        const on = 'on';
        const off = 'off';
        const status = soundInfo.classList.contains('on');
        soundInfo.classList.remove(status ? on : off);
        soundInfo.classList.add(status ? off : on);
        Sound.setVolume(status ? 0 : 1);
      });
      canvas.addEventListener(events.click, evt => {
        const mousePos = getMousePosition(evt);
        const pos = logic.transformCoordinates(mousePos.x, mousePos.y);
        evt.preventDefault();

        if (towerType) {
          logic.buildTower(pos, towerType);
        } else {
          logic.destroyTower(pos);
        }
      });
      canvas.addEventListener(events.contextmenu, evt => {
        const mousePos = getMousePosition(evt);
        const pos = logic.transformCoordinates(mousePos.x, mousePos.y);
        evt.preventDefault();
        logic.destroyTower(pos);
      });
      canvas.addEventListener(events.mouseover, evt => {
        view.showGrid = true;
      });
      canvas.addEventListener(events.mouseout, evt => {
        view.showGrid = false;
      });
    };
    const addTower = tower => {
      const img = images[tower.sprite];
      const div = document.createElement('button');
      div.innerHTML = [
        '<div class=preview><div style="background: url(',
        img.src,
        ') no-repeat; width: ',
        ~~(img.naturalWidth / tower.frames),
        'px; height: ',
        img.naturalHeight,
        'px" class="preview-image"></div></div>',
        '<div class=title>',
        tower.nickName,
        '</div><div class=info>',
        '<div class=description>',
        tower.description,
        '</div>',
        '<div class=rating>',
        ~~tower.rating,
        '</div>',
        '<div class=speed>',
        tower.speed,
        '</div>',
        '<div class=damage>',
        tower.shotType.damage,
        '</div>',
        '<div class=range>',
        tower.range,
        '</div>',
        '<div class=cost>',
        tower.cost,
        '</div></div>',
      ].join('');
      towerButtons.push({
        tower: tower,
        element: div,
      });
      div.addEventListener(events.click, () => {
        towerType = tower;

        for (let i = towerButtons.length; i--; ) {
          towerButtons[i].element.classList.remove('selected-tower');
        }

        div.classList.add('selected-tower');
      });
      towerPanel.appendChild(div);
    };
    const addTowers = () => {
      for (const key in types.towers) {
        addTower(types.towers[key]);
      }
    };
    const startMusic = () => {
      const music = this.sounds['burn_them_down'];

      if (music) {
        const sound = new Sound(music, true);
        sound.setVolume(0.3);
        sound.play();
      } else {
        soundInfo.classList.add('hidden');
      }
    };
    const completed = e => {
      addTowers();
      addHandlers();
      view.background = this.images.background;
      view.showGrid = false;
      buyMedipackButton.querySelector('span').textContent = logic.mediPackCost;
      buyTowerbuildButton.querySelector('span').textContent = logic.towerBuildCost;
      document.querySelector('#frame').classList.remove('hidden');
      document.querySelector('#wait').classList.add('hidden');
      startMusic();
      logic.start();

      if (localStorage.towerDefense !== undefined) {
        const result = confirm('Previous game found. Load previous game?');

        if (result) {
          const state = JSON.parse(localStorage.towerDefense);
          logic.loadState(state);
          startWaveButton.querySelector('span').textContent = logic.waves.index + 1;
        }
      }

      updateNextWave();
    };
    const progress = e => {
      document.querySelector('#wait-message').textContent = `Loading (${e.name}, ${~~(e.progress * 100)}% of ${
        e.total
      })`;
    };
    const view = new CanvasView(canvas);
    const logic = new GameLogic(view, 30, 15);
    const loader = new Loader(completed, progress);
    loader.set('Images', ImageLoader, images, resources.images);
    loader.set('Sounds', SoundLoader, sounds, resources.sounds);
    loader.start();
  }
}
