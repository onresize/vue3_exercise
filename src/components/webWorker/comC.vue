<template>
  <div>
    <h3>
      <el-tag type="warning">场景三</el-tag>
      使用webWorker处理上传测试
    </h3>
    <el-upload
      class="upload-demo"
      drag
      action=""
      multiple
      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script setup>
let CHUNK_SIZE = 0.1 * 1024 * 1024;
let Chunks = [];
let File = "";

const beforeUpload = (file) => {
  console.log("11111111111111111111");
  File = file;
};

//切割文件
const createFileChunck = (file, size = CHUNK_SIZE) => {
  console.log("222222222222222222222222222");
  let chunks = [],
    cur = 0;
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) });
    cur += size;
  }
  return chunks;
};

// webWorker 计算hash
const calculateHashWorker = () => {
  console.log("33333333333333333333333");
  return new Promise((resolve) => {
    const workerC = new Worker("/js/comCworker.js");
    workerC.postMessage({ chunks: Chunks });
    workerC.onmessage = (e) => {
      const { hash } = e.data;
      console.log("主线程接收：", hash);
      if (hash) {
        resolve(hash);
        workerC.terminate(); // 关闭线程;
      }
    };
  });
};

const httpRequest = async () => {
  console.log("4444444444444444444");
  // 计算hash
  Chunks = createFileChunck(File);
  const hash = await calculateHashWorker();
  console.log("文件hash", hash);
};
</script>

<style scoped lang='less'>
</style>
