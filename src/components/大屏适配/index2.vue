<template>
  <div>
    <VScaleScreen>
      <!-- <img
        src="https://images.gitee.com/uploads/images/2019/1226/025508_8a651c15_2327318.png"
        alt=""
      /> -->
      <div className="screen-wrapper">
        <div className="screen" id="screen">
          <div className="demo-root">
            <header>头部</header>
            <main>
              <div className="demo-left"></div>
              <div className="demo-center"></div>
              <div className="demo-right"></div>
            </main>
            <footer>底部</footer>
          </div>
        </div>
      </div>
    </VScaleScreen>
  </div>
</template>

<script setup>
import VScaleScreen from "./package";
</script>

<style scoped lang="less">
.screen-wrapper {
  width: 100vw;
  height: 100vh;
  .screen {
    display: inline-block;
    width: 1920px;
    height: 1080px;
    // width: 3840px;
    // height: 2160px;
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .demo-root {
      header {
        width: 1920px;
        height: 200px;
        background: rgba(53, 150, 206, 0.3);
        font-size: 40px;
        text-align: center;
        line-height: 200px;
      }
      main {
        display: flex;
        height: 660px;
        div {
          width: 640px;
          height: 100%;
        }
        .demo-left {
          background: rgba(206, 52, 154, 0.3);
        }
        .demo-center {
          background: rgba(13, 30, 179, 0.3);
        }
        .demo-right {
          background: rgba(64, 163, 6, 0.849);
        }
      }
      footer {
        width: 100%;
        height: 220px;
        font-size: 40px;
        text-align: center;
        line-height: 100px;
        background: rgba(19, 211, 115, 0.3);
      }
    }
  }
}
</style>
