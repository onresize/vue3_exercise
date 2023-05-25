<template>
  <div class="demo">
    <div class="box">
      <div class="list"><input id="oneID" readonly />11</div>
      <div class="list bg-blue"><input id="twoID" readonly />22</div>
      <div class="list bg-olive"><input id="threeID" readonly />33</div>
      <div class="list bg-orange"><input id="fourID" readonly />44</div>
    </div>
    <div>
      <label class="click" for="oneID">1</label>
      <label class="click" for="twoID">2</label>
      <label class="click" for="threeID">3</label>
      <label class="click" for="fourID">4</label>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped>
.demo {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
.box {
  width: 20em;
  height: 10em;
  line-height: 10em;
  scroll-behavior: smooth;
  overflow: hidden;
  margin: auto;
}
.list {
  height: 100%;
  background: #ddd;
  text-align: center;
  position: relative;
  font-size: 8em;
}
.list > input {
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  border: 0;
  padding: 0;
  margin: 0;
  clip: rect(0 0 0 0);
}

.click {
  user-select: none;
  display: inline-block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  border: 1px solid #ccc;
  background: #f7f7f7;
  color: #333;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin: 0.5em;
}

.bg-orange {
  background-color: #fccba2;
}

.bg-olive {
  background-color: #b9f2d8;
}

.bg-blue {
  background-color: #89c6fc;
}
</style>
