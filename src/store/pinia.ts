// XXX pinia演示
import { defineStore } from "pinia";
import router from "@/router";
import { AdminRoutes, OriginRoutes } from "@/router/AuthRoutes";

export const useMainStore = defineStore("piniaStore", {
  // 声明store
  state: () => ({
    shoesCount: 18,
    registerRouteFresh: true, // 定义标识，记录路由是否添加
    AuthRoutes: [], // 左侧路由菜单数据
    ActiveBread: [{ name: "/welcome", title: "欢迎页" }], // 顶部激活页面
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
      // console.log("pinia方法addCount");
      this.shoesCount += num;
    },
    changeState(state) {
      this.registerRouteFresh = state;
    },
    changeAuthRoutes(res) {
      this.AuthRoutes = res;
      console.log("pinia方法改变左侧菜单数据", res);
    },
    changeActiveBread(res) {
      // console.log("pinia方法changeActiveBread", res);
      this.ActiveBread = res;
    },
    //异步
    addDelayCount(num) {
      // setTimeout(() => {
      this.shoesCount += num;
      // }, 2000);
    },
    PromiseRoutes() {
      let user = window.localStorage.getItem("user") || null;
      return new Promise((resolve) => {
        if (!this.AuthRoutes.length) {
          if (user == "Admin") {
            AdminRoutes.forEach((v: any) => {
              router.addRoute("layoutPage", v);
            });
            this.changeAuthRoutes(AdminRoutes); // 左侧菜单数据
          } else if (user == "Origin") {
            OriginRoutes.forEach((v: any) => {
              router.addRoute("layoutPage", v);
            });
            this.changeAuthRoutes(OriginRoutes);
          }
        }
        resolve();
      });
    },
  },
  // 全局引入pinia缓存插件缓存数据配置、下面三种写法、默认缓存到localStorage
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["shoesCount"], //指定要长久化的字段
      },
    ],
    // storage: window.sessionStorage,
  },
  // persist: true,
  // persist: {
  // enabled: true,
  // },
});
