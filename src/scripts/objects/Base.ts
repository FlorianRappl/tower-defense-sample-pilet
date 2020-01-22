export class Base {
  events: Record<string, Array<Function>> = {};

  registerEvent(event: string) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
  }

  unregisterEvent(event: string) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }

  triggerEvent(event: string, args: any = {}) {
    const events = this.events[event];

    if (events) {
      for (let i = events.length; i--; ) {
        events[i].call(this, args);
      }
    }
  }

  addEventListener(event: string, handler: Function) {
    const events = this.events[event];

    if (events && handler && typeof handler === 'function') {
      events.push(handler);
    }
  }

  removeEventListener(event: string, handler?: Function) {
    const events = this.events[event];

    if (events) {
      if (handler && typeof handler === 'function') {
        const index = events.indexOf(handler);
        events.splice(index, 1);
      } else {
        events.splice(0, events.length);
      }
    }
  }
}
