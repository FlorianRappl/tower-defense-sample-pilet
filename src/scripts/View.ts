import { Size } from './utils';

class View {
  protected running = false;
  protected visuals = [];
  public background = undefined;
  public showGrid = true;
  protected mazeSize = new Size(25, 25);

  constructor(protected width = 300, protected height = 200) {}

  pause() {
    this.running = false;
  }

  add(visual) {
    if (Array.isArray(visual)) {
      for (var i = 0, n = visual.length; i < n; ++i) {
        this.visuals.push(visual[i]);
      }
    } else {
      this.visuals.push(visual);
    }

    this.visuals.sort((a, b) => a.z - b.z);
  }

  remove(visual) {
    const index = this.visuals.indexOf(visual);
    this.visuals.splice(index, 1);
  }

  draw() {
    this.drawBackground();
    this.drawSpawn();
    this.drawHome();

    if (this.showGrid) this.drawGrid();

    for (var i = 0, n = this.visuals.length; i < n; ++i) this.drawVisual(this.visuals[i]);
  }

  drawBackground() {}

  drawGrid() {}

  drawHome() {}

  drawSpawn() {}

  drawVisual(element) {}
}

export class CanvasView extends View {
  private context: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    super(element.width, element.height);
    this.context = element.getContext('2d');
  }

  start() {
    this.running = true;
    const render = () => {
      if (this.running) {
        window.requestAnimationFrame(render);
      }

      this.draw();
    };

    window.requestAnimationFrame(render);
  }

  drawVisual(element) {
    const ctx = this.context;
    const visual = element.visual;
    const sx = visual.index * visual.width;
    const sy = 0;
    const wo = this.width / this.mazeSize.width;
    const ho = this.height / this.mazeSize.height;
    let dx = element.mazeCoordinates.x * wo;
    let dy = element.mazeCoordinates.y * ho;
    const w = visual.scale * wo * Math.min(1, visual.width / visual.height);
    const h = visual.scale * ho * Math.min(1, visual.height / visual.width);
    dx += (wo - w) * 0.5;
    dy += (ho - h) * 0.5;
    ctx.drawImage(visual.image, sx, sy, visual.width, visual.height, dx, dy, w, h);
    element.draw(ctx, dx, dy, w, h);
  }

  drawBackground() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.background) {
      ctx.fillStyle = ctx.createPattern(this.background, 'repeat');
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  drawHome() {
    const ctx = this.context;
    const width = this.width / this.mazeSize.width;
    const x = (this.mazeSize.width - 1) * width;
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.fillRect(x, 0, width, this.height);
  }

  drawSpawn() {
    const ctx = this.context;
    const x = 0;
    const y = (~~(this.mazeSize.height * 0.5) * this.height) / this.mazeSize.height;
    const width = this.width / this.mazeSize.width;
    const height = this.height / this.mazeSize.height;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + 0.5 * height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.fill();
  }

  drawGrid() {
    const ctx = this.context;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 0.8;

    for (let i = 1, w = this.mazeSize.width; i < w; ++i) {
      const x = (i * this.width) / w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
      ctx.closePath();
    }

    for (let j = 1, h = this.mazeSize.height; j < h; ++j) {
      const y = (j * this.height) / h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
      ctx.closePath();
    }
  }
}
