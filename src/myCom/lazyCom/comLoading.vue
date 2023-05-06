<template>
  <div class="card">
    <div class="top skeleton"></div>
    <div class="bottom skeleton"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped lang="less">
.card {
  width: 230px;
  height: 300px;
  border-radius: 25px;
  position: relative;

  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
}

.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70%;
  background: #e2e5e7;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
}

.bottom {
  position: absolute;
  top: 77%;
  left: 0;
  width: 100%;
  height: 70px;
  border-radius: 0 0 25px 25px;
  background: #e2e5e7;
  box-sizing: border-box;
}

.skeleton {
  background-image: linear-gradient(
    45deg,
    #e6e6e6 0%,
    #e6e6e6 40%,
    #f7f7f7 50%,
    #f7f7f7 55%,
    #e6e6e6 66%,
    #e6e6e6 100%
  );
  background-size: 400%;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  from {
    background-position: 100%;
  }

  to {
    background-position: 0;
  }
}
</style>
