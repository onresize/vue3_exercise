import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";
import router from "@/router";
import config from "@/config";

// 🍒这里为了解决动态路由浏览器大刷404页面、使用到了pinia在这里重新挂载、如果放在导航前置守卫里面挂载pinia能持久化、刷新404问题又复现
// 🍒参考：https://blog.csdn.net/u012533474/article/details/129263196
const PiniaStore = useMainStore(pinia);

// router4.0版本、next参数可选、vue2不支持router4.0
router.beforeEach((to, from, next) => {
  // console.log("mainJS进入了路由:", to, from);
  
  NProgress.start();
  if (["/", "/login"].indexOf(to.path) !== -1) {
    next();
  } else {
    if (PiniaStore.registerRouteFresh) {
      router.removeRoute("NotFound");
      PiniaStore.PromiseRoutes().then(() => {
        PiniaStore.changeState(false);
        next({ path: to.path });
      });
    } else {
      router.addRoute("layoutPage", {
        path: "/:pathMatch(.*)",
        name: "NotFound",
        meta: { title: "404" },
        component: () => import("@views/404.vue"),
      });
      next();
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  // console.log("mainJS离开了路由:", to.fullPath, from);
  const { title } = to.meta;
  const { websiteTitle } = config;
  document.title = title ? `${title + "页"}` : websiteTitle;
});
