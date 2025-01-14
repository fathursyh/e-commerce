<template>
  <h1 class="text-red-500">this is from Vue component {{ reactive }}</h1>
  <p>{{ fromAstro }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const reactive = ref('patur');

  defineProps({
    fromAstro: {type: String, required: false}
  })
</script>