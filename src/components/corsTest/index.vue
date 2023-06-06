<template>
  <el-card>
    <h3>跨域请求如何携带cookie</h3>
    <el-button type="primary" @click="homoFetch">发送同源请求</el-button>
    <el-button type="primary" @click="corseFetch">发送跨域请求</el-button>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const Login = async () => {
  const res = await axios({ url: `http://localhost:5000/login?${Date.now()}`, params: {} });
  console.log("/login:", res.data);
  ElMessage({
    message: res?.data?.message,
    type: "success",
  });
};
Login();

const homoFetch = async () => {
  const res = await axios({ url: "http://localhost:5000/user", params: {} });
  console.log("/user:", res.data);
};

const corseFetch = async () => {
  const res = await axios({
    url: "http://localhost:8003/anotherService",
    params: {},
  });
  console.log("/anotherService:", res.data);
};
</script>

<style scoped lang='less'>
</style>
