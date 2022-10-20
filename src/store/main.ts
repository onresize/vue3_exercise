// XXX pinia演示
import { defineStore } from "pinia";
export const useMainStore = defineStore("mainPinia", {
  // 全局引入pinia缓存插件缓存数据配置、下面三种写法、默认缓存到localStorage
  // persist: {
  //   key: "PiniaStore",
  //   store: window.localStorage,
  // },
  persist: true,
  // persist: {
  //   enabled: true,
  // },
  // 声明store
  state: () => ({ shoesCount: 18 }),
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
      console.log("actions方法addCount");
      this.shoesCount += num;
    },
    //异步
    addDelayCount(num) {
      setTimeout(() => {
        this.shoesCount += num;
      }, 2000);
    },
  },
});
