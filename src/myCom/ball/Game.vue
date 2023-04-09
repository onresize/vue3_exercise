<script setup>
import { ref, onMounted } from "vue";
import Rect from "./utils/rect";
import Ball from "./utils/ball";
import { checkCircle } from "./utils/tools";
const canvasRef = ref(null);
onMounted(() => {
  new Game(canvasRef.value);
});

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.CANVAS_WIDTH = 800;
    this.CANVAS_HEIGHT = 600;
    canvas.width = this.ctx.width = this.CANVAS_WIDTH;
    canvas.height = this.ctx.height = this.CANVAS_HEIGHT;
    this.balls = [];
    this.boxes = [];
    this.line = 12;
    this.ballR = 6;
    return this.init();
  }
  init() {
    const { canvas } = this;
    this.create();
    // this.render();
    canvas.addEventListener("click", this.play.bind(this));
    this.update();
    return this;
  }
  create() {
    const { CANVAS_WIDTH, CANVAS_HEIGHT, balls, boxes, line, ballR } = this;
    for (let i = 1; i < line; i++) {
      for (let j = 0; j < i + 2; j++) {
        let ball = new Ball({
          x: (CANVAS_WIDTH - ballR) / 2 + j * 40 - (i + 1) * 20,
          y: CANVAS_HEIGHT - (line + 1) * 40 + (i - 1) * 40,
          r: ballR,
          line: i,
        });
        balls.push(ball);
      }
      for (let n = 0; n < line; n++) {
        let rect = new Rect({
          x: 123 + (n + 1) * 40,
          y: (line + 0.5) * 40,
          text: n,
        });
        boxes.push(rect);
      }
    }
  }
  play() {
    const { CANVAS_WIDTH, CANVAS_HEIGHT, balls, line, ballR } = this;
    balls.push(
      new Ball({
        x: CANVAS_WIDTH / 2 - 30 + 60 * Math.random(),
        y: CANVAS_HEIGHT - (line + 2.5) * 40,
        color: "#d35",
        r: ballR + 2,
        isStatic: false,
      })
    );
  }
  render() {
    const { ctx, balls, boxes } = this;
    this.bgDraw();
    balls.forEach((ball) => ball.draw(ctx));
    boxes.forEach((rect) => rect.draw(ctx));
    balls.forEach((ball, index) => {
      for (let i = 0; i < balls.length; i++) {
        let ballB = balls[i];
        if (index != i && ballB.isStatic && checkCircle(ball, ballB)) {
          if (!ball.isStatic) {
            ball.vy *= -0.25;
            let dx = ballB.x - ball.x;
            let dy = ballB.y - ball.y;
            let angle = Math.atan2(dy, dx);
            ball.vx += -Math.cos(angle) * 0.24;
            ball.vy += -Math.sin(angle) * 0.63;
          }
        }
      }
      ball.update();
    });
  }
  bgDraw() {
    const { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } = this;
    ctx.fillStyle = "rgb(16,33,48)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  clear() {
    const { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } = this;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  update() {
    this.clear();
    this.render();
    window.requestAnimationFrame(this.update.bind(this));
  }
}
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas {
  border: 1px solid #808080;
}
</style>
