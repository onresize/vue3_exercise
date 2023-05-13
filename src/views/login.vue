<template>
  <div class="login_bg">
    <canvas id="canvasID" width="100%" height="100%"> </canvas>
    <div class="mask">
      <div class="show" @click="toPage('admin')">admin用户</div>
      <div class="show" @click="toPage('ordinary')">普通用户</div>
    </div>
    <div class="left-box">
      <payCom style="payBox"></payCom>
    </div>
    <div class="right-box">
      <a href="https://gitee.com/Embrance-T/vue3_exercise"
        ><img
          src="https://gitee.com/Embrance-T/vue3_exercise/widgets/widget_1.svg"
          alt="Fork me on Gitee"
      /></a>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { loginBroadcast } from "@/utils/broadcast";
import payCom from "@/myCom/payCom/index.vue";

const Router = useRouter();

const toPage = (name) => {
  if (name == "admin") {
    // console.log("当前账户admin路由：", AdminRoutes);
    window.localStorage.setItem("user", "Admin");
  }
  if (name == "ordinary") {
    // console.log("当前账户ordinary路由：", OriginRoutes);
    window.localStorage.setItem("user", "Origin");
  }
  Router.push({ path: "/welcome" });
  loginBroadcast.postMessage("true");
};

onMounted(() => {
  var maxParticles = 20000,
    particleSize = 3,
    emissionRate = 1,
    startTime,
    particles = [],
    currentTime,
    ballFriction = 0.99,
    collisionDamper = 0.1,
    lastPos,
    objectSize = 3; // drawSize of emitter/field
  var canvas = document.getElementById("canvasID");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var midX = canvas.width / 2;
  var midY = canvas.height / 2;
  function particle() {
    this.position = {
      x: 40 + Math.random() * (canvas.width - 40),
      y: -(Math.random() * 50),
      z: Math.random() * 10,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.radius = particleSize;
    this.mass = particleSize;
    this.alpha = 1;
    this.length = 10;
    this.lineWidth = 1 - this.position.z / 12;
    this.acceleration = {
      x: 0,
      y: 1 - this.position.z / 7,
    };
  }

  function newParticle() {
    var curPart = new particle();
    particles.push(curPart);
  }

  function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
      var position = particles[i].position;
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.strokeStyle = "rgba(255,255,255," + particles[i].alpha + ")";
      ctx.lineWidth = particles[i].lineWidth;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x, position.y + particles[i].length);
      ctx.stroke();
    }
  }

  function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
      particles[i].velocity.x =
        particles[i].velocity.x + particles[i].acceleration.x;
      particles[i].velocity.y =
        particles[i].velocity.y + particles[i].acceleration.y;
      particles[i].position.x =
        particles[i].position.x + particles[i].velocity.x;
      particles[i].position.y =
        particles[i].position.y + particles[i].velocity.y;
      checkNextBoundaries(i, particles[i].position.y);
      if (particles[i]) {
        particles[i].length = particles[i].velocity.y * 1.8;
        //particles[i].lineWidth -= 0.2;
        var nextVy = particles[i].velocity.y + particles[i].acceleration.y;
        var nextPy = particles[i].position.y + particles[i].velocity.y;
        checkNextBoundaries(i, nextPy);
      }
    }
  }

  function checkNextBoundaries(i, nextPy) {
    // floor condition
    if (
      nextPy >=
      canvas.height * 0.9 - particles[i].position.z * 55 - particles[i].radius
    ) {
      particles[i].velocity.y *= -1;
      particles[i].velocity.y *= collisionDamper;
      particles[i].length = 3;
      if (particles[i].velocity.y >= -0.2 && particles[i].velocity.y <= 0.2) {
        particles[i].acceleration.y = 0;
        particles[i].velocity.y = 0;
        particles.splice(i, 1);
      }
    }

    // right wall condition
    if (
      particles[i] &&
      particles[i].position &&
      particles[i].position.x >= canvas.width - particles[i].radius
    ) {
      particles[i].velocity.x *= -1;
      particles[i].velocity.x *= collisionDamper;
    }

    // left wall condition
    if (
      particles[i] &&
      particles[i].position &&
      particles[i].position.x <= particles[i].radius
    ) {
      particles[i].velocity.x *= -1;
      particles[i].velocity.x *= collisionDamper;
    }
  }

  function checkCollision(i) {
    for (var ii = 0; ii < particles.length; ii++) {
      if (ii != i) {
        var result = circleCollision(particles[i], particles[ii]);
        if (result) {
          var newVelX1 =
            (particles[i].velocity.x *
              (particles[i].mass - particles[ii].mass) +
              2 * particles[ii].mass * particles[ii].velocity.x) /
            (particles[i].mass + particles[ii].mass);
          var newVelY1 =
            (particles[i].velocity.y *
              (particles[i].mass - particles[ii].mass) +
              2 * particles[ii].mass * particles[ii].velocity.y) /
            (particles[i].mass + particles[ii].mass);
          var newVelX2 =
            (particles[ii].velocity.x *
              (particles[ii].mass - particles[i].mass) +
              2 * particles[i].mass * particles[i].velocity.x) /
            (particles[i].mass + particles[ii].mass);
          var newVelY2 =
            (particles[ii].velocity.y *
              (particles[ii].mass - particles[i].mass) +
              2 * particles[i].mass * particles[i].velocity.y) /
            (particles[i].mass + particles[ii].mass);
          particles[i].velocity.x = newVelX1 * ballFriction;
          particles[i].velocity.y = newVelY1 * ballFriction;
          particles[ii].velocity.x = newVelX2 * ballFriction;
          particles[ii].velocity.y = newVelY2 * ballFriction;
        }
      }
    }
  }

  function circleCollision(c1, c2) {
    var dx = c1.position.x - c2.position.x;
    var dy = c1.position.y - c2.position.y;
    var dist = c1.radius + c2.radius;
    var result = dx * dx + dy * dy <= dist * dist;
    return result;
  }

  function loop() {
    currentTime = new Date().getTime();
    clear();
    update();
    draw();
    queue();
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    if (particles.length < maxParticles) {
      newParticle();
      newParticle();
      newParticle();
    }
    updateParticles();
  }

  function draw() {
    drawParticles();
  }

  function queue() {
    window.requestAnimationFrame(loop);
  }

  setTimeout(function () {
    startTime = new Date().getTime();
    loop();
  }, 100);
});
</script>

