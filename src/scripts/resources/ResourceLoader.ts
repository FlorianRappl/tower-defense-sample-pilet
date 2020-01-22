export class ResourceLoader {
  constructor(target) {
    this.keys = target || {};
    this.loaded = 0;
    this.loading = 0;
    this.errors = 0;
    this.finished = false;
    this.oncompleted = undefined;
    this.onprogress = undefined;
    this.onerror = undefined;
  }

  completed() {
    this.finished = true;

    if (this.oncompleted && typeof this.oncompleted === 'function') {
      this.oncompleted.apply(this, [
        {
          loaded: this.loaded,
        },
      ]);
    }
  }

  progress(name) {
    this.loading--;
    this.loaded++;
    var total = this.loaded + this.loading + this.errors;

    if (this.onprogress && typeof this.onprogress === 'function') {
      this.onprogress.apply(this, [
        {
          recent: name,
          total: total,
          progress: this.loaded / total,
        },
      ]);
    }

    if (this.loading === 0) this.completed();
  }

  error(name) {
    this.loading--;
    this.errors++;
    var total = this.loaded + this.loading + this.errors;

    if (this.onerror && typeof this.onerror === 'function') {
      this.onerror.apply(this, [
        {
          error: name,
          total: total,
          progress: this.loaded / total,
        },
      ]);
    }
  }

  load(keys, completed, progress, error) {
    this.loading += keys.length;

    if (completed && typeof completed === 'function') this.oncompleted = completed;
    if (progress && typeof progress === 'function') this.onprogress = progress;
    if (error && typeof error === 'function') this.onerror = error;

    for (var i = keys.length; i--; ) {
      var key = keys[i];
      this.loadResource(key.name, key.value);
    }
  }

  loadResource(name, value) {
    this.keys[name] = value;
  }
}
