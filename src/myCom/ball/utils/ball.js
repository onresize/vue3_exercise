import { G } from "./config";

export default class Ball {
  constructor(option) {
    this.x = 0;
    this.y = 0;
    this.r = 10;
    this.color = "#aaaaaa";
    this.scaleX = 1;
    this.scaleY = 1;
    this.vx = 0;
    this.vy = 0;
    this.isStatic = true;
    this.lightFrame = 0;
    this.line = null;
    this.openLight = false;
    Object.assign(this, option);
    return this;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, (360 * Math.PI) / 180, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  update() {
    if (this.isStatic) return;
    this.vy += G;
    this.x += this.vx;
    this.y += this.vy;
  }
}
