<template>
  <div>
    <h3>
      <el-tag type="warning">场景二</el-tag>
      使用webWorker压缩100张图片
      <el-link
        href="https://blog.csdn.net/weixin_44240581/article/details/129186915"
        target="_bank"
      >
        参考
      </el-link>

      <el-button @click="useWorkers" class="btn" :loading="btnLoading"
        >多线程worker压缩</el-button
      >
    </h3>
  </div>
</template>

<script setup>
import { ref } from "vue";

let btnLoading = ref(false);

const useWorkers = async () => {
  btnLoading.value = true;
  console.time(`多线程worker压缩`);

  let promiseList = [];

  for (let i = 1; i <= 5; i++) {
    let blobImgs = [];
    for (let i = 0; i < 20; i++) {
      blobImgs.push(
        await fetch(new URL("@/assets/img/4.jpg", import.meta.url)).then(
          (res) => res.blob()
        )
      );
    }

    const promise = new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const offscreenCanvas = canvas.transferControlToOffscreen();

      const worker = new Worker("/js/comBworker.js");
      worker.onmessage = (event) => {
        resolve(event.data);

        worker.terminate(); // 卸载worker
      };

      worker.postMessage(
        {
          command: "compress",
          blobImgs,
          canvas: offscreenCanvas,
        },
        [offscreenCanvas]
      );
    });

    promiseList.push(promise);
  }

  await Promise.all(promiseList);
  console.timeEnd(`多线程worker压缩`);

  btnLoading.value = false;
  ElMessage({
    message: "多线程worker压缩成功",
    type: "success",
  });
};
</script>

<style scoped lang='less'>
.btn {
  margin: 0 10px;
}
</style>
