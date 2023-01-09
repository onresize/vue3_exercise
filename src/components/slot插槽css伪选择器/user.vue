<template>
  <div>
    <slot/>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped>
:slotted(.green) {
  color: green;
}
:global(.red) {
  color: red;
}
</style>
