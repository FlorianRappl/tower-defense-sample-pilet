import background from '../assets/images/background.jpg';
import airshot from '../assets/sprites/airshot.png';
import airwolf from '../assets/sprites/AirWolf.png';
import armos from '../assets/sprites/Armos.png';
import canontower from '../assets/sprites/canontower.png';
import darknut from '../assets/sprites/DarkNut.png';
import firewizzrobe from '../assets/sprites/FireWizzrobe.png';
import flak from '../assets/sprites/flak.png';
import flameshot from '../assets/sprites/flameshot.png';
import flametower from '../assets/sprites/flametower.png';
import gatetohell from '../assets/sprites/gatetohell.png';
import hellshot from '../assets/sprites/hellshot.png';
import iceshot from '../assets/sprites/iceshot.png';
import icetower from '../assets/sprites/icetower.png';
import lasershot from '../assets/sprites/lasershot.png';
import lasertower from '../assets/sprites/lasertower.png';
import mgnest from '../assets/sprites/mgnest.png';
import mgshot from '../assets/sprites/mgshot.png';
import newunit from '../assets/sprites/newUnit.png';
import rock from '../assets/sprites/rock.png';
import rope from '../assets/sprites/rope.png';
import shellshot from '../assets/sprites/shellshot.png';
import suns from '../assets/sprites/suns.png';
import sunshot from '../assets/sprites/sunshot.png';
import mario from '../assets/sprites/mario.png';
import zelda from '../assets/sprites/zelda.png';
import sonic from '../assets/sprites/sonic.png';
import burn_them_down_ogg from '../assets/music/burn_them_down.ogg';
import burn_them_down_mp3 from '../assets/music/burn_them_down.mp3';
import ak47_1_ogg from '../assets/effects/ak47-1.ogg';
import ak47_1_mp3 from '../assets/effects/ak47-1.mp3';
import artillery_ogg from '../assets/effects/artillery.ogg';
import artillery_mp3 from '../assets/effects/artillery.mp3';
import explosion_ogg from '../assets/effects/explosion.ogg';
import explosion_mp3 from '../assets/effects/explosion.mp3';
import flak_ogg from '../assets/effects/flak.ogg';
import flak_mp3 from '../assets/effects/flak.mp3';
import flames_ogg from '../assets/effects/flames.ogg';
import flames_mp3 from '../assets/effects/flames.mp3';
import hellshot_ogg from '../assets/effects/hellshot.ogg';
import hellshot_mp3 from '../assets/effects/hellshot.mp3';
import humm_ogg from '../assets/effects/humm.ogg';
import humm_mp3 from '../assets/effects/humm.mp3';
import icy_ogg from '../assets/effects/icy.ogg';
import icy_mp3 from '../assets/effects/icy.mp3';
import laser_ogg from '../assets/effects/laser.ogg';
import laser_mp3 from '../assets/effects/laser.mp3';
import laugh_ogg from '../assets/effects/laugh.ogg';
import laugh_mp3 from '../assets/effects/laugh.mp3';
import mgnest_ogg from '../assets/effects/mgnest.ogg';
import mgnest_mp3 from '../assets/effects/mgnest.mp3';
import wowpulse_ogg from '../assets/effects/wowpulse.ogg';
import wowpulse_mp3 from '../assets/effects/wowpulse.mp3';

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
    { name: 'background', value: background },
    { name: 'airshot', value: airshot },
    { name: 'airwolf', value: airwolf },
    { name: 'armos', value: armos },
    { name: 'canontower', value: canontower },
    { name: 'darknut', value: darknut },
    { name: 'firewizzrobe', value: firewizzrobe },
    { name: 'flak', value: flak },
    { name: 'flameshot', value: flameshot },
    { name: 'flametower', value: flametower },
    { name: 'gatetohell', value: gatetohell },
    { name: 'hellshot', value: hellshot },
    { name: 'iceshot', value: iceshot },
    { name: 'icetower', value: icetower },
    { name: 'lasershot', value: lasershot },
    { name: 'lasertower', value: lasertower },
    { name: 'mgnest', value: mgnest },
    { name: 'mgshot', value: mgshot },
    { name: 'newunit', value: newunit },
    { name: 'rock', value: rock },
    { name: 'rope', value: rope },
    { name: 'shellshot', value: shellshot },
    { name: 'suns', value: suns },
    { name: 'sunshot', value: sunshot },
    { name: 'mario', value: mario },
    { name: 'zelda', value: zelda },
    { name: 'sonic', value: sonic },
  ],
  sounds: [
    {
      name: 'burn_them_down',
      value: {
        ogg: burn_them_down_ogg,
        mp3: burn_them_down_mp3,
      },
    },
    {
      name: 'ak47-1',
      value: {
        ogg: ak47_1_ogg,
        mp3: ak47_1_mp3,
      },
    },
    {
      name: 'artillery',
      value: {
        ogg: artillery_ogg,
        mp3: artillery_mp3,
      },
    },
    {
      name: 'explosion',
      value: {
        ogg: explosion_ogg,
        mp3: explosion_mp3,
      },
    },
    {
      name: 'flak',
      value: {
        ogg: flak_ogg,
        mp3: flak_mp3,
      },
    },
    {
      name: 'flames',
      value: {
        ogg: flames_ogg,
        mp3: flames_mp3,
      },
    },
    {
      name: 'hellshot',
      value: {
        ogg: hellshot_ogg,
        mp3: hellshot_mp3,
      },
    },
    {
      name: 'humm',
      value: {
        ogg: humm_ogg,
        mp3: humm_mp3,
      },
    },
    {
      name: 'icy',
      value: {
        ogg: icy_ogg,
        mp3: icy_mp3,
      },
    },
    {
      name: 'laser',
      value: {
        ogg: laser_ogg,
        mp3: laser_mp3,
      },
    },
    {
      name: 'laugh',
      value: {
        ogg: laugh_ogg,
        mp3: laugh_mp3,
      },
    },
    {
      name: 'mgnest',
      value: {
        ogg: mgnest_ogg,
        mp3: mgnest_mp3,
      },
    },
    {
      name: 'wowpulse',
      value: {
        ogg: wowpulse_ogg,
        mp3: wowpulse_mp3,
      },
    },
  ],
};
