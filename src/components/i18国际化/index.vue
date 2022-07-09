<template>
  <div>
    <h2>
      i18国际化基本使用(安装三个库)：
      <!-- <el-tag class="bg-pink ft-22 h-30 ft-white">
        npm i @types/node -D
      </el-tag> -->
      <el-tag class="bg-pink ft-22 h-30 ft-white">
        npm i --save-dev @intlify/vite-plugin-vue-i18n -D
      </el-tag>
      <el-tag class="bg-pink ft-22 h-30 ft-white">
        npm i vue-i18n@next -S
      </el-tag>
      <el-link
        href="https://blog.csdn.net/qq_43485006/article/details/120034213"
        target="_blank"
        >参考：(推荐）</el-link
      >
      <el-link
        href="https://segmentfault.com/a/1190000041106650"
        target="_blank"
        >其他参考：</el-link
      >
    </h2>
    <h2>
      <el-link
        href="https://blog.csdn.net/mrhaoxiaojun/article/details/125267804"
        target="_blank"
        >关于报错Must be called at the top of a `setup`参考：</el-link
      >
      <div>
        <h4 class="ft-bold">
          注意下面两个库的版本、如果版本太高会导致上面的报错、正常CompotitionAPI使用修改语言会不正常
        </h4>
        <pre class="ft-bold bg-pink pg-t-20 border-10">
          @intlify/vite-plugin-vue-i18n": "^3.3.1",
          "vue-i18n": "^9.1.9",
        </pre>
      </div>
    </h2>
    <div class="bg-pink w-300 h-300 border-10 flex j-c a-c">
      <h3>{{ $t("info.home") }}</h3>
      <el-button>{{ $t("btn.confirm") }}</el-button>
    </div>
  </div>
  <el-button class="mg-5" @click="changeLocale"
    >切换语言:当前({{ locale == "en" ? "en" : "中文" }})</el-button
  >
  <el-link
    href="https://github.com/xiaoluoboding/vue-i18n-practice"
    target="_blank"
    >案例源码参考：</el-link
  >
</template>

<script setup>
import { getCurrentInstance } from "vue";
// import { i18n } from "@/plugins/i18n";
import { useI18n } from "vue-i18n";

// let { proxy, appContext } = getCurrentInstance(); // 获取当前实例、替代vue2中的this
// console.log("当前语言：", proxy.$i18n.locale);

// const { availableLocales, locale } = i18n.global;
// console.log("当前语言：", locale.value, availableLocales);

const { availableLocales, locale } = useI18n();
console.log("语言种类：", availableLocales, "当前语言：", locale.value);
const changeLocale = () => {
  const locales = availableLocales;
  // 下面两种写法效果一致
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
  // if (locale.value == "en") {
  //   locale.value = locales[1];
  // } else {
  //   locale.value = locales[0];
  // }
};
</script>
