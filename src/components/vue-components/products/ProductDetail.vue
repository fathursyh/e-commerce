<template>
  <section class="container mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500" :class="{'is-updated' : isUpdated, 'translate-y-0' : !isUpdated}">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Product Image"
          class="w-full h-auto object-cover"
        />
      </div>
      <!-- Product Details -->
      <div class="bg-base-200 rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-4">Product Name</h1>
        <p class="text-base-primary mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do

        </p>
        <p class="text-2xl font-bold text-accent mb-6">$49.99</p>
        <div class="flex items-center mb-6">
          <span class="text-gray-600 mr-4">Quantity:</span>
          <input
            v-model="item"
            type="number"
            min="1"
            class="w-20 px-3 py-2 border border-gray-300 rounded bg-base-200"
          />
        </div>
        <span @click="insertProduct({id: '3', quantity: item})">
          <slot />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useStore } from "@nanostores/vue";
  import { $cart, insertProduct } from "src/stores/app-store";
  import { ref, watch, type Ref } from "vue";
  const item: Ref<number> = ref(1);
  const isUpdated = ref(false);
  const cart = useStore($cart);

  watch(cart, () =>{
    isUpdated.value = true;
    setTimeout(() => {
      isUpdated.value = false;
    }, 400);
  })
</script>


<style scoped>
  .is-updated {
    position: inherit;
    transform: translateY(-50px);
    opacity: 0.4;
  }
</style>