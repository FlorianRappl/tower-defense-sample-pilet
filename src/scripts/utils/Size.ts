export class Size {
  constructor(public width = 0, public height = 0) {}

  clone() {
    return new Size(this.width, this.height);
  }

  divide(sz: Size) {
    return new Size(this.width / sz.width, this.height / sz.height);
  }
}
