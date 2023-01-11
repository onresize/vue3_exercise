import axios from "axios";
const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  config.headers["a"] = "aaa";
  return config;
});

export default request;
