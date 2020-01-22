import { ResourceLoader } from './ResourceLoader';

export interface LoaderSet {
  name: string;
  resources: any;
  loader: ResourceLoader<any>;
}

export class Loader {
  private sets: Array<LoaderSet> = [];

  constructor(private completed = () => {}, private progress = (e: any) => {}, private error = (e: any) => {}) {}

  set(name: string, loader: ResourceLoader<any>, resources) {
    this.sets.push({
      name,
      resources,
      loader,
    });
  }

  start() {
    this.next();
  }

  next() {
    const set = this.sets.pop();

    const completed = e => this.next();
    const progress = e => {
      e.name = set.name;
      this.progress(e);
    };
    const error = e => {
      e.name = set.name;
      this.error(e);
    };

    if (set) {
      this.progress({
        name: set.name,
        recent: '',
        total: set.resources.length,
        progress: 0,
      });
      set.loader.load(set.resources, completed, progress, error);
      return;
    }

    this.completed();
  }
}
