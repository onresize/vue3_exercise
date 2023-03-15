// XXX pinia演示
import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
  // 声明store
  state: () => ({
    shoesCount: 18,
    AuthRoutes: [],
    ActiveBread: [{ name: "/welcome", title: "欢迎页" }],
  }),
  // 声明getters
  getters: {
    doubleCount(state) {
      return state.shoesCount * 2;
    },
    doubleCountPlus() {
      return (num) => this.doubleCount + num;
    },
  },
  // 声明actions、（同步和异步都用actions）
  actions: {
    // 同步
    addCount(num) {
      console.log("pinia方法addCount");
      this.shoesCount += num;
    },
    changeAuthRoutes(res) {
      console.log("pinia方法changeAuthRoutes", res);
      this.AuthRoutes = res;
    },
    changeActiveBread(res) {
      console.log("pinia方法changeActiveBread", res);
      this.ActiveBread = res;
    },
    //异步
    addDelayCount(num) {
      setTimeout(() => {
        this.shoesCount += num;
      }, 2000);
    },
  },
  // 全局引入pinia缓存插件缓存数据配置、下面三种写法、默认缓存到localStorage
  // persist: {
  //   paths: ["AuthRoutes", "ActiveBread"],
  //   storage: localStorage,
  // },
  // persist: true,
  // persist: {
  // enabled: true,
  // },
});
