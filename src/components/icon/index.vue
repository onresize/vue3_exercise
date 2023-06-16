<template>
  <div class="mixinHeight">
    <h2>
      element-plus图标不渲染问题:
      <el-link href="https://blog.csdn.net/weixin_44775694/article/details/124894161" target="_blank">参考:</el-link>
    </h2>
    <h3>
      <div class="ft-20 tag">注意这里使用setup return方式必须写components当成组件一样注册图标、 而script标签上setup那种方式只需要引入就能直接使用、不需要再写components</div>
    </h3>
    <div>
      <h3 class="mg-l-20">全局注册：<span class="bg-pink border-5 pg-5">npm install @element-plus/icons-vue</span></h3>
      <pre class="ft-20 ft-bold bg-pink border-10 pg-t-20">
      在main.ts中
      import * as icons from "@element-plus/icons-vue";
      Object.keys(icons).forEach((key) => {
          app.component(key, icons[key]);
      })
      </pre>
      <h3 class="mg-l-20">按需引入：</h3>
      <pre class="ft-20 ft-bold bg-pink border-10 pg-t-20">
      在.vue页面中
      import { Delete, Search, Share } from "@element-plus/icons-vue";
      components: { Delete, Search, Share }, // setup return方式要写这个、script标签上setup那种方式可以省略
      </pre>
    </div>
    <el-icon>
      <Delete />
    </el-icon>
    <el-icon>
      <Search />
    </el-icon>
    <el-icon>
      <Share />
    </el-icon>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
// import { Delete, Search, Share } from "@element-plus/icons-vue";
export default {
  // components: { Delete, Search, Share },
  setup() {
    const state = reactive({});
    const methods = reactive({});
    return { ...toRefs(state), ...toRefs(methods) };
  },
};
</script>

<style scoped lang="less">
.tag {
  width: calc(100vw - 310px);
  background-color: yellow;
  color: rgb(87, 196, 230);
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  user-select: none;
}
</style>