<style scoped lang="less">
.login_bg {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/login.webp") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .mask {
    width: 500px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    z-index: 2;
    margin: auto;
    backdrop-filter: blur(10px);

    .show {
      opacity: 0.7;
      margin: 0 10px;
      cursor: pointer;
      user-select: none;
      font-size: 14px;
      font-weight: bold;
      -webkit-font-smoothing: antialiased;
      color: #fff;
      background-color: #1c93e3;
      border-radius: 22px;
      overflow: hidden;
      display: inline-block;
      padding: 13px 24px;
      text-align: center;
      width: 120px;
      height: 20px;
      line-height: 20px;
      /* 仅大写 */
      text-transform: uppercase;
      background-image: linear-gradient(
        270deg,
        rgba(100, 181, 239, 0) 48.44%,
        #64b5ef 75.52%,
        rgba(100, 181, 239, 0) 100%
      );
      background-repeat: no-repeat;
      animation: bg-move linear 5s infinite;
    }
    .show:active {
      background-color: #1a8ad5;
    }

    @keyframes bg-move {
      from {
        background-position: -200px 0;
      }

      to {
        background-position: 1000px 0;
      }
    }
  }
  .left-box {
    position: absolute;
    inset: 0;
    zoom: 0.3;
  }
  .right-box {
    position: absolute;
    right: 0;
    top: 0;
    width: 110px;
    height: 110px;
  }
}
</style>
