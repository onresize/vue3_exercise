<template>
  <ul>
    <li style="color: orange;list-style: none;text-indent: -20px;">本页涉及实践操作如下</li>
    <li>props验证</li>
    <li>
      h函数实现函数式组件
      <br>
      <span style="color: grey;font-size: 12px;">1. 使用 list数据渲染列表元素 ul/li</span>
      <br>
      <span style="color: grey;font-size: 12px;">2. 当点击列表子元素时,将其文本颜色更改为红色</span>
    </li>
  </ul>

  <el-tag color="#ffcc99" style="color: #fff;">{{ props.str }}</el-tag>
  <list-component :list="list" :active-index="activeIndex" @toggle="toggle" />
</template>

<script setup>
import { ref, h } from 'vue'

const props = defineProps({
  str: {
    type: String,
    default: '默认',
    validator(val) {
      console.log('props验证：', val)
      if (['默认', '你', '我', '他'].includes(val)) {
        return ElNotification({
          title: 'props验证',
          message: '成功',
          type: "success",
          duration: 3000,
        })
      } else {
        ElNotification({
          title: 'props验证',
          message: '失败',
          type: "error",
          duration: 3000,
        })
      }
      return ['默认', '你', '我', '他'].includes(val)
    }
  }
})

const ListComponent = (props, { emit }) => {
  const childrens = props.list.map((item, index) => {
    return h(
      'li',
      {
        style: {
          cursor: 'pointer',
          color: props['active-index'] === index ? 'red' : '#333',
        },
        onClick: () => {
          emit('toggle', index);
        },
      },
      item.name
    );
  });
  return h('ul', childrens);
};

const list = [
  {
    name: 'John',
  },
  {
    name: 'Doe',
  },
  {
    name: 'Smith',
  },
];

const activeIndex = ref(0);

function toggle(index) {
  activeIndex.value = index;
}

</script>

<style scoped lang="less"></style>
