export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 600;
export const backgroundColor = "rgb(15,33,46)";
export const lineColor = "rgb(255,217,0)";
export const defaultHeight = 1;
export const defalutMaxHeight = 1.8;
export const defalutMaxTime = 10;
export const origin = {
  x: 100,
  y: 550,
};
export const defalutAxisData = {
  xAxis: {
    len: 5,
    unit: "s",
    color: "rgb(47,69,83)",
  },
  yAxis: {
    len: 5,
    unit: "x",
    color: "rgb(47,69,83)",
  },
};

export const xWidth = CANVAS_WIDTH - origin.x * 2;
export const yHeight = CANVAS_HEIGHT - (CANVAS_HEIGHT - origin.y) * 2;
