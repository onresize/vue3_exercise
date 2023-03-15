import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";
import { AdminRoutes, OriginRoutes } from "@/router/AuthRoutes";
import config from "@/config";

const PiniaStore = useMainStore(pinia);

// router4.0版本、next参数可选、vue2不支持router4.0
router.beforeEach((to, from, next) => {
  console.log("mainJS进入了路由:", to, from);
  NProgress.start();
  let user = window.localStorage.getItem("user") || null;
  if (user == "Admin") {
    AdminRoutes.forEach((v: any) => {
      router.addRoute("layoutPage", v);
    });
  } else if (user == "Origin") {
    OriginRoutes.forEach((v: any) => {
      router.addRoute("layoutPage", v);
    });
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
  // console.log("mainJS离开了路由:", to.fullPath, from);
  const { title } = to.meta;
  const { websiteTitle } = config;
  document.title = title ? `${title + "页"}` : websiteTitle;
});
