<script setup lang="ts">
/**
 * Vue 示例按钮组件
 * 用于测试在 Astro 文档站点中引用 Vue 组件
 */
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '点击我',
})
</script>

<template>
  <button class="vue-button">
    {{ text }}
  </button>
</template>

<style scoped>
.vue-button {
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  background-color: #42b883;
  border: none;
  border-radius: 4px;
}

.vue-button:hover {
  background-color: #33a06f;
}
</style>
