/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明.env文件中VITE_TITLE的类型、用的时候直接.v就会联想出在.env定义的常量
interface ImportMetaEnv {
  VITE_TITLE: string;
}
