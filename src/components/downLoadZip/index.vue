<template>
  <h2>批量下载图片为zip</h2>
  <el-button @click="downloadByZip">批量下载zip</el-button>
  <el-button
    @click="
      openImg(
        'https://img3.doubanio.com/f/sns/19886d443852bee48de2ed91f4a3bdfdaf8c809c/pics/nav/logo_db.png'
      )
    "
    >单张下载或打开图片 (同域下载、不同域浏览器打开)
  </el-button>
  <el-button
    @click="
      downloadImg(
        'https://img3.doubanio.com/f/sns/19886d443852bee48de2ed91f4a3bdfdaf8c809c/pics/nav/logo_db.png'
      )
    "
    >单张下载图片 (如果服务器没放开、会出现跨域问题)
  </el-button>
  <!-- https://ad-1300610317.file.myqcloud.com/image/1478987751902031873.jpg -->
  <div id="imgs">
    <img style="height: 100px; margin: 10px" src="../../assets/img/wx.jpg" />
    <img style="height: 100px; margin: 10px" src="../../assets/img/zfb.jpg" />
  </div>
</template>

<script setup>
import "/public/js/jszip.min.js";

const download = ["../../assets/img/wx.jpg", "../../assets/img/zfb.jpg"];
const downloadByZip = async () => {
  const zip = new JSZip();
  for (let i = 0; i < download.length; i++) {
    const blob = await getImgBlob(download[i]);
    console.log(blob);
    zip.file(`${i}.png`, blob, {
      base64: true,
    });
  }
  zip
    .generateAsync({
      type: "blob",
    })
    .then((content) => {
      console.log(content);
      location.href = URL.createObjectURL(content);
    });
};
const getImgBlob = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send();
  });
};

// 这种方式图片和项目地址不同域名会导致直接在浏览器中打开该图片、同域名则直接下载该图片
const openImg = (imageSrc) => {
  const a = document.createElement("a");
  const name = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  a.setAttribute("download", name);
  a.setAttribute("target", "_blank");
  a.setAttribute("href", imageSrc);
  a.click();
};

const downloadImg = (url) => {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "blob";
  xhr.onload = () => {
    openImg(URL.createObjectURL(xhr.response));
  };
  xhr.send();
};
</script>

<style scoped></style>
