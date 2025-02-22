<template>
  <label class="input input-bordered flex items-center gap-2">
    <input
      id="searchProduct"
      v-model="searchInput"
      type="text"
      class="grow"
      placeholder="Search product"
      list="products"
      autocomplete="off"
      @keypress.enter.prevent="handleSearch"
    />
    <datalist id="products">
      <option v-for="(item, i) in suggestion" :key="i" >{{ item }}</option>
    </datalist>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="h-4 w-4 opacity-70"
    >
      <path
        fill-rule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clip-rule="evenodd"
      />
    </svg>
  </label>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
  const props = defineProps({
    initial: { type: [String, null], required: false, default: null },
    suggestion : {type: Array, required: false, default: null}
  });
  const searchInput = ref("");
  onMounted(() => {
    if (props.initial) {
      searchInput.value = props.initial;
    }
  });

  const handleSearch = () => {
    const url = new URL(`${import.meta.env.PUBLIC_URL}/products`);
    url.searchParams.append("search", searchInput.value);
    window.location.assign(url);
  };
</script>
