<template>
  <div class="mixinHeight">
    <h2>测试实现移动端拍照、base64预览(上传图片转成base64)</h2>
    <!-- XXX1 -->
    <input type="file" ref="fileIpRef" accept="image/*" capture="camera" placeholder="移动端可调起相机" @change="methods.photograph()" />
    <p></p>
    <img :src="state.base64ImgData" alt />
    <p></p>

    <!-- XXX2 -->
    <input type="file" @change="methods.handleFile" />
    <p></p>
    <img :src="state.base64ImgData1" alt />
    <p></p>

    <!-- XXX3 -->
    <input type="input" @input="methods.urlToBase64" placeholder="输入图片外链地址" />&nbsp;
    <button @click="methods.toBase64">转换base64</button>
    <p></p>
    <img :src="state.base64ImgData2" alt />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import _ from "lodash";

const fileIpRef = ref();
const httpsImg = ref(null);
const state = reactive({
  fileName: "",
  base64ImgData: "",
  base64ImgData1: "",
  base64ImgData2: "",
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
    return new Promise((resolve) => (reader.onload = () => resolve(reader.result)));
  },
  handleFile(e) {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (r) => {
      console.log("另一种写法获取base64:", r.target.result);
      state.base64ImgData1 = r.target.result;
    };
    //转 失败
    reader.onerror = function (error) {
      reject(error);
    };
    //转 结束  resolve 出去
    reader.onloadend = function () {
      resolve(fileResult);
    };
  },
  sendRes(url) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        // 将图片插入画布并开始绘制
        canvas.getContext("2d").drawImage(image, 0, 0);
        let result = canvas.toDataURL("image/png");
        resolve(result);
      };
      // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
      image.setAttribute("crossOrigin", "Anonymous");
      image.src = url;
      // 图片加载失败的错误处理
      image.onerror = () => {
        reject(new Error("urlToBase64 error"));
      };
    });
  },
  urlToBase64: _.debounce((e) => {
    httpsImg.value = e.target.value;
    console.log(e.target.value);
  }, 300),
  toBase64() {
    methods.sendRes(httpsImg.value).then((res) => {
      state.base64ImgData2 = res;
      console.log("https图片转换base64:", res);
    });
  },
  // base64转成blob
  base64ToBlob({ b64data = "", contentType = "", sliceSize = 512 } = {}) {
    return new Promise((resolve, reject) => {
      // 使用 atob() 方法将数据解码
      let byteCharacters = atob(b64data);
      let byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
          byteNumbers.push(slice.charCodeAt(i));
        }
        // 8 位无符号整数值的类型化数组。内容将初始化为 0。
        // 如果无法分配请求数目的字节，则将引发异常。
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      let result = new Blob(byteArrays, {
        type: contentType,
      });
      result = Object.assign(result, {
        // 这里一定要处理一下 URL.createObjectURL
        preview: URL.createObjectURL(result),
        name: `XXX.png`,
      });
      resolve(result);
    });
  },
});

let base64 = `dasgkdgasjkdgaksgduiasgudgasudguo`.split(",")[1];
methods.base64ToBlob({ b64data: base64, contentType: "image/png" }).then((res) => {
  // 转后后的blob对象
  console.log("blob", res);
});
</script>

<style scoped></style>
