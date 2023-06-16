<template>
  <div class="mixinHeight">
    <h2>一：验证vue3中await nextTick()值是否promise 看console</h2>
    <div>
      <h2>二：await的两种用法：</h2>
      <h3>1. await new Promise</h3>
      <h3>2. await {then: func}</h3>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, nextTick, onMounted } from "vue";
import { isPromise } from "@/utils/funcTools.js";

export default {
  props: {},
  emits: [],
  setup(prop, { attrs, emit, expose }) {
    const state = reactive({});
    const methods = reactive({
      async main() {
        // await {then: func}
        await {
          then: function (resolve) {
            setTimeout(() => {
              console.log("hello");
              resolve();
            }, 0);
          },
        };
      },
    });
    onMounted(async () => {
      setTimeout(() => {
        console.log("1");
      }, 0);
      console.log("2");
      await methods.main();
      let r = await nextTick();
      console.log("nextTick()是否Promise:", isPromise(nextTick()));
      console.log("nextTick()返回值--是否Promise:", isPromise(r));
    });
    return { ...toRefs(state), ...toRefs(methods) };
  },
};
</script>

<style scoped></style>
