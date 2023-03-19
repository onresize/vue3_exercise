import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";
import router from "@/router";
import config from "@/config";

const PiniaStore = useMainStore(pinia);

// router4.0版本、next参数可选、vue2不支持router4.0
// TODO浏览器大刷新页面跳404
router.beforeEach((to, from, next) => {
  console.log("mainJS进入了路由:", to, from);
  NProgress.start();
  if (["/", "/login"].indexOf(to.path) !== -1) {
    next();
  } else {
    if (PiniaStore.registerRouteFresh && PiniaStore.AuthRoutes == 0) {
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
