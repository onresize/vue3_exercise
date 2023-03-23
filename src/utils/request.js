import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";

// const PiniaStore = useMainStore(pinia);
export const server = (obj) => {
  axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
  return new Promise((resolve, reject) => {

    const request = axios.create({
      baseURL: import.meta.env.VITE_BASE,
      timeout: 10000,
      withCredentials: true // 跨域时候是否允许携带凭证
    });

    request.interceptors.request.use(
      (config) => {
        // config.headers["a"] = "aaa";
        return config;
      }, (err) => reject(err));

    request.interceptors.response.use((response) => response.data);

    resolve(request({ ...obj }))
  })
}

