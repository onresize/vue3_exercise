import { CANVAS_WIDTH, CANVAS_HEIGHT, defalutFlyHeight, defalutFlyTime, p0, p1, p2 } from "./config"
import { loadData } from "./preload"
import Rocket from "./rocket";

let rocket = null

export function drawBackgroundColor(ctx, color = "#000") {
    ctx.save()
    ctx.fillStyle = color
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.restore();
}

export function drawBackgroundImage(ctx) {
    ctx.save()
    ctx.translate(0, 0);
    ctx.scale(1.35, 1.35);
    ctx.drawImage(loadData["bg"], 150, 0)
    ctx.restore();
}

export function drawWaitView(ctx, downcount = 0) {
    if (!rocket) {
        rocket = new Rocket({
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 - 400
        })
    }
    rocket.play(ctx);
    drawText(ctx, {
        text: "准备阶段",
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 - 30,
        color: "#fff",
        fontSize: 198,
        bold: true
    })
    drawText(ctx, {
        text: `倒计时${downcount}s`,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 + 130,
        color: "rgb(218,207,88)",
        fontSize: 48,
        bold: true
    })
}

export function drawFlyHeightText(ctx, flyHeight, color = "#fff") {
    drawText(ctx, {
        text: `${flyHeight.toFixed(2)}x`,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 - 150,
        color,
        fontSize: 288,
        bold: true
    })
    drawText(ctx, {
        text: "飞行高度",
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 + 30,
        color,
        fontSize: 56,
        bold: true
    })
}

export function drawText(ctx, { text, x, y, color = "#fff", fontSize = 32, textAlign = "center", bold = false }) {
    ctx.save()
    ctx.translate(x, y);
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px ${bold ? "bold" : ""} serif`;
    ctx.fillText(`${text}`, 0, 0);
    ctx.restore();
}

export function drawHorizontalLine(ctx, data, dateTime) {
    let list = data || [...defalutFlyTime]
    let nowTime = dateTime / 1000
    if (nowTime > list[list.length - 1]) {
        let d = (nowTime - [...defalutFlyTime][0]) / 10
        for (let i = list.length - 1; i >= 0; i--) {
            list[i] = nowTime - d * (9 - i)
        }
    }
    list.forEach((text, index) => {
        let x = (CANVAS_WIDTH - 200) / list.length * (index + 1) - 60;
        let y = CANVAS_HEIGHT - 150;
        let color = "rgba(255,255,255,.7)"
        drawRect(ctx, {
            x,
            y,
            width: 6,
            height: 20,
            color
        })
        drawText(ctx, {
            x,
            y: y + 50,
            text: (+text).toFixed(1) + "s",
            bold: true,
            color
        })
    })

}

export function drawVerticalLine(ctx, data, flyHeight) {
    let list = data || [...defalutFlyHeight]
    if (flyHeight > list[list.length - 1]) {
        let d = (flyHeight - [...defalutFlyHeight][0]) / 10
        for (let i = list.length - 1; i >= 0; i--) {
            list[i] = flyHeight - d * (9 - i)
        }
    }
    list.forEach((text, index) => {
        let x = CANVAS_WIDTH - 170;
        let y = (CANVAS_HEIGHT - 270) - (CANVAS_HEIGHT - 200) / list.length * index
        let color = "rgba(255,255,255,.7)"
        drawRect(ctx, {
            x,
            y,
            width: 20,
            height: 6,
            color
        })
        drawText(ctx, {
            x: x + 30,
            y: y + 5,
            text: (+text).toFixed(2) + "x",
            textAlign: "left",
            bold: true,
            color
        })
    })
}

export function drawRect(ctx, { x, y, width = 5, height = 5, color = "#fff" }) {
    ctx.save()
    ctx.translate(x, y);
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
    ctx.restore();
}

export function drawPaySign(ctx, { x, y, height, profit }) {
    ctx.save()
    let img = loadData["pay"];
    ctx.translate(x, y);
    ctx.scale(1, 1);
    ctx.drawImage(loadData["pay"], -img.width / 2, -img.height / 2)
    ctx.restore();

    drawText(ctx, {
        x,
        y: y - 50,
        text: (+height).toFixed(2) + "x",
        bold: true,
        color: "#fff"
    })

    drawText(ctx, {
        x,
        y: y - 100,
        text: (+profit).toFixed(2),
        bold: true,
        color: profit>0 ? "rgb(95,175,91)" : "rgb(198,15,20)"
    })
}

export function calSC(t) {
    return {
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t
    }
}

export function calB(t) {
    return {
        x: Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + Math.pow(t, 2) * p2.x,
        y: Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + Math.pow(t, 2) * p2.y
    }
}

export function drawLine(ctx, progress, color = "rgb(128,119,193)") {
    ctx.save()
    ctx.translate(0, 0);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    const bPonit = calB(progress)
    const sPonit = calSC(progress)
    ctx.quadraticCurveTo(sPonit.x, sPonit.y, bPonit.x, bPonit.y)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath();
    ctx.restore();
    return {
        ...bPonit
    }
}