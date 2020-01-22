export const constants = {
  ticks: 25,
  money: 5,
  hitpoints: 10,
  mediPackCost: 5,
  mediPackFactor: 1.5,
  mediPackHealth: 1,
  towerBuildCost: 5,
  towerBuildFactor: 1.85,
  towerBuildNumber: 4,
};

export const images: Record<string, HTMLImageElement> = {};
export const sounds: Record<string, HTMLAudioElement> = {};

export const events = {
  click: 'click',
  mousemove: 'mousemove',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  contextmenu: 'contextmenu',
  died: 'died',
  shot: 'shot',
  hit: 'hit',
  refreshed: 'refreshed',
  accomplished: 'accomplished',
  playerDefeated: 'playerDefeated',
  moneyChanged: 'moneyChanged',
  waveCreated: 'waveCreated',
  waveFinished: 'waveFinished',
  waveDefeated: 'waveDefeated',
  healthChanged: 'healthChanged',
  unitSpawned: 'unitSpawned',
  towerNumberChanged: 'towerNumberChanged',
  towerBuildCostChanged: 'towerBuildCostChanged',
  mediPackCostChanged: 'mediPackCostChanged',
};

export const resources = {
  images: [
    { name: 'background', value: require('../assets/images/background.jpg') },
    { name: 'airshot', value: require('../assets/sprites/airshot.png') },
    { name: 'airwolf', value: require('../assets/sprites/AirWolf.png') },
    { name: 'armos', value: require('../assets/sprites/Armos.png') },
    { name: 'canontower', value: require('../assets/sprites/canontower.png') },
    { name: 'darknut', value: require('../assets/sprites/DarkNut.png') },
    { name: 'firewizzrobe', value: require('../assets/sprites/FireWizzrobe.png') },
    { name: 'flak', value: require('../assets/sprites/flak.png') },
    { name: 'flameshot', value: require('../assets/sprites/flameshot.png') },
    { name: 'flametower', value: require('../assets/sprites/flametower.png') },
    { name: 'gatetohell', value: require('../assets/sprites/gatetohell.png') },
    { name: 'hellshot', value: require('../assets/sprites/hellshot.png') },
    { name: 'iceshot', value: require('../assets/sprites/iceshot.png') },
    { name: 'icetower', value: require('../assets/sprites/icetower.png') },
    { name: 'lasershot', value: require('../assets/sprites/lasershot.png') },
    { name: 'lasertower', value: require('../assets/sprites/lasertower.png') },
    { name: 'mgnest', value: require('../assets/sprites/mgnest.png') },
    { name: 'mgshot', value: require('../assets/sprites/mgshot.png') },
    { name: 'newunit', value: require('../assets/sprites/newUnit.png') },
    { name: 'rock', value: require('../assets/sprites/rock.png') },
    { name: 'rope', value: require('../assets/sprites/rope.png') },
    { name: 'shellshot', value: require('../assets/sprites/shellshot.png') },
    { name: 'suns', value: require('../assets/sprites/suns.png') },
    { name: 'sunshot', value: require('../assets/sprites/sunshot.png') },
    { name: 'mario', value: require('../assets/sprites/mario.png') },
    { name: 'zelda', value: require('../assets/sprites/zelda.png') },
    { name: 'sonic', value: require('../assets/sprites/sonic.png') },
  ],
  sounds: [
    {
      name: 'burn_them_down',
      value: {
        ogg: require('../assets/music/burn_them_down.ogg'),
        mp3: require('../assets/music/burn_them_down.mp3'),
      },
    },
    {
      name: 'ak47-1',
      value: {
        ogg: require('../assets/effects/ak47-1.ogg'),
        mp3: require('../assets/effects/ak47-1.mp3'),
      },
    },
    {
      name: 'artillery',
      value: {
        ogg: require('../assets/effects/artillery.ogg'),
        mp3: require('../assets/effects/artillery.mp3'),
      },
    },
    {
      name: 'explosion',
      value: {
        ogg: require('../assets/effects/explosion.ogg'),
        mp3: require('../assets/effects/explosion.mp3'),
      },
    },
    {
      name: 'flak',
      value: {
        ogg: require('../assets/effects/flak.ogg'),
        mp3: require('../assets/effects/flak.mp3'),
      },
    },
    {
      name: 'flames',
      value: {
        ogg: require('../assets/effects/flames.ogg'),
        mp3: require('../assets/effects/flames.mp3'),
      },
    },
    {
      name: 'hellshot',
      value: {
        ogg: require('../assets/effects/hellshot.ogg'),
        mp3: require('../assets/effects/hellshot.mp3'),
      },
    },
    {
      name: 'humm',
      value: {
        ogg: require('../assets/effects/humm.ogg'),
        mp3: require('../assets/effects/humm.mp3'),
      },
    },
    {
      name: 'icy',
      value: {
        ogg: require('../assets/effects/icy.ogg'),
        mp3: require('../assets/effects/icy.mp3'),
      },
    },
    {
      name: 'laser',
      value: {
        ogg: require('../assets/effects/laser.ogg'),
        mp3: require('../assets/effects/laser.mp3'),
      },
    },
    {
      name: 'laugh',
      value: {
        ogg: require('../assets/effects/laugh.ogg'),
        mp3: require('../assets/effects/laugh.mp3'),
      },
    },
    {
      name: 'mgnest',
      value: {
        ogg: require('../assets/effects/mgnest.ogg'),
        mp3: require('../assets/effects/mgnest.mp3'),
      },
    },
    {
      name: 'wowpulse',
      value: {
        ogg: require('../assets/effects/wowpulse.ogg'),
        mp3: require('../assets/effects/wowpulse.mp3'),
      },
    },
  ],
};
