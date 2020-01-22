export interface Deposit {
  active: boolean;
  src: string;
  element: HTMLAudioElement;
}

export class Sound {
  static volume = 1.0;
  static channels = 6;
  static active = 0;
  static enabled = true;
  static deposit: Array<Deposit> = [];

  private source: string;
  private element: HTMLAudioElement;
  private volume: number;

  constructor(tag: HTMLAudioElement, private loop = false) {
    this.source = tag.src;
    this.setVolume(1.0);
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));

    if (this.element) {
      this.element.volume = Sound.volume * this.volume;
    }
  }

  pause() {
    if (this.element) {
      this.element.pause();
    }
  }

  play() {
    if (this.element || Sound.active > Sound.channels) {
      return;
    }

    this.element = Sound.createAudio(this.source);
    this.setVolume(this.volume);

    const ended = () => {
      const el = this.element;

      if (el.loop) {
        el.currentTime = 0;
        el.play();
      } else {
        this.element = undefined;
        el.removeEventListener('ended', ended);
        Sound.destroyAudio(el);
      }
    };

    this.element.addEventListener('ended', ended);

    if (Sound.enabled) {
      this.element.play();
    }
  }

  static createAudio(src: string) {
    let deposit: Deposit;
    Sound.active++;

    for (let i = Sound.deposit.length; i--; ) {
      deposit = Sound.deposit[i];

      if (!deposit.active && deposit.src === src) {
        deposit.active = true;
        deposit.element.currentTime = 0;
        return deposit.element;
      }
    }

    deposit = {
      active: true,
      src,
      element: new Audio(src),
    };

    Sound.deposit.push(deposit);
    return deposit.element;
  }

  static destroyAudio(element: HTMLAudioElement) {
    Sound.active--;

    for (let i = Sound.deposit.length; i--; ) {
      if (Sound.deposit[i].element === element) {
        Sound.deposit[i].active = false;
        break;
      }
    }
  }

  static disable() {
    if (Sound.enabled) {
      Sound.enabled = false;

      for (var i = Sound.deposit.length; i--; ) {
        if (Sound.deposit[i].active) {
          Sound.deposit[i].element.pause();
        }
      }
    }
  }

  static enable() {
    if (!Sound.enabled) {
      Sound.enabled = true;

      for (let i = Sound.deposit.length; i--; ) {
        if (Sound.deposit[i].active) {
          Sound.deposit[i].element.play();
        }
      }
    }
  }

  static setVolume(volume: number) {
    volume = Math.min(Math.max(volume, 0), 1);

    const change = volume / Sound.volume;
    Sound.volume = volume;

    for (let i = Sound.deposit.length; i--; ) {
      Sound.deposit[i].element.volume = change * Sound.deposit[i].element.volume;
    }
  }
}
