import { ResourceLoader } from './ResourceLoader';

export class ImageLoader extends ResourceLoader {
  constructor(target) {
    super(target);
  }

  loadResource(name, value) {
    var img = document.createElement('img');
    img.addEventListener('error', () => this.error(name), false);
    img.addEventListener('load', () => this.progress(name), false);
    img.src = value;
    super.loadResource(name, img);
  }
}
