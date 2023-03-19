import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";

// const PiniaStore = useMainStore(pinia);
const request = axios.create({
  timeout: 5000,
  // 跨域时候允许携带凭证
  withCredentials: true
});
request.interceptors.request.use((config) => {
  config.headers["a"] = "aaa";
  return config;
});

export default request;
