<template>
  <div class="login_bg">
    <canvas id="canvasID" width="100%" height="100%"> </canvas>
    <div class="mask">
      <loginAvatarCom ref="avatarRef"></loginAvatarCom>
      <img v-show="state.isLoading" :class="['login_avatar', state.isLoading ? 'loadingAni' : '']" src="@/assets/img/rotate.png" alt="" />
      <div>
        <div class="show" @click="toPage('admin')">admin用户</div>
        <div class="show" @click="toPage('ordinary')">普通用户</div>
      </div>
      <div class="fgx">
        <div class="xian"></div>
        <div class="txt">快捷登录</div>
        <div class="xian"></div>
      </div>
      <!-- 快捷登录 -->
      <div class="kj_dl">
        <svg-icon name="gitee" class="ico1" @click.once="AuthLogin('gitee')" />
        <svg-icon name="wangyiyun" class="ico1" @click="AuthLogin('163')" />
        <!-- <svg-icon name="qq" class="ico2" />
        <svg-icon name="coding" class="ico2" />
        <svg-icon name="weibo" class="ico2" /> -->
      </div>
    </div>
    <div class="left-box">
      <payCom style="payBox"></payCom>
    </div>
    <div class="right-box">
      <a href="https://gitee.com/Embrance-T/vue3_exercise"><img src="https://gitee.com/Embrance-T/vue3_exercise/widgets/widget_1.svg" alt="Fork me on Gitee" /></a>
    </div>

    <!-- 网易云扫码登录弹窗 -->
    <div class="mask_box" v-show="state.isShow163Dialog">
      <div class="sm_login_box">
        <div class="top_box">
          <div class="left_txt">登录</div>
          <div class="close" @click.stop="closeDialog">
            <svg-icon name="close" />
          </div>
        </div>
        <div class="center_box">
          <div class="left_img"><img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" /></div>
          <div class="right_box">
            <h3>扫码登录</h3>
            <div class="qr_code">
              <qrcode-vue :value="state.qrCodeUrl" :size="148"></qrcode-vue>
            </div>
            <p class="bottom_line">
              使用&nbsp;<a
                href="https://music.163.com/#/download"
                rel="noopener noreferrer"
                target="_blank"
                data-log='{"oid":"btn_web_music_download","isPage":false,"events":["_ec"]}'
                >网易云音乐APP</a
              >&nbsp;扫码登录
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicFunc from "@/mixins/publicFunc";

export default {
  mixins: [publicFunc],
};
</script>

<script setup>
import { ref, reactive, watch, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import QrcodeVue from "qrcode.vue";
import { cloneDeep } from "lodash";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/pinia.ts";
import { loginBroadcast } from "@/utils/broadcast";
import { getTimeState } from "@/utils/tools.js";
import { giteeLoginApi, giteeAuthApi, qrCodeLoginKey, qrCodeLoginImg, qrCodeLoginCheck } from "@/api/authLogin.js";
import payCom from "@/myCom/payCom/index.vue";
import loginAvatarCom from "@/myCom/loginAvatarCom/index.vue";

const Router = useRouter();
const store = useMainStore();
const { loginInfo } = storeToRefs(store);
const { appContext, proxy } = getCurrentInstance();

const avatarRef = ref(null);

const state = reactive({
  isShow163Dialog: false,
  qrCodeUrl: "",
  isLoading: false,
  storageKey: "",
  isCall: false,
  ApiFunc: "",
});

const closeDialog = () => {
  state.isShow163Dialog = false;
};

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
  ElNotification({
    title: getTimeState(),
    message: "欢迎登录 vue3_exercise",
    type: "success",
    duration: 3000,
  });
  loginBroadcast.postMessage("true");
};

// gitee第三方登录授权
const AuthLogin = async (str) => {
  switch (str) {
    case "gitee":
      proxy.OpenWindow(
        "https://gitee.com/oauth/authorize?client_id=9b6db952f18a91f9cb551f1da7c4d51c43e8a37c7f0172ba1c82f80bd51ed7c0&redirect_uri=http://127.0.0.1:3077/welcome&response_type=code",
        1200,
        750
      );
      break;
    case "163":
      sm163Login();
      break;
    default:
      break;
  }
};

