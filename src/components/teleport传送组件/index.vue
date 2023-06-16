<template>
  <div class="mixinHeight">
    <h3>传送组件的使用</h3>
    <header>头部</header>
    <div style="width: 300px; height: 200px; background: pink; position: relative">
      <!-- 演示传送组件、在index.html中定义了一个类名mode的标签、将loading传送到该标签下、 不受v-show影响-->
      <teleport to=".mode">
        <div class="teleport_loading">Loading..........</div>
      </teleport>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.teleport_loading {
  background-color: red;
  position: absolute;
  right: 10px;
  top: 60px;
}
</style>
