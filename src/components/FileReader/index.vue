<template>
  <div>
    <h2>测试实现移动端拍照、base64预览(上传图片转成base64)</h2>
    <input
      type="file"
      ref="fileIpRef"
      accept="image/*"
      capture="camera"
      placeholder="移动端可调起相机"
      @change="methods.photograph()"
    />
    <p></p>
    <img :src="state.base64ImgData" alt />
    <p></p>

    <input type="file" @change="methods.handleFile" />
    <p></p>
    <img :src="state.base64ImgData1" alt />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const fileIpRef = ref();
const state = reactive({
  fileName: "",
  base64ImgData: "",
  base64ImgData1: "",
});
const methods = reactive({
  async photograph() {
    state.fileName = fileIpRef.value.files[0].name;
    state.base64ImgData = await methods.fileReader(fileIpRef.value.files[0]);
    console.log("获取到base64：", state.base64ImgData);
  },
  fileReader(FileInfo) {
    // FileReader 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    let reader = new FileReader();
    // readAsDataURL 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
    reader.readAsDataURL(FileInfo);
    return new Promise(
      (resolve) => (reader.onload = () => resolve(reader.result))
    );
  },
  handleFile(e) {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (r) => {
      console.log('另一种写法获取base64:',r.target.result);
      state.base64ImgData1 = r.target.result;
    };
  },
});
</script>

<style scoped></style>