const sm163Login = async () => {
  state.isShow163Dialog = true;
  // 调第一个接口拿key
  const [err, { data }] = await qrCodeLoginKey(Date.now());
  let key = data?.unikey;

  // 调第二个接口拿二维码图片
  const [_, { data: res }] = await qrCodeLoginImg(key);
  console.log("二维码地址：", res.qrurl);
  state.qrCodeUrl = res.qrurl;

  let check = setInterval(async () => {
    const [error, result] = await qrCodeLoginCheck(key, Date.now());
    console.log("轮询检测扫码状态:", result);
    await proxy.sleepFunc(1000);
    // 授权中....
    if (result.code == "802") {
      store.changeLoginInfo(result);
    }
    // 授权成功
    if (result.code == "803") {
      state.isShow163Dialog = false;
      clearTimeout(check);
      window.localStorage.setItem("user", "Admin");
      store.changeIsLogin163(true);
      await Router.push({ path: "/welcome" });
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录 vue3_exercise",
        type: "success",
        duration: 3000,
      });
      state.isLoading = false;
      loginBroadcast.postMessage("true");
    }
  }, 3000);
};

const AuthFunc = async (code) => {
  // 只执行一次
  state.isCall = true;
  let ApiFunc = state.ApiFunc;
  const [_, data] = await ApiFunc({
    code,
  });
  state.isLoading = true;
  const [err, res] = await giteeAuthApi({
    access_token: data?.access_token,
  });
  // console.log('第三方登录:', res)
  if (res?.id) {
    store.changeLoginInfo(res);
    window.localStorage.setItem("user", "Admin");
    await Router.push({ path: "/welcome" });
    ElNotification({
      title: getTimeState(),
      message: "欢迎登录 vue3_exercise",
      type: "success",
      duration: 3000,
    });
    state.isLoading = false;
    loginBroadcast.postMessage("true");
  } else {
    ElNotification({
      title: "",
      message: "出错了",
      type: "error",
      duration: 3000,
    });
  }
};

//XXX 优雅监听storage参考：https://blog.csdn.net/lambert00001/article/details/131031870
// 监听gitee登录的弹窗传递的storage参数
window.addEventListener(
  "storage",
  (e) => {
    let key = window.localStorage.key(0);
    if (key == "giteeMsg") {
      state.storageKey = JSON.parse(window.localStorage.getItem(key));
    }
  },
  false
);

watch(
  () => cloneDeep(state.storageKey.code),
  (newVal, oldVal) => {
    if (newVal == oldVal) return;
    console.log("父窗口监听消息：", newVal);
    let actions = new Map([["gitee", giteeLoginApi]]);
    state.ApiFunc = actions.get("gitee");
    !state.isCall && AuthFunc(newVal);
  },
  {
    deep: true,
  }
);

