const w: any = window;

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  w.mozRequestAnimationFrame ||
  w.oRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  ((callback: () => void) => window.setTimeout(callback, 1000 / 60));
