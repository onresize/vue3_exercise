import { CANVAS_WIDTH, CANVAS_HEIGHT, p1, o1 } from "./config";
import { preload } from "./preload";
import {
  drawBackgroundColor,
  drawBackgroundImage,
  drawFlyHeightText,
  drawHorizontalLine,
  drawLine,
  drawPaySign,
  drawVerticalLine,
  drawWaitView,
  calB,
} from "./create";
import Parachute from "./parachute";
import Boom from "./boom";
import Rocket from "./rocket";

import Easing from "./easing";

export default class FlyGame {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = this.ctx.width = CANVAS_WIDTH;
    this.canvas.height = this.ctx.height = CANVAS_HEIGHT;
    this.flyHeight = 1;
    this.isWait = true;
    this.isPlay = false;
    this.isEnd = false;
    this.horizontalData = null;
    this.verticalData = null;
    this.fallList = [];
    this.countdown = 5;
    this.boom = null;
    this.rocket = null;
    this.beginTime = null;
    this.nowTime = null;
    this.beginPoint = { x: 0, y: 1830 };
    this.nowPoint = { x: 0, y: 1830 };
    this.rocketAngle = 0;
    this.payList = [];
    this.payHeight = [];
    return this.init();
  }
  init() {
    preload().then((data) => {
      this.asstes = data;
      this.render();
      this.fallList.push();
      this.updated();
    });
    return this;
  }
  render() {
    const { ctx, asstes } = this;
    drawBackgroundColor(ctx, "rgb(22,0,35)");
    drawBackgroundImage(ctx);

    if (!this.isPlay) return drawWaitView(ctx, this.countdown);
    if (!this.isEnd) this.nowTime = new Date().getTime();

    let dTime = this.nowTime - this.beginTime;

    drawHorizontalLine(ctx, this.horizontalData, dTime);
    drawVerticalLine(ctx, this.verticalData, this.flyHeight);

    let progress = Math.min(dTime / 10000, 1);
    progress = Easing.Linear.None(progress);
    this.nowPoint = drawLine(ctx, progress);

    if (dTime < 9900 && !this.isEnd) {
      let dx = this.nowPoint.x - this.beginPoint.x;
      let dy = this.nowPoint.y - this.beginPoint.y;
      this.rocketAngle = Math.atan2(dy, dx) + Math.PI / 2;
      this.beginPoint = this.nowPoint;
    }

    this.rocket.setOption(this.nowPoint.x, this.nowPoint.y, this.rocketAngle);
    this.rocket.play(ctx);

    this.renderFall();
    this.renderPaySign(progress);

    if (this.isEnd) {
      this.boom.setOption(this.rocket.x - 200, this.rocket.y - 200);
      this.boom.play(ctx);
      this.rocket.stop();
    } else {
      this.flyHeight += 0.00175;
    }
    drawFlyHeightText(
      ctx,
      this.flyHeight,
      this.isEnd ? "rgb(198,27,34)" : "#fff"
    );
  }
  play() {
    if (!this.isPlay) {
      this.isWait = false;
      this.isPlay = true;
      this.isEnd = false;
      this.beginTime = new Date().getTime();
      this.rocket = new Rocket({ x: 0, y: CANVAS_HEIGHT - 150 });
      this.boom = new Boom({ x: this.rocket.x, y: this.rocket.y });
    }
  }
  over() {
    this.isEnd = true;
  }
  setPayList(list = []) {
    this.payList = list;
  }
  renderFall() {
    for (let i = 0; i < this.fallList.length; i++) {
      const fall = this.fallList[i];
      fall.play(this.ctx);
      if (fall.isEnd()) {
        this.fallList.splice(i, 1);
        i--;
      }
    }
  }
  renderPaySign(progress) {
    this.payList.forEach((item) => {
      // const { ctx } = this
      // let v = (item.fly_height - 1) / Math.max(this.flyHeight - 1, 1);
      // if (v < 1) {
      //     let px1 = {
      //         x: 0,
      //         y: (1 - v) * (CANVAS_HEIGHT - 52)
      //     }
      //     ctx.save()
      //     ctx.beginPath()
      //     ctx.fillStyle = "#0f0"
      //     ctx.textAlign = "left"
      //     ctx.textBaseline = "middle";
      //     ctx.font = `32px bold serif`;
      //     ctx.fillText(`${item.fly_height}`, px1.x, px1.y);
      //     ctx.closePath();
      //     ctx.restore();

      //     ctx.save()
      //     ctx.lineJoin = "round";
      //     ctx.lineCap = "round";
      //     ctx.lineWidth = 2
      //     ctx.strokeStyle = "#f00"
      //     ctx.beginPath()
      //     ctx.moveTo(px1.x, px1.y);
      //     ctx.lineTo(CANVAS_WIDTH, px1.y);
      //     ctx.stroke()
      //     ctx.closePath();
      //     ctx.restore();
      // }

      let signProgress = (item.fly_height / Math.max(this.flyHeight, 2)) * 1.05;
      if (item.fly_height < 1.2) signProgress *= 0.42;
      else if (item.fly_height < 1.3) signProgress *= 0.53;
      else if (item.fly_height < 1.4) signProgress *= 0.69;
      else if (item.fly_height < 1.5) signProgress *= 0.82;
      else if (item.fly_height < 1.6) signProgress *= 0.88;
      else if (item.fly_height < 1.7) signProgress *= 0.9;
      else if (item.fly_height < 2) signProgress *= 0.92;

      if (progress >= 1) {
        if (o1.x > p1.x) {
          p1.x += 0.05;
        }
        if (o1.y > p1.y) {
          p1.y += 0.05;
        }
        const _p1 = calB(0.99);
        const _p2 = calB(1);

        let dx = _p2.x - _p1.x;
        let dy = _p2.y - _p1.y;
        this.rocketAngle = Math.atan2(dy, dx) + Math.PI / 2;
      }
      if (signProgress < progress) {
        const _point = calB(signProgress);
        drawPaySign(this.ctx, {
          ..._point,
          height: item.fly_height,
          profit: item.profit,
        });
        this.addFallAnimation({
          ..._point,
          fallHeight: item.fly_height,
        });
      }
    });
  }
  addFallAnimation({ x, y, fallHeight }) {
    if (this.payHeight.find((h) => fallHeight == h)) return;
    this.payHeight.push(fallHeight);
    this.fallList.push(new Parachute({ x, y }));
  }
  updated() {
    const { ctx } = this;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.render();
    window.requestAnimationFrame(this.updated.bind(this));
  }
  reset() {
    this.flyHeight = 1;
    this.isPlay = false;
    this.horizontalData = null;
    this.verticalData = null;
    this.fallList.length = 0;
    this.payHeight.length = 0;
    this.countdown = 5;
    this.isWait = true;
    this.boom = null;
    this.rocket = null;
    this.beginTime = null;
    this.nowTime = null;
    this.isEnd = false;
    this.beginPoint = { x: 0, y: 1830 };
    this.nowPoint = { x: 0, y: 1830 };
    p1.x = 1500;
    p1.y = 1500;
    this.rocketAngle = 0;
  }
}
