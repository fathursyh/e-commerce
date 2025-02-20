<template>
  <section class="container mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image -->
      <div class="h-full rounded-lg shadow-lg overflow-hidden transition-all duration-500" :class="{'translate-y-0' : !isUpdated, 'is-updated' : isUpdated}">
        <img
          :src=product.image
          alt="Product Image"
          class="w-full h-96 object-cover"
          :class="{'grayscale': product.stock === 0}"
        />
      </div>
      <!-- Product Details -->
      <div class="bg-base-200 rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
        <p class="text-base-primary mb-6">
            {{ product.description }}
        </p>
        <p class="text-2xl font-bold text-accent mb-6">{{ localCurency(product?.price) }}</p>
        <div class="flex items-center mb-6">
          <span class="text-gray-600 mr-4">Quantity:</span>
          <input
            v-model="item"
            type="number"
            min="1"
            :max=product.stock
            class="w-20 px-3 py-2 border border-gray-300 rounded bg-base-200"
          />
        </div>
        <button v-if="product.stock > 0" class="btn btn-primary w-full" @click="addCart">Add to cart</button>
        <button v-if="product.stock === 0" class="btn btn-disabled w-full">Out of stock</button>
          <span v-if="isSuccess">
            <slot />
          </span>  
        <p class="text-center mt-2">Stock : {{ product.stock }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useStore } from "@nanostores/vue";
  import { $cart, insertProduct } from "src/stores/app-store";
  import { ref, watch, type Ref } from "vue";
  import type { ProductType } from "src/models/productType";
  import { localCurency } from "src/stores/utility";

  const props = defineProps<{
    product : ProductType,
    id: string | undefined
  }>()

  const isSuccess = ref(false);
  const item: Ref<number> = ref(1);
  const isUpdated = ref(false);
  const cart = useStore($cart);

  const addCart = async() => {
    if(props.product.stock > 0) {
      if(props.id !== undefined) {
        insertProduct({id_user: props.id, id_product: props.product.id_product, quantity: item.value, id: '', created_at: new Date});
        sessionStorage.clear();
        isSuccess.value = true;
      } else {
        window.location.href = import.meta.env.PUBLIC_URL + '/login';
      }
    } 
  };

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