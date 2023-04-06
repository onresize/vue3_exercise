// XXX pinia演示
import { defineStore } from "pinia";
import router from "@/router";
import { AdminRoutes, OriginRoutes } from "@/router/AuthRoutes";

export const useMainStore = defineStore("piniaStore", {
  // 声明store
  state: () => ({
    registerRouteFresh: true, // 定义标识，记录路由是否刷新、这个不做持久化操作、否则会导致刷新导航守卫404问题
    AuthRoutes: [], // 左侧路由菜单数据、不做持久化
    shoesCount: 18,
    ActiveBread: [{ name: "/welcome", title: "欢迎页" }], // 顶部激活页面
    crossText: "",
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
      // console.log("pinia方法改变左侧菜单数据", res);
    },
    changeActiveBread(res) {
      // console.log("pinia方法changeActiveBread", res);
      this.ActiveBread = res;
    },
    changeCrossText(res) {
      this.crossText = res;
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
  // 🍒🍒这里因为项目使用了动态路由、为了解决刷新404问题、这里持久化写了也会失效、折中采用持久化手动storage存取
  // persist: {
  //   paths: ["AuthRoutes", "shoesCount", "ActiveBread"],
  // },
  // persist: true,
  // persist: {
  // enabled: true,
  // },
});
