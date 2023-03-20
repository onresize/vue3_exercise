<template>
  <div class="demo">
    <div class="box">
      <div class="list green" id="one">1</div>
      <div class="list yellow" id="two">2</div>
      <div class="list red" id="three">3</div>
      <div class="list pink" id="four">4</div>
    </div>

    <div class="a_box">
      <a href="#one">1</a>
      <a href="#two">2</a>
      <a href="#three">3</a>
      <a href="#four">4</a>
    </div>
  </div>
</template>
 
<script setup>
import { ref, reactive } from 'vue'
</script>
 
<style scoped lang="less">
.demo {
  margin-top: 36px;
  padding-top: 20px;

  .box {
    width: 140px;
    height: 40px;
    border: 3px solid red;
    overflow-y: hidden;
    scroll-behavior: smooth;
    display: flex;
    flex-wrap: nowrap;

    .list {
      flex: 0 0 auto;
      width: 140px;
      height: 40px;
    }

    .green {
      background-color: green
    }

    .yellow {
      background-color: yellow
    }

    .red {
      background-color: red
    }

    .pink {
      background-color: pink
    }
  }

  .a_box {
    width: 30px;
    height: 130px;
    border: 3px solid black;

    a {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #ccc;
      background: #f7f7f7;
      color: #333;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      margin: 5px;
    }
  }
}
</style>