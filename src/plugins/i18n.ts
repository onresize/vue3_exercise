import { createI18n } from "vue-i18n";

import zh from "../locales/zh.json";
import en from "../locales/en.json";

// 语言库
const messages = {
  zh: { ...zh },
  en: { ...en },
};

// // 默认语言
const langDefault = "en";
// const langDefault = 'en'

const install = (app) => {
  const i18n = createI18n({
    legacy: false, // 使用v3 CompotitionAPI必须添加这条.
    locale: langDefault, //默认显示的语言
    globalInjection: true, // 全局模式，可以直接使用 $t
    messages,
  });

  app.use(i18n);
};

export default install;
