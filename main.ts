import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局样式
import "@less/global.less";

const app = createApp(App);
// //全局遍历注册
// Object.values(myComponents).forEach(i => {
//   app.component(i.name, i)
// })
// XXX 环境变量、正式环境不存在import.meta.env
// console.log("环境变量", import.meta.env);
console.log("环境变量", import.meta.env);

type Filter = {
  format: <T>(str: T) => string;
};
// 声明文件、在ts中防止报错、vue3移除了filters 可以用全局函数代替
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $env: string;
    $filters: Filter;
  }
}

app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `--------${str}---------`;
  },
};
// 声明全局变量 代替vue2的prototype
app.config.globalProperties.$env = "这是一个main.ts下声明的全局变量";

app.use(ElementPlus);
app.use(store).use(router).mount("#app");
