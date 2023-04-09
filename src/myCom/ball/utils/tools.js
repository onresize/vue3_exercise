export function checkCircle(ballA,ballB){
    let dx = ballB.x - ballA.x;
    let dy = ballB.y - ballA.y;
    let d = Math.sqrt(dx*dx+dy*dy)
    return d < ballA.r + ballB.r
}