<template>
  <div class="box" @mouseover="mouseoverClick" @mouseout="mouseoutClick">
    <div :class="['cola', isActive ? 'infoAnimation' : 'activeAnimation']">
      <img src="@/assets/img/body.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const isActive = ref(true);
const mouseoverClick = () => {
  isActive.value = !isActive.value;
};
const mouseoutClick = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped lang='less'>
@keyframes turnLeftBg {
  to {
    background-position: -537px 0px;
  }
}
@keyframes turnRightBg {
  to {
    background-position: 537px 0px;
  }
}
.box {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: #fff;
  .cola {
    width: 100px;
    height: 150px;
    background: url("~@/assets/img/bizhi.png") repeat-x;
    background-position: 0px 0px;

    img {
      width: 100px;
      height: 150px;
    }
  }
  .activeAnimation {
    animation: turnLeftBg 5s linear infinite;
  }
  .infoAnimation {
    animation: turnRightBg 5s linear infinite;
  }
}
</style>
