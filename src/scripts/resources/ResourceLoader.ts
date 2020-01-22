export class ResourceLoader<T> {
  public loaded = 0;
  public loading = 0;
  public errors = 0;
  public finished = false;
  public oncompleted = undefined;
  public onprogress = undefined;
  public onerror = undefined;

  constructor(public keys: Record<string, T> = {}) {}

  completed() {
    this.finished = true;
    const completed = this.oncompleted;

    if (completed && typeof completed === 'function') {
      completed.call(this, {
        loaded: this.loaded,
      });
    }
  }

  progress(name: string) {
    this.loading--;
    this.loaded++;
    const total = this.loaded + this.loading + this.errors;
    const progress = this.onprogress;

    if (progress && typeof progress === 'function') {
      progress.call(this, {
        recent: name,
        total,
        progress: this.loaded / total,
      });
    }

    if (this.loading === 0) {
      this.completed();
    }
  }

  error(name: string) {
    this.loading--;
    this.errors++;
    const total = this.loaded + this.loading + this.errors;
    const error = this.onerror;

    if (error && typeof error === 'function') {
      error.call(this, {
        error: name,
        total: total,
        progress: this.loaded / total,
      });
    }
  }

  load(keys: Array<{ name: string; value: T }>, completed?: Function, progress?: Function, error?: Function) {
    this.loading += keys.length;

    if (completed && typeof completed === 'function') {
      this.oncompleted = completed;
    }

    if (progress && typeof progress === 'function') {
      this.onprogress = progress;
    }

    if (error && typeof error === 'function') {
      this.onerror = error;
    }

    for (let i = keys.length; i--; ) {
      const key = keys[i];
      this.loadResource(key.name, key.value);
    }
  }

  protected includeResource(name: string, value: T) {
    this.keys[name] = value;
  }

  loadResource(name: string, value: any) {}
}
