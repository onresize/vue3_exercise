<template>
  <div>
    <h3>我是子组件: {{ newAA }}--{{ newMsg }}</h3>
    <h3>子组件的props属性不能更改、只能从重新赋值或者用computed、才能更改</h3>
    <h3>
      <text style="color: red">注意：</text>
      js中拿到computed的值要.value、js拿到的这个计算属性不能直接修改、dom中直接用、
    </h3>
    <button @click="handleClick">子组件触发</button>
  </div>
</template>

<script>
import { computed, ref, reactive, toRefs } from "vue";

export default {
  emits: ["update:title", "childClick"],
  props: {
    msg: String,
  },
  setup(props, { emit }) {
    // 使用重新赋值活计算属性方式 就能修改props的值了
    const newMsg = ref(props.msg);
    const newAA = computed(() => {
      return props.msg + "-computed";
    });

    let computedVal = newAA.value; // computed的值被赋值之后、可以修改

    const Methods = reactive({
      handleClick() {
        emit("update:title", "123"); // 更新父组件子组件标签上的 v-model属性
        emit("childClick", "345"); // 触发给父组件内的子组件标签上的 childClick方法
      },
      childMethod() {
        console.log("子组件的事件被触发了：", props.msg);
        newMsg.value = "XXXXXXXXXXX";
        // newAA.value = "AAAAAa"; // 这里走不通、因为computed的值是只读的
        console.log("计算属性的值", newAA.value);
        computedVal = "AAA";
        console.log("computedVal--", computedVal);
      },
    });

    return {
      newAA,
      newMsg,
      ...toRefs(Methods),
    };
  },
}
</script>

<style scoped></style>
