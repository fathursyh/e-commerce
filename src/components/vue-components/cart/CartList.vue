<template>
    <section class="w-screen grid place-items-center pb-20 pt-10 2xl:min-h-[81.5vh]">
        <table v-if="isLoaded && cartList?.length > 0" class="rounded shadow-md bg-base-200 xl:w-1/3 mx-auto overflow-hidden">
            <thead>
                <tr class="bg-base-300 text-base-content">
                    <th class="py-2 px-4 text-left">Product</th>
                    <th class="py-2 px-4 text-left">Price</th>
                    <th class="py-2 px-4 text-left">Quantity</th>
                    <th class="py-2 px-4 text-left">Total</th>
                    <th class="py-2 px-4 text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in cartList as Array<ProductType>" :key="item.id_product">
                    <td class="py-4 px-4 flex flex-col justify-center items-center gap-1">
                        <a :href="`/products/detail/${item.id_product}`">
                            <img :src=item.image alt="Product Image" class="rounded h-40 object-cover">
                        </a>
                        <span class="text-sm">{{ item.title }}</span>
                    </td>
                    <td class="py-4 px-4">{{ localCurency(item.price) }}</td>
                    <td class="py-4 px-4">
                        <input type="text" :value="cart[cart.findIndex(value=>value.id_product === item.id_product)]?.quantity" class="border rounded w-16 text-center" disabled>
                    </td>
                    <td class="py-4 px-4">{{ localCurency(cart[cart.findIndex(value=>value.id_product === item.id_product)]?.quantity * item.price) }}</td>
                    <td class="py-4 px-4">
                        <button class="text-error hover:text-red-600 btn-ghost rounded" @click="deleteItem(cart[cart.findIndex(value=>value.id_product === item.id_product)]?.id, item.id_product)">Remove</button>
                    </td>
                </tr>
    
            </tbody>
        </table>
        <span v-if="!isLoaded" class="loading loading-spinner loading-md"></span>
        <a v-if="cartList?.length === 0" href="/products"  class="btn-link underline-offset-2">Add new product.</a>
       <div class="flex flex-row-reverse justify-between xl:w-1/3">
        <div class="mt-6 flex gap-10 items-center">
            <span class="font-bold">Total:</span>
            <span class="text-xl">{{ total }}</span>
        </div>
    
        <div class="mt-6">
            <button class="btn btn-primary text-white py-2 px-4 rounded" :class="{'btn-disabled' : cartList?.length === 0}" :disabled="cartList?.length === 0">Proceed to Checkout</button>
        </div>
       </div>
    </section>

</template>

<script setup lang="ts">
    import { useStore } from '@nanostores/vue';
    import { actions } from 'astro:actions';
    import type { ProductType } from 'src/models/productType';
    import { $cart } from 'src/stores/app-store';
    import { localCurency } from 'src/stores/utility';
    import { onMounted, ref, computed } from 'vue';

    const isLoaded = ref(false);
    const cart = useStore($cart);
    const cartList = ref();
    const total = computed(() => {
        let sum = 0;
        if (cart.value && cartList.value) {
            cart.value?.forEach(value => {
                const item: ProductType = cartList.value.find((item: ProductType) => item.id_product === value.id_product);
                sum += item?.price * value.quantity;
            });
        }
        return localCurency(sum);
    });
    onMounted(async () => {
        setTimeout(async () => {
            cartList.value = (await actions.cart.getCartList({ id_product: cart.value.map(item => item.id_product) })).data;
            isLoaded.value = true;
        }, 400);

    });

    const deleteItem = async (id: string, product : string) => {
        if(confirm('Remove this item?')) {
            await actions.cart.removeCart({ id: id })
            const i = cartList.value.findIndex((value:ProductType)=>value.id_product === product);
            cartList.value.splice(i, 1);
        } else {
            return null;
        }
    }
</script>