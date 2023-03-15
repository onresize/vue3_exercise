//引入持久化插件
import piniaPersist from "pinia-plugin-persistedstate";

// 使用pinia
import { createPinia } from "pinia";
const pinia = createPinia();
pinia.use(piniaPersist); // 全局缓存pinia数据

export default pinia