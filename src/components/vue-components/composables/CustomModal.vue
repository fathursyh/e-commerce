<template>
 <div @click="modal.showModal()">
     <slot name="button" />
 </div>
<dialog ref="modal" class="modal" >
  <div class="modal-box rounded">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
        <slot name="content" />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

    const modal = ref();

</script>