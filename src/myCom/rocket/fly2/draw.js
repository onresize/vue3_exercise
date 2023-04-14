import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  backgroundColor,
  defalutAxisData,
  origin,
  lineColor,
  defaultHeight,
  defalutMaxHeight,
  defalutMaxTime,
  xWidth,
  yHeight,
} from "./config";

export function drawRect(ctx, { x, y, width = 5, height = 5, color = "#fff" }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

export function drawText(
  ctx,
  {
    text,
    x,
    y,
    color = "#fff",
    fontSize = 32,
    textAlign = "center",
    bold = false,
  }
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px ${bold ? "bold" : ""} serif`;
  ctx.fillText(`${text}`, 0, 0);
  ctx.restore();
}

export function drawBall(ctx, { r = 6, x = origin.x, y = origin.y }) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.fillStyle = lineColor;
  ctx.arc(0, 0, r, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

export function drawFlyText(ctx, flyHeight, color = "#fff") {
  drawText(ctx, {
    text: `${flyHeight.toFixed(2)}x`,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    color,
    fontSize: 108,
    bold: true,
  });
}

export function drawBackgroundColor(ctx) {
  drawRect(ctx, {
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    color: backgroundColor,
  });
}

export function drawAxis(game, option = defalutAxisData) {
  const { ctx, startTime, nowTime, targetFlyHeight } = game;
  const { xAxis, yAxis } = option;
  const lineWidth = 3;

  let t = (nowTime - startTime) / 1000;
  let h = targetFlyHeight;

  if (t > game.maxT) {
    game.maxT = Math.ceil(t * 10) / 10;
  }
  if (h > game.maxH) {
    game.maxH = Math.ceil(h * 10) / 10;
  }

  ctx.save();
  ctx.translate(origin.x, origin.y);

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = xAxis.color;
  ctx.moveTo(0, 0);
  ctx.lineTo(xWidth, 0);
  ctx.stroke();
  ctx.closePath();

  for (let i = 0; i < xAxis.len; i++) {
    drawText(ctx, {
      text: `${~~(((i + 1) * game.maxT) / xAxis.len)}${xAxis.unit}`,
      x: 0 + ((i + 1) * xWidth) / xAxis.len,
      y: 18,
      color: xAxis.color,
      fontSize: 14,
      bold: true,
    });
  }

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = yAxis.color;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -yHeight);
  ctx.stroke();
  ctx.closePath();

  for (let i = 0; i < yAxis.len + 1; i++) {
    drawText(ctx, {
      text: `${(
        (i * (game.maxH - defaultHeight)) / yAxis.len +
        defaultHeight
      ).toFixed(1)}${yAxis.unit}`,
      x: -12,
      y: (-i * yHeight) / yAxis.len,
      color: yAxis.color,
      fontSize: 14,
      bold: true,
      textAlign: "right",
    });
  }

  ctx.restore();
}

export function drawLine(ctx, p1, p2) {
  if (!p2 || !p1) return;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

export function drawLines(ctx, points) {
  if (points.length < 2) {
    return;
  }
  for (let i = 0; i < points.length - 1; i++) {
    let curPoint = points[i];
    let nextPoint = points[i + 1];
    drawLine(ctx, curPoint, nextPoint);
  }
}

export function drawSmoothLines(ctx, points) {
  if (points.length < 3) {
    return drawLines(ctx, points);
  }
  const f = 0.3;
  const t = 0.6;
  const gradient = (a, b) => (b.y - a.y) / (b.x - a.x);
  ctx.save();

  // ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = lineColor;
  let g = 0;
  let dx1 = 0;
  let dy1 = 0;
  let dx2 = 0;
  let dy2 = 0;
  let prePoint = points[0];
  let nextPoint = null;

  for (let i = 1; i < points.length; i++) {
    ctx.beginPath();
    let curPoint = points[i];
    nextPoint = points[i + 1];
    if (nextPoint) {
      g = gradient(prePoint, nextPoint);
      dx2 = (nextPoint.x - curPoint.x) * -f;
      dy2 = dx2 * g * t;
    } else {
      dx2 = 0;
      dy2 = 0;
    }
    ctx.bezierCurveTo(
      prePoint.x - dx1,
      prePoint.y - dy1,
      curPoint.x + dx2,
      curPoint.y + dy2,
      curPoint.x,
      curPoint.y
    );
    dx1 = dx2;
    dy1 = dy2;
    prePoint = curPoint;
    ctx.stroke();
  }
  ctx.closePath();
  ctx.restore();
}
