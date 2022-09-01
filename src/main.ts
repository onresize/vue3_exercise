import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import 'animate.css'

// 全局样式
import "@less/global.less";

const app = createApp(App);


// 全局注册图标
import * as Icons from "@element-plus/icons-vue";
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
console.log("全局引入图标", Object.keys(Icons));

// i18国际化
// import { setupI18n } from "./plugins/i18n";
// // app.config.globalProperties.$il18n = i18n // 全局定义
// app.use(setupI18n);
import i18n from "./plugins/i18n";
app.use(i18n);

// //全局遍历注册
// Object.values(myComponents).forEach(i => {
//   app.component(i.name, i)
// })

// 测试
import { version } from "/package.json";
console.log("版本号：", version);

// XXX 环境变量、正式环境不存在import.meta.env
console.log("环境变量", import.meta.env);

// global-import 批量导入
const globModules = import.meta.glob("./glob/*");
// const globModules = import.meta.glob("./glob/*.json"); // 拿到匹配.json文件
console.log("批量引入", globModules);
Object.entries(globModules).forEach(([k, v]) => {
  v().then((m) => console.log(k + ":", m.default));
});

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
