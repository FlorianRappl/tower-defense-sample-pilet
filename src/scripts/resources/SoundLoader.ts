import { ResourceLoader } from './ResourceLoader';

export interface SoundDef {
  ogg: string;
  mp3: string;
}

export class SoundLoader extends ResourceLoader<HTMLAudioElement> {
  constructor(target: Record<string, HTMLAudioElement>) {
    super(target);
  }

  loadResource(name: string, value: SoundDef) {
    const element = document.createElement('audio');
    element.addEventListener('loadedmetadata', () => this.progress(name), false);
    element.addEventListener('error', () => this.error(name), false);

    if (element.canPlayType('audio/ogg').replace(/^no$/, '')) {
      element.src = value.ogg;
    } else if (element.canPlayType('audio/mpeg').replace(/^no$/, '')) {
      element.src = value.mp3;
    } else {
      return this.progress(name);
    }

    super.includeResource(name, element);
  }
}
