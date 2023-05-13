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
  <div class="pic"></div>

  <br />
  <hr />
  <h4>img属性: srcset、sizes</h4>
  <section>
    <h4>图片加超链接</h4>
    <a href="https://www.bilibili.com" target="_bank">
      <img
        srcset="
          @/assets/img/404.webp 200w,
          @/assets/img/2.webp 300w,
          @/assets/img/3.webp 500w,
          @/assets/img/4.webp 600w,
          @/assets/img/5.webp 800w
        "
        alt="#"
        decoding="async"
        loading="eager"
        width="150"
        height="150"
      />
      <!-- sizes="(max-width: 320px) 300w, 1000w" -->
    </a>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const pickDirectory = async () => {
  const directoryHandle = await window.showDirectoryPicker();
  console.log("获取本地文件夹：", directoryHandle);
};

const img1 = ref(
  "https://img0.baidu.com/it/u=1217304799,3113310756&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683997200&t=99e50a2df4007441cda22e8e59171b22"
);
const img2 = ref(
  "https://img0.baidu.com/it/u=253042110,3732757332&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683997200&t=bca4a7c497aff15c443483bbe451dd6d"
);
const img3 = ref(
  "https://img1.baidu.com/it/u=3929149648,3341190107&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
);
</script>

<style scoped lang='less'>
.pic {
  width: 100px;
  height: 100px;
  border: 3px solid red;
  box-sizing: border-box;
  // 设置背景边距20px、默认是left、（top、right、bottom）
  background: url("https://img0.baidu.com/it/u=1217304799,3113310756&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683997200&t=99e50a2df4007441cda22e8e59171b22")
    no-repeat top 20px center;
  background-size: 100% 100%;
}
img {
}
</style>
