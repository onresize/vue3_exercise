<template>
  <div v-if="propData.modelValue" class="dialog">
    <div class="dialog-header">
      <h3>标题---{{ title }}</h3>
      <div @click="closeClick" class="cancel">x</div>
    </div>
    <div class="dialog-content">这里是子组件子组件子组件</div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  modelValue: boolean;
  title: string;
  myName: string;
};

// const propData = defineProps<Props>();

const propData = defineProps(["modelValue", "title", "myName"]);

const emits = defineEmits([
  "update:modelValue",
  "update:title",
  "update:myName",
]);

const closeClick = () => {
  emits("update:modelValue", false);
  emits("update:title", "改变标题");
  emits("update:myName", "李四");
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
