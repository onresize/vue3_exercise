import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";

// const PiniaStore = useMainStore(pinia);
const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  config.headers["a"] = "aaa";
  return config;
});

export default request;
