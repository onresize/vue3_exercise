<template>
  <div class="box">
    <ul>
      <li style="color: orange; list-style: none; text-indent: -20px">
        本页涉及实践操作如下
      </li>
      <li>props验证</li>
      <li>
        h函数实现函数式组件
        <br />
        <span style="color: grey; font-size: 12px"
          >1. 使用 list数据渲染列表元素 ul/li</span
        >
        <br />
        <span style="color: grey; font-size: 12px"
          >2. 当点击列表子元素时,将其文本颜色更改为红色</span
        >
      </li>
      <li>实现一个树组件</li>
      <li>hooks监听鼠标</li>
    </ul>
    <!-------------------------------------------分割线------------------------------------------->
    <el-card>
      <el-tag color="#ffcc99" style="color: #000">{{ str }}</el-tag>
    </el-card>
    <el-card>
      <h4>函数式组件实现</h4>
      <list-component
        :list="list"
        :active-index="activeIndex"
        @toggle="toggle"
      />
    </el-card>
    <el-card>
      <h4>树组件</h4>
      <treeComponent :data="pData"></treeComponent>
    </el-card>
    <el-card>
      <h3>{{ x + "-----" + y }}</h3>
    </el-card>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import useMouse from "@/hooks/useMouse";

const props = defineProps({
  str: {
    type: String,
    default: "默认",
    validator(val) {
      console.log("props验证：", val);
      if (["默认", "你", "我", "他"].includes(val)) {
        return ElNotification({
          title: "props验证",
          message: "成功",
          type: "success",
          duration: 3000,
        });
      } else {
        ElNotification({
          title: "props验证",
          message: "失败",
          type: "error",
          duration: 3000,
        });
      }
      return ["默认", "你", "我", "他"].includes(val);
    },
  },
});

// 组件
const ListComponent = (props, { emit }) => {
  const childrens = props.list.map((item, index) => {
    return h(
      "li",
      {
        style: {
          cursor: "pointer",
          color: props["active-index"] === index ? "red" : "#333",
        },
        onClick: () => {
          emit("toggle", index);
        },
      },
      item.name
    );
  });
  return h("ul", childrens);
};

const list = [
  {
    name: "John",
  },
  {
    name: "Doe",
  },
  {
    name: "Smith",
  },
];
const activeIndex = ref(0);

const toggle = (index) => {
  activeIndex.value = index;
};

const pData = [
  { title: "学历", children: [{ title: "初中" }, { title: "高中" }] },
  { title: "腾讯", children: [{ title: "天美" }, { title: "光子" }] },
];

// 组件
const treeComponent = (props) => {
  if (Array.isArray(props.data) && props.data.length) {
    const childrenList = props.data.map((v, idx) => {
      return h("li", { class: "liName", key: idx }, [
        v.title,
        treeComponent({ data: v.children }),
      ]);
    });
    return h("ul", { class: "ulName" }, childrenList);
  }
};

// hooks监听鼠标
const [x, y] = useMouse();

</script>

<style lang="less">
.liName {
  list-style: square;
}

.liName {
  list-style: none;
}

.ulName li:before {
  content: "❤";
  margin-right: 5px;
  cursor: pointer;
  width: fit-content;
}

.liName li {
  // list-style-image：url(xxx.jpg);
  background: url("~@/assets/img/向下1.png") no-repeat;
  background-size: 12px 12px;
  background-position-y: 6px;
  padding-left: 10px;
  width: fit-content;
  cursor: pointer;
  // border: 1px solid gray;
  &:before {
    content: "";
    border: none;
    margin-right: 5px;
  }
}
</style>

<style scoped lang="less">
.box {
  height: calc(100vh - 115px);
  overflow-y: auto;
  overflow-x: hidden;
}
.el-card {
  margin-top: 5px;
}
</style>
