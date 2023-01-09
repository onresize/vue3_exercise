<template>
  <div>
    <h3>演示css选择器:slotted 和 :global用法</h3>
    <User>
      <div class="green">局部:slotted选择器</div>
    </User>
    <div class="red">全局:global选择器</div>
  </div>
</template>

<script setup>
import User from "./user.vue";
</script>
