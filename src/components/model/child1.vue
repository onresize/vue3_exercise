<template>
  <div v-if="modelValue" class="dialog">
    <div class="dialog-header">
      <h3>标题---{{ title }}</h3>
      <div @click="closeClick" class="cancel">x</div>
    </div>
    <div class="dialog-content">这里是子组件1子组件1子组件1</div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  props: {
    modelValue: Boolean,
    title: String,
    myName: {
      type: String,
      default: "王大胖",
    },
  },
  emits: ["update:modelValue", "update:title", "update:myName"],
  setup(prop, { attrs, emit, expose }) {
    const methods = reactive({
      // 子组件触发
      closeClick() {
        console.log("走了closeClick");
        emit("update:modelValue", false);
        emit("update:title", "子组件修改了标题");
        emit("update:myName", "王杰");
      },
    });
    return { ...toRefs(methods) };
  },
};
</script>

<style lang="less">
.dialog {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid #ccc;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-header {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .cancel {
      width: 15px;
      height: 15px;
      display: flex;
      justify-content: center;
      line-height: 9px;
      border: 1px solid red;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  &-content {
    padding: 10px;
  }
}
</style>
