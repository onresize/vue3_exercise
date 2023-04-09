import { loadData } from "./preload"

export default class Rocket {
    constructor({ x = 0, y = 0, angle = 0 }) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fly = loadData["fly"];
        this.animationPath = [0, 3, 4, 5]
        this.frame = 0;
        this.step = 0;
        this.frameIndex = 0;
        this.speed = 5;
        this.isStop = false;
        return this
    }
    play(ctx) {
        if (!this.isStop) {
            this.step++;
            if (this.step % this.speed == 0) {
                this.frameIndex = this.frame++ % 4;
            }
        }
        this.draw(ctx);
    }
    stop() {
        this.isStop = true;
    }
    draw(ctx) {
        if (this.isHide) return;
        ctx.save()
        const w = this.fly.width
        const h = this.fly.height
        ctx.translate(this.x, this.y);
        ctx.scale(1.8, 1.8);
        ctx.rotate(this.angle);
        ctx.drawImage(this.fly, w / 6 * this.animationPath[this.frameIndex], 0, w / 6, h / 2, - w / 6 / 2, - h / 2 / 2, w / 6, h / 2)
        ctx.restore();
    }
    setOption(x = 0, y = 0, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}