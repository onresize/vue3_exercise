<template>
  <div>
    <h2>验证vue3中await nextTick()值是否promise</h2>
  </div>
</template>

<script>
import { ref, reactive, toRefs, nextTick, onMounted } from "vue";
export default {
  props: {},
  emits: [],
  setup(prop, { attrs, emit, expose }) {
    const state = reactive({});
    const methods = reactive({});
    onMounted(async () => {
      setTimeout(() => {
        console.log("1");
      }, 0);
      console.log("2");
      let r = await nextTick();
      console.log("nextTick返回值", r);
    });
    return { ...toRefs(state), ...toRefs(methods) };
  },
};
</script>

<style scoped></style>
