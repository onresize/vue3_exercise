import { CANVAS_WIDTH, CANVAS_HEIGHT, defaultHeight, origin, defalutMaxHeight, defalutMaxTime } from "./config";
import { preload } from "./preload";
import { data2Point } from "./utils";
import { drawBackgroundColor, drawAxis, drawFlyText, drawBall, drawSmoothLines, drawLines, drawLine } from "./draw";

export default class FlyGame {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = this.ctx.width = CANVAS_WIDTH;
    this.canvas.height = this.ctx.height = CANVAS_HEIGHT;
    this.flyHeight = defaultHeight;
    this.targetFlyHeight = defaultHeight;
    this.startTime = new Date().getTime();
    this.nowTime = new Date().getTime();
    this.isPlay = false;
    this.isEnd = false;
    this.maxT = defalutMaxTime;
    this.maxH = defalutMaxHeight;
    this.$data = [{ multipler: defaultHeight, timestamp: new Date() }];
    this.points = [];
    this.targetPoint = null;
    return this.init();
  }
  init() {
    this.getPoints();
    this.reset();
    preload().then((data) => {
      this.asstes = data;
      this.render();
      this.updated();
    });
    return this;
  }
  getPoints() {
    this.points = [].map.call(this.$data, (d) => {
      return data2Point.call(this, d);
    });
  }
  render() {
    const { ctx, flyHeight, points } = this;

    this.getPoints();

    drawBackgroundColor(ctx);

    drawAxis(this);

    drawLines(ctx, points);

    drawBall(ctx, {
      x: points[points.length - 1]?.x,
      y: points[points.length - 1]?.y,
    });

    if (this.targetFlyHeight > this.flyHeight) {
      this.flyHeight += (this.targetFlyHeight - this.flyHeight) * 0.2;
    } else {
      this.flyHeight = this.targetFlyHeight;
    }

    drawFlyText(ctx, flyHeight, this.isEnd ? "rgb(241,21,96)" : "#fff");
  }
  play() {
    this.isPlay = true;
    this.isEnd = false;
    return this;
  }
  over() {
    this.isEnd = true;
    this.isPlay = false;
    cancelAnimationFrame(this.updated);
    return this;
  }
  setData(data) {
    this.$data.push(data);
    this.aTime = 0;
    this.aniLine = true;
  }
  updated() {
    const { ctx } = this;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.render();
    window.requestAnimationFrame(this.updated.bind(this));
  }
  clear() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  reset() {
    this.flyHeight = defaultHeight;
    this.targetFlyHeight = defaultHeight;
    this.startTime = new Date().getTime();
    this.isPlay = false;
    this.isEnd = false;
    this.maxT = defalutMaxTime;
    this.maxH = defalutMaxHeight;
    this.$data = [{ multipler: defaultHeight, timestamp: new Date() }];
    this.points.length = 0;
    this.getPoints();
    this.targetPoint = null;
    this.clear();
    this.render();
    return this;
  }
}
