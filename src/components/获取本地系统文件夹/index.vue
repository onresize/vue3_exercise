<template>
  <div>
    <h2>获取本地文件夹API: window.showDirectoryPicker()</h2>
    <h3>应用场景：上传文件、本地文件管理、编辑器功能</h3>
    <el-button @click="pickDirectory">获取文件夹</el-button>
  </div>
  <br />
  <hr />
  <h4>设置背景边距20px、默认是left、（top、right、bottom）</h4>
  <strong>
    <pre>background: url(https://xxx.png) no-repeat right 20px center;</pre>
  </strong>
  <strong>
    <pre>
let { x, y, left, top } = document.querySelector(".pic").getBoundingClientRect(); // 获取元素位置</pre>
  </strong>
  <div class="pic"></div>

  <br />
  <hr />
  <!--参考：img属性: srcset、sizes不生效原因： https://blog.csdn.net/z1844306480/article/details/114154889 -->
  <h4>img属性: srcset、sizes</h4>
  <section>
    <h4>响应式图片加超链接</h4>
    <a href="https://www.bilibili.com" target="_bank">
      <picture>
        <source media="(max-width: 500px)" srcset="@/assets/img/1.webp" />
        <source media="(max-width: 700px)" srcset="@/assets/img/2.webp" />
        <source media="(max-width: 900px)" srcset="@/assets/img/3.webp" />
        <source media="(max-width: 1000px)" srcset="@/assets/img/4.webp" />

        <img srcset="@/assets/img/5.webp" alt="#" decoding="async" loading="eager" width="150" height="150" />
      </picture>
    </a>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const pickDirectory = async () => {
  const directoryHandle = await window.showDirectoryPicker();
  console.log("获取本地文件夹：", directoryHandle);
};

onMounted(() => {
  let { x, y, left, top } = document
    .querySelector(".pic")
    .getBoundingClientRect();
  console.log("x:", x, "y:", y, "left:", left, "top:", top);
});
</script>

<style scoped lang='less'>
.pic {
  width: 100px;
  height: 100px;
  border: 3px solid red;
  box-sizing: border-box;
  // 设置背景边距20px、默认是left、（top、right、bottom）
  background: url("https://img0.baidu.com/it/u=1217304799,3113310756&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683997200&t=99e50a2df4007441cda22e8e59171b22") no-repeat top 20px center;
  background-size: 100% 100%;
}

img {}
</style>
