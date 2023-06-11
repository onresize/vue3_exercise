import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";

// const PiniaStore = useMainStore(pinia);
export const server = (obj) => {
  axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
  // axios.defaults.withCredentials = true
  return new Promise((resolve, reject) => {
    const request = axios.create({
      // baseURL: import.meta.env.VITE_BASE,
      timeout: 10000,
      withCredentials: true, // 跨域时候是否允许携带凭证、默认false
    });

    request.interceptors.request.use(
      (config) => {
        // config.headers["Content-Type"] = "multipart/form-data";
        // console.log('请求拦截：', config)
        return config;
      },
      (err) => reject(err)
    );

    request.interceptors.response.use((response) => response.data);

    resolve(request({ ...obj }));
  });
};
