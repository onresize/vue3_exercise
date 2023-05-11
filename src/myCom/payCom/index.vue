<template>
  <div :class="['bottom_box']">
    <div
      class="card"
      @mouseover="(e) => $D(mouseoverClick, 500, e)"
      @mouseleave="(e) => $D(mouseleaveClick, 500, e)"
    >
      <div :class="['content', isTurn ? 'turnActive' : '']">
        <div class="front">
          <h3 class="title linear colorful">请作者喝杯冰阔落🍻</h3>
          <h3 class="title-pay">
            使用微信支付 <span>鼠标悬停使用支付宝支付</span>
          </h3>
          <img
            class="subtitle-img"
            src="@/assets/img/wx.jpg"
            alt=""
            srcset=""
          />
        </div>

        <div class="back">
          <h3 class="title">请作者喝杯咖啡☕️</h3>
          <h3 class="title-pay">
            使用支付宝支付 <span>移开鼠标使用微信支付</span>
          </h3>
          <img
            class="subtitle-img"
            src="@/assets/img/zfb.jpg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const isTurn = ref(true);

const mouseoverClick = () => {
  console.log("鼠标移入");
  isTurn.value = false;
};
const mouseleaveClick = () => {
  console.log("鼠标移出");
  isTurn.value = true;
};
</script>

<style scoped lang='less'>
.bottom_box {
  animation-name: rightToLeft;
  animation-duration: 1s;
  position: absolute;
  transition: all 1s linear;
  &:hover {
    transform: scale(2) translate(25%, 26%);
  }

  @keyframes rightToLeft {
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(0);
    }
  }

  .card {
    margin-top: 10px;
    width: 39vw;
    height: 39vh;
    max-width: 450px;
    cursor: pointer;
  }

  .content {
    border-radius: 10px;
    text-align: center;
    position: relative;
    transition: all 2.25s;
    background-color: #00c250;
    padding: 5em;
    transform-style: preserve-3d;
    height: 100%;
    margin-left: 15px;
  }

  // .card:hover .content {
  //   transform: rotateY(2.5turn);
  // }

  .front,
  .back {
    border-radius: 10px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1em;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .title {
    transform: translateZ(5rem);
    font-size: 1.7rem;
  }
  .subtitle-img {
    transform: translateZ(2rem);
    margin-top: 15px;
    border-radius: 10px;
    width: 18vw;
    max-width: 360px;
    height: 28vh;
    max-height: 380px;
  }
  .subtitle {
    transform: translateZ(2rem);
  }

  .back {
    transform: rotateY(0.5turn);
    background-color: #1677ff;
  }

  .title-pay {
    transform: translateZ(3rem);
  }
  .title-pay span {
    transform: translateZ(3rem);
    font-size: 0.7em;
  }
}
.turnActive {
  animation: turn25 60s 1.2s linear infinite;
  @keyframes turn25 {
    0% {
      transform: rotateY(25turn);
    }
  }
}
.flex {
  border: 3px solid transparent;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #333 inset;
  padding: 10px 0 5px 0;
  overflow: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: calc(100vw - 400px);
  height: 220px;
  animation-name: leftToRight;
  animation-duration: 1s;
  position: absolute;
  top: 200px;
  left: 40px;

  @keyframes leftToRight {
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(0);
    }
  }

  .tag {
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    margin: 3px;
    text-shadow: 0 0 0.1rem #00c6ff, 0 0 0.2rem #00c6ff, 0 0 0.3rem #00c6ff,
      0 0 0.4rem #00c6ff;
  }
}
.infoZIndex {
  z-index: 1;
}
.beforeZIndex {
  z-index: -1;
}

@property --offset {
  syntax: "<length>";
  inherits: false;
  initial-value: 5px;
}

@property --deg {
  syntax: "<angle>";
  inherits: false;
  initial-value: 1deg;
}

.linear {
  color: #000;
  cursor: pointer;
}

.linear {
  color: transparent;
  background: repeating-radial-gradient(
    circle at 0 0,
    #000 calc(var(--offset) - 5px),
    #000 var(--offset),
    #fff var(--offset),
    #fff calc(var(--offset) + 5px)
  );
  -webkit-background-clip: text;
  animation: move 0.5s infinite linear;
}

.colorful {
  background-image: linear-gradient(
      var(--deg),
      red,
      orange,
      yellow,
      green,
      cyan,
      blue,
      darkviolet
    ),
    repeating-radial-gradient(
      circle at 0 0,
      #000 calc(var(--offset) - 5px),
      #000 var(--offset),
      #fff var(--offset),
      #fff calc(var(--offset) + 5px)
    );
  background-blend-mode: screen;
  animation: move 0.5s infinite linear, rotate 20s infinite linear;
}

@keyframes move {
  to {
    --offset: 15px;
  }
}

@keyframes rotate {
  to {
    --deg: 361deg;
  }
}
</style>
