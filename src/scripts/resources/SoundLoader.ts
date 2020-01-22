import { ResourceLoader } from './ResourceLoader';

export class SoundLoader extends ResourceLoader {
  constructor(target) {
    super(target);
  }

  loadResource(name, value) {
    var element = document.createElement('audio');
    element.addEventListener('loadedmetadata', () => this.progress(name), false);
    element.addEventListener('error', () => this.error(name), false);

    if (element.canPlayType('audio/ogg').replace(/^no$/, '')) {
      element.src = value.ogg;
    } else if (element.canPlayType('audio/mpeg').replace(/^no$/, '')) {
      element.src = value.mp3;
    } else {
      return this.progress(name);
    }

    super.loadResource(name, element);
  }
}
