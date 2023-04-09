import { loadData } from "./preload"

export default class Parachute {
    constructor({ x = 0, y = 0, time = 120,fallHeight }) {
        this.x = x;
        this.y = y;
        this.time = time;
        this.fall = loadData["fall"];
        this.g = 0.05;
        this.vx = -2;
        this.vy = 2;
        return this
    }
    play(ctx) {
        this.time--
        this.vy += this.g;
        this.x += this.vx + Math.random() * 1.5;
        this.y += this.vy
        this.draw(ctx);
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.scale(1.6, 1.6);
        ctx.drawImage(this.fall, 0, 0)
        ctx.restore();
    }
    isEnd() {
        return this.time < 0;
    }
}