// 下雨canvas
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
      particles[i].velocity.x = particles[i].velocity.x + particles[i].acceleration.x;
      particles[i].velocity.y = particles[i].velocity.y + particles[i].acceleration.y;
      particles[i].position.x = particles[i].position.x + particles[i].velocity.x;
      particles[i].position.y = particles[i].position.y + particles[i].velocity.y;
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
    if (nextPy >= canvas.height * 0.9 - particles[i].position.z * 55 - particles[i].radius) {
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
    if (particles[i] && particles[i].position && particles[i].position.x >= canvas.width - particles[i].radius) {
      particles[i].velocity.x *= -1;
      particles[i].velocity.x *= collisionDamper;
    }

    // left wall condition
    if (particles[i] && particles[i].position && particles[i].position.x <= particles[i].radius) {
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
            (particles[i].velocity.x * (particles[i].mass - particles[ii].mass) + 2 * particles[ii].mass * particles[ii].velocity.x) / (particles[i].mass + particles[ii].mass);
          var newVelY1 =
            (particles[i].velocity.y * (particles[i].mass - particles[ii].mass) + 2 * particles[ii].mass * particles[ii].velocity.y) / (particles[i].mass + particles[ii].mass);
          var newVelX2 =
            (particles[ii].velocity.x * (particles[ii].mass - particles[i].mass) + 2 * particles[i].mass * particles[i].velocity.x) / (particles[i].mass + particles[ii].mass);
          var newVelY2 =
            (particles[ii].velocity.y * (particles[ii].mass - particles[i].mass) + 2 * particles[i].mass * particles[i].velocity.y) / (particles[i].mass + particles[ii].mass);
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
// 定义外部光环旋转动画
@keyframes externalHalo {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.login_bg {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/img/login.webp") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  position: fixed;

  .mask {
    width: 600px;
    height: 410px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    inset: 0;
    z-index: 2;
    margin: auto;
    backdrop-filter: blur(10px);

    .login_avatar {
      width: 200px;
      position: absolute;
      z-index: -1;
      left: calc(50% - 100px);
      top: 8px;
      box-sizing: border-box;
      background: url("@/assets/img/rotate.png") no-repeat center;
      background-size: 100% 100%;
    }

    .loadingAni {
      animation: externalHalo 3s linear infinite;
    }

    .fgx {
      width: 100%;
      height: 24px;
      line-height: 24px;
      margin: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .xian {
        box-sizing: border-box;
        margin: 0;
        min-width: 0;
        border-top: 1px solid;
        border-color: #999999;
        width: 124px;
      }

      .txt {
        margin: 0 16px;
        box-sizing: border-box;
        min-width: 0;
        color: #999999;
        font-size: 13px;
        overflow: hidden;
        line-height: 17px;
        white-space: nowrap;
      }
    }

    .kj_dl {
      width: 100%;
      height: 70px;
      line-height: 70px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;

      .ico1 {
        font-size: 32px;
        margin: 0 20px;
        cursor: pointer;
        border-radius: 50%;
        padding: 10px;

        &:hover {
          background: hsla(210, 7%, 53%, 0.1);
        }
      }

      .ico2 {
        font-size: 35px;
        margin: 0 20px;
        cursor: not-allowed;
        border-radius: 50%;
        padding: 10px;

        // &:hover {
        //   background: hsla(210, 7%, 53%, .1);
        // }
      }
    }

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
      background-image: linear-gradient(270deg, rgba(100, 181, 239, 0) 48.44%, #64b5ef 75.52%, rgba(100, 181, 239, 0) 100%);
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

  @keyframes scaleBox {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  .mask_box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
    inset: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.35);

    .sm_login_box {
      user-select: none;
      width: 598px;
      height: 398px;
      border-radius: 25px 25px 15px 15px;
      background-color: #fff;
      position: absolute;
      inset: 0;
      margin: auto;
      z-index: 2;
      animation: scaleBox 0.3s ease-in;

      .top_box {
        position: relative;
        margin: 0;
        padding: 0 5px 0 18px;
        height: 38px;
        line-height: 38px;
        z-index: 10;
        border-bottom: 1px solid #191919;
        border-radius: 15px 15px 0 0;
        background: #2d2d2d;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .close {
          font-size: 22px;
          width: 32px;
          height: 32px;
          display: grid;
          place-content: center;
          cursor: pointer;
        }
      }

      .center_box {
        width: 100%;
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;

        .left_img {
          width: 142px;
          height: 250px;
          margin-right: 20px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .right_box {
          width: 220px;
          height: 250px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;

          h3 {
            font-size: 18px;
            font-weight: 500;
          }

          qr_code {
            width: 148px;
            height: 148px;
            border: 3px solid red;
          }

          .bottom_line {
            a {
              text-decoration: none;
              color: #0c73c2;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1200px) {
  .left-box,
  .right-box {
    display: none !important;
  }
}
</style>
