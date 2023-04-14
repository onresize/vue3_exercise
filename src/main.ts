import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "animate.css";
// 全局样式
import "@less/global.less";

import "./permission";

// 胶囊版本号
console.log(
  `%cvue:%c${"^3.2.6"}`,
  "padding: 3px; color: white; background: #023047; border-radius: 5px 0 0 5px;",
  "padding: 3px; color: white; background: #219EBC;border-radius: 0 5px 5px 0;"
);

// console.log("|　　　　 ／|");
// console.log("/ | 　  ∠ /　");
// console.log("│ | ＿,  ＜ ／　　 /`");
// console.log("/　　　　　 ヽ　　/ /　");
// console.log("Y　　　　　  `　 / /");
// console.log("ｲ ●　､　●　　⊂⊃〈 〈");
// console.log("()　 へ　　　　|　＼ /");
// console.log("　>ｰ ､_　 ィ　 ) ／／");
// console.log("/ へ　　 /　ﾉ ＼＼");
// console.log("ヽ_ﾉ　　(_／　 │／／");
// console.log("　7　　　　　　|／");
// console.log("　＞―r ￣`ｰ―＿");

// 环境变量、正式环境不存在import.meta.env
// console.log("环境变量", import.meta.env);

// vue3中使用$bus通信、mitt和tiny-emitter是官方推荐库
// import mitt from "mitt"

const app = createApp(App);
// app.config.globalProperties.$bus = mitt()

// 全局注册SvgIcon组件
import SvgIcon from "@/myCom/SvgIcon/index.vue";
app.component("svg-icon", SvgIcon);

// 引入自定义指令
import directive from "./directiveJs.ts";
// directive(app)
app.use(directive, app);

// custom directives
import directives from "@/directives/index";

// 大屏适配
import Fit from "vue-fit-next";
app.use(
  Fit({
    width: 1920, // 设计稿宽度
    height: 1080, // 设计稿高度
    mode: "scale", // 可选， 支持 scale 和 zoom 两种方案，默认为 scale
    scaleStep: 0.05, // 可选，默认 0.05， 每次鼠标滚动缩放的增量，分辨率很大的时候会比较有用
  })
);

// 使用vueX
import store from "@/store/index";
app.use(store);

import pinia from "@/store/store";

// 全局注册图标
import * as Icons from "@element-plus/icons-vue";
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
// console.log("全局引入图标", Object.keys(Icons));

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
// console.log("环境变量", import.meta.env);
//参考： https://blog.csdn.net/Smile_ping/article/details/116295981

// global-import 批量导入
// const globModules = import.meta.glob("./glob/*");
// const globModules = import.meta.glob("./glob/*.json"); // 拿到匹配.json文件
// console.log("批量引入", globModules);
// Object.entries(globModules).forEach(([k, v]) => {
//   v().then((m) => console.log(k + ":", m.default));
// });

// type Filter = {
//   format: <T>(str: T) => string;
// };
// 声明文件、在ts中防止报错、vue3移除了filters 可以用全局函数代替
// declare module "@vue/runtime-core" {
//   export interface ComponentCustomProperties {
//     $env: string;
//     $filters: Filter;
//   }
// }

// errorHandler
import errorHandler from "@/utils/errorHandler.js";
app.config.errorHandler = errorHandler;

app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `--------${str}---------`;
  },
};
// 声明全局变量 代替vue2的prototype
app.config.globalProperties.$env = "这是一个main.ts下声明的全局变量";

app.use(ElementPlus).use(router).use(pinia).use(directives).mount("#app");
