import { ResourceLoader } from './ResourceLoader';

export class ImageLoader extends ResourceLoader<HTMLImageElement> {
  constructor(target: Record<string, HTMLImageElement>) {
    super(target);
  }

  loadResource(name: string, value: string) {
    var img = document.createElement('img');
    img.addEventListener('error', () => this.error(name), false);
    img.addEventListener('load', () => this.progress(name), false);
    img.src = value;
    super.includeResource(name, img);
  }
}
