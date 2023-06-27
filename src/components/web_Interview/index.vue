<template>
  <div class="web_box">
    <div class="card_one">
      <span class="sp">web面试markdown总结</span>
    </div>
    <div class="card_left">
      <el-tree v-if="state.showTree" :data="state.treeList" :props="defaultProps">
        <template #default="{ node }">
          <a target="_self" :href="`#${node?.data?.id}`" @click="handleNodeClick(node)">
            <span class="break_span" :style="{ color: state.pId == `${node?.data?.id}` ? '#ffcc99' : '#000000' }"> {{ node.label }}</span>
          </a>
        </template>
      </el-tree>
    </div>
    <div class="card_right">
      <WebInterview v-highLight class="pre_Code_Box"></WebInterview>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useMainStore } from "@/store/pinia";
import WebInterview from "@/md/面试总结题.md";

const PiniaStore = useMainStore();

const defaultProps = {
  children: "children",
  label: "label",
};

let state = reactive({
  pId: null,
  showTree: false,
  treeList: [],
});

watch(
  () => PiniaStore.MDList,
  (val) => {
    if (val?.length) {
      console.log("监听mdList------------:", val);
      state.treeList = val.map((v, i) => ({
        label: `${i + 1}：${v?.html}`,
        id: v?.id,
      }));
      state.showTree = true;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const handleNodeClick = (node) => {
  state.pId = node.data.id;
  console.log("高亮id:", state.pId);
};
</script>

<style scoped lang="less">
.web_box {
  width: calc(100vw - 330px);
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto !important;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  inset: 0;
  background: no-repeat 50% url(https://assets.codehub.cn/micro-frontend/layout/849cb4458294058234086af5bb1de6f3.png);
  background-size: cover;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: block !important;
  }

  .card_one {
    position: sticky;
    top: 0;
    z-index: 2;
    // 径向渐变
    background-image: radial-gradient(transparent 1px, #fff 1px);
    background-size: 4px 4px;
    // 元素后面区域添加 饱和度 和 模糊效果
    backdrop-filter: saturate(50%) blur(4px);
    box-sizing: border-box;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid #e4e7ed;
    padding: 20px;

    .sp {
      font-size: 20px;
      font-weight: bold;
    }

    margin-bottom: 10px;
  }
}

.card_left {
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  overflow: auto;
  height: calc(100% - 98px);
  width: 600px;
  border-radius: 10px;
  padding: 10px 10px 10px 0;
  position: sticky;
  top: 85px;
  z-index: 60;

  &::-webkit-scrollbar {
    display: block;
  }

  a {
    text-decoration: none;

    &:link {
      // color: #ffcc99;
    }

    &:hover {
      // color: #ffcc99;
    }

    &:active {
      // color: #ffcc99;
    }

    &:visited {
      // color: #ffcc99;
    }

    .break_span {
      font-weight: bold;
      // 换行
      // word-break: break-all;
      // word-wrap: break-word;
    }
  }
}

.card_right {
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  top: 80px;
  right: 0px;

  :deep(.markdown-body) {
    width: calc(100% - 640px);
    max-width: 2147px !important;
    min-width: 267px !important;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    padding: 15px;
  }

  .pre_Code_Box :deep(pre) {
    code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
      font-size: 16px;
      font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC,
        Microsoft YaHei, sans-serif;
      line-height: 30px;
      // background: radial-gradient(pink, transparent);
      background: #e4e7ed;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      border: 1px solid #e4e7ed;
      border-radius: 6px;

      // 局部滚动条美化
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        display: block;
      }

      // 局部滚动轴
      &::-webkit-scrollbar-thumb {
        // background-color: #ffcc99;
        border-radius: 10px;

        &:hover {
          // background-color: #ffcc99;
        }
      }
    }
  }

  .pre_Code_Box :deep(pre) {
    ::selection {
      background: #ffcc99 !important;
    }
  }

  .pre_Code_Box :deep(p) {
    a {
      text-decoration: none !important;
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;

      &::selection {
        background: transparent !important;
      }
    }
  }
}

@media screen and (max-width: 1920px) {
  .card_left {
    display: none !important;
  }

  .card_right {
    display: flex;
    justify-content: center;
  }
}
</style>
