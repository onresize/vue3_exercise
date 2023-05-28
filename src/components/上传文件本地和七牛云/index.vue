<template>
  <div>
    <el-card>
      <el-tag color="#ffcc99">上传到七牛云</el-tag>
      <el-upload class="avatar-uploader" :action="state.domain" :http-request="upLoadQny" :show-file-list="false"
        :before-upload="beforeUpload">
        <div class="center_box">
          <div v-if="state.imageUrl" class="avatar_box">
            <img :src="state.imageUrl" class="headerPic" />
            <div class="mask" @click.stop.prevent>
              <el-icon class="ico" :size="20" @click.stop.prevent="preview">
                <svg-icon name="zoom"></svg-icon>
              </el-icon>
              <el-icon class="ico" :size="20" @click.stop.prevent="Download">
                <svg-icon name="download"></svg-icon>
              </el-icon>
              <el-icon class="ico" :size="20" @click.stop.prevent="Delete">
                <svg-icon name="del"></svg-icon>
              </el-icon>
            </div>
          </div>
          <el-icon v-else-if="!state.imageUrl && !state.percentValue" class="box" :size="20">
            <Plus />
          </el-icon>
          <el-progress v-else type="circle" class="box" :percentage="state.percentValue" :color="state.colors"
            :show-text="true" />
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { awaitTo } from "@/utils/awaitTo.js";
import { server } from "@/utils/request.js";
import * as objApi from "@/api/welcome.js";

const { getQNYToken } = objApi.default;
const state = reactive({
  domain: "http://upload.qiniup.com",
  // imageUrl: 'http://rvcvwrkd1.hd-bkt.clouddn.com/FmHvLBkJ69HjQ8vQtoJhSUvZhZkG',
  imageUrl: '',
  percentValue: 0,
  colors: [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
  ],
  imgType: ''
});


const beforeUpload = (file) => {
  console.log('上传之前：', file)
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isJPG) {
    ElMessage({
      message: "上传头像图片只能是 JPG、png 格式!",
      type: "error",
    });
  }
  if (!isLt5M) {
    ElMessage({
      message: "上传图片大小不能超过 5MB!",
      type: "error",
    });
  }
  return isJPG && isLt5M;
};

// 上传七牛云文件
const postQNYFile = (data) => {
  return awaitTo(
    server({
      url: "/BaseApi",
      method: "POST",
      data,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (ProgressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        // 这里因为在点击上传按钮之前图片就已经自动上传了，所以 loaded 和 total 是一样大小
        state.percentValue = ~~(ProgressEvent.loaded / ProgressEvent.total * 100)
        console.log(state.percentValue)
      }
    })
  );
}

const upLoadQny = async ({ file }) => {
  if (file.type == 'image/png') {
    state.imgType = 'png'
  }
  if (file.type == 'image/jpeg') {
    state.imgType = 'jpg'
  }
  const [err, token] = await getQNYToken();
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  console.log("获取七牛云上传token:", token, file);

  const [error, res] = await postQNYFile(formData)
  if (res) {
    state.percentValue = 0
    state.imageUrl = `http://rvcvwrkd1.hd-bkt.clouddn.com/${res?.key}`
    ElNotification({
      title: '上传七牛云',
      message: '成功',
      type: "success",
      duration: 3000,
    });
    console.log('上传结果', state.imageUrl)
  } else {
    ElNotification({
      title: '上传七牛云',
      message: error,
      type: "error",
      duration: 3000,
    });
  }
};



const preview = () => {
  console.log('preview')
}
const Download = () => {
  console.log('Download')
  let eleLink = document.createElement('a')
  let blob = new Blob([state.imageUrl])
  let url = window.URL.createObjectURL(blob)
  eleLink.href = url
  eleLink.download = Date.now() + '.' + state.imgType
  eleLink.click();
  // 然后移除
  window.URL.revokeObjectURL(url)
}
const Delete = () => {
  console.log('Delete')
  state.imageUrl = ''
  state.imgType = ''
}
</script>

<style scoped lang="less">
.el-tag {
  margin: 0 0 10px 0;
}

.avatar-uploader {
  width: 100%;
  height: 100%;

  .center_box {
    width: 100%;
    height: 100%;

    .avatar_box {
      position: relative;
      display: flex;

      .headerPic {
        width: 200px;
        height: 200px;
        display: grid;
        place-content: center;
        border-radius: 8px;
        object-fit: cover;
        border: 2px dashed gray;

      }

      .mask {
        position: absolute;
        margin: auto;
        width: 200px;
        height: 200px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 200px;
        border: 4px solid #eee;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: all 0.33 ease-out;
        user-select: none;
        cursor: default;

        .ico {
          margin: 0 5px;
          cursor: pointer;
        }
      }

      &:hover>.mask {
        opacity: 1;
      }
    }

    .box {
      width: 200px;
      height: 200px;
      display: grid;
      place-content: center;
      border-radius: 8px;
      object-fit: cover;
      border: 2px dashed gray;
    }

  }
}
</style>
