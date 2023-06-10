<template>
  <el-card>
    <h3>跨域请求如何携带cookie</h3>
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="homoFetch">发送同源请求</el-button>
      <el-button type="primary" @click="corseFetch">发送跨域请求</el-button>
    </div>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="跨域问题" name="2">
        <el-card>
          <el-link
            href="https://blog.csdn.net/weixin_46684391/article/details/130821540"
            style="color: #409eff"
          >
            CSDN参考
          </el-link>
          <h3>
            同源策略：客户端基本安全要求，需要同时满足：协议、域名、端口都得相同
          </h3>
          <span>
            注：http://127.0.0.1:7001 与 http://localhost:7001 域名不同，跨域了
          </span>
          <h3>受同源限制：动态数据</h3>
          <span>1. Ajax（客户端发起请求）</span>
          <span>2. Cookie（存储在客户端）</span>
          <span>3. localStorage：永久性客</span>
          <span>4. sessionStorage：客户端数据缓存</span>
          <span>5. indexDB：客户端数据库</span>
          <h3>不受同源限制：静态资源</h3>
          <span>1. Session（存储在服务器端）</span>
          <span>2. script：src属性可以指定外部的js文件</span>
          <span>3. img：src属性可以指定外部的图片文件</span>
          <span>4. link：href属性可以指定外部的css文件</span>
          <span>5. iframe/audio/radio：src属性可以引入外部文件</span>
          <span style="color: red">
            关于谷歌浏览器关闭跨域模式.bat文件代码：桌面新建.txt文件、cd后面是chrome.exe的C盘安装路径、添加代码后把txt后缀改成bat
          </span>
          <pre>
            cd C:\Program Files\Google\Chrome\Application\
            chrome.exe --disable-web-security --user-data-dir=C:\MyChromeDevUserData
          </pre>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const activeNames = ref(["1"]);

const Login = async () => {
  const res = await axios({
    url: `http://localhost:5000/login?${Date.now()}`,
    params: {},
  });
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
span {
  display: block;
}
pre {
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  padding-top: 25px;
  &::selection {
    background: rgb(255, 145, 0);
    color: #fff;
  }
}
</style>
