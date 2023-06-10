import { CANVAS_HEIGHT, origin, defaultHeight, xWidth, yHeight, defalutMaxHeight } from "./config";

export function data2Point(data) {
  const { multipler, timestamp } = data;
  const { maxT, maxH } = this;
  let nowTime = new Date(timestamp).getTime();

  if (multipler == 1)
    return {
      x: origin.x,
      y: origin.y,
    };

  let t = (nowTime - this.startTime) / 1000;
  let x = origin.x + (t / maxT) * xWidth;
  let y = origin.y - ((multipler - defaultHeight) / (maxH - defaultHeight)) * yHeight;

  return {
    x,
    y,
  };
}
