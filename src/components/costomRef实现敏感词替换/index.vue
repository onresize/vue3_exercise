<template>
  <h2>实现敏感词替换、输入sb被替换成**</h2>
  <div>
    <el-link
      href="https://staging-cn.vuejs.org/api/reactivity-advanced.html#customref"
      target="_blank"
    >
      customRef组合响应式api
    </el-link>
  </div>
  <input type="text" v-model="msg" />
</template>

<script setup>
import { ref, customRef } from "vue";

const replaceStr = (str) => {
  const List = ["SB", "sb"];
  List.forEach((item) => {
    str = str.replace(item, "**");
  });
  return str;
};

function useReplaceRef(value) {
  return customRef((track, trigger) => {
    // 访问数据的时候会自动执行
    return {
      get() {
        track();
        return value;
      },
      // 对数据做一个修改的时候会自动执行的函数
      set(newValue) {
        value = replaceStr(newValue);
        trigger();
      },
    };
  });
}

const msg = useReplaceRef("this is msg");
</script>

<style scoped></style>
