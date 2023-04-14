import { G } from "./config";

export default class Rect {
  constructor(option) {
    this.x = 0;
    this.y = 0;
    this.width = 30;
    this.height = 30;
    this.color = "#e37";
    this.text = "0";
    this.scaleX = 1;
    this.scaleY = 1;
    Object.assign(this, option);
    return this;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.width / 2, this.height / 2);
    ctx.restore();
  }
}
