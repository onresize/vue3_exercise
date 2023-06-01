<template>
  <el-image-viewer
    v-if="isShow"
    :urlList="urlList"
    :zIndex="options.zIndex"
    :initialIndex="options.initialIndex"
    :infinite="options.infinite"
    :hideOnClickModal="options.hideOnClickModal"
    @close="close"
  />
</template>

<script setup name="MyImageViewer">
import { ref, reactive } from "vue";
import { ElImageViewer } from "element-plus";

let urlList = ref([]);
let isShow = ref(false);
let options = reactive({
  zIndex: 2000,
  initialIndex: 0,
  infinite: true,
  hideOnClickModal: false,
});

const close = () => {
  isShow.value = false;
  urlList.value = [];
};

// setup暴露方法和遍历
defineExpose({
  urlList,
  options,
  close,
  isShow,
});
</script>

<style scoped>
</style>
