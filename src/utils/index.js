import { Debounce, Throttle } from "./funcTools";

// 全局注册工具类函数
export default {
  install: (app) => {
    app.config.globalProperties.$D = Debounce;
    app.config.globalProperties.$T = Throttle;
  },
};
