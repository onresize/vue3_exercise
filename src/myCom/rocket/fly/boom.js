import { loadData } from "./preload";

export default class Boom {
  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
    this.animationScale = [0.7, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    this.frame = 0;
    this.booms = new Array(7).fill(0).map((b, i) => loadData["boom" + (i + 1)]);
    this.step = 0;
    this.frameIndex = 0;
    this.speed = 5;
    return this;
  }
  play(ctx) {
    this.step++;
    if (this.step % this.speed == 0) {
      this.frameIndex = this.frame < 7 ? this.frame++ : 6;
    }
    this.draw(ctx);
  }
  draw(ctx) {
    ctx.save();
    let targetBoom = this.booms[this.frameIndex];
    let scale = this.animationScale[this.frameIndex];
    const w = targetBoom.width * scale;
    const h = targetBoom.height * scale;
    ctx.translate(this.x, this.y);
    ctx.scale(scale, scale);
    ctx.drawImage(targetBoom, -w / 2, -h / 2);
    ctx.restore();
  }
  setOption(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
