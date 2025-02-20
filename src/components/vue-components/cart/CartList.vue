<template>
    <section class="w-full mx-auto flex justify-center items-center flex-col pb-20 pt-10 min-h-[78vh] 2xl:min-h-[81.5vh] container">
        <table v-if="isLoaded && cartList?.length > 0" class="table-auto rounded shadow-md bg-base-200 w-screen px-4 md:px-0 md:w-1/2 2xl:w-1/3 mx-auto overflow-hidden">
            <thead>
                <tr class="bg-base-300 text-base-content">
                    <th class="py-2 px-4 text-left">Product</th>
                    <th class="py-2 px-4 text-left">QTY</th>
                    <th class="py-2 px-4 text-left">Total</th>
                    <th class="py-2 px-4 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in (cartList as ProductType[])" :key="item.id_product">
                    <td class="py-4 px-4 flex flex-col justify-center items-center gap-1">
                        <a :href="`/products/detail/${item.id_product}`">
                            <img :src=item.image alt="Product Image" class="rounded h-40 w-40 object-cover">
                        </a>
                        <span class="text-sm">{{ item.title }}</span>
                    </td>
                    <td class="py-4 px-4">
                        <input type="text" :value="cart[cart.findIndex(value => value.id_product === item.id_product)]?.quantity" class="border rounded w-12 text-center" disabled>
                    </td>
                    <td class="py-4 px-4">{{localCurency(cart[cart.findIndex(value => value.id_product ===
                        item.id_product)]?.quantity * item.price) }}</td>
                    <td class="py-4 px-4">
                        <button class="text-error hover:text-red-600 btn-ghost rounded mx-auto" @click="deleteItem(cart[cart.findIndex(value => value.id_product === item.id_product)]?.id, item.id_product)"><svg
                                class="w-6 h-6 text-error dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
        <span v-if="!isLoaded" class="loading loading-spinner loading-md"></span>
        <a v-if="cartList?.length === 0" href="/products" class="btn-link underline-offset-2">Add new product.</a>
        <div class="flex flex-row-reverse justify-between w-screen px-4 md:px-0 md:w-1/2 2xl:w-1/3">
            <div class="mt-6 flex flex-col md:flex-row md:gap-10 gap-2 items-center">
                <span class="font-bold">Total:</span>
                <span class="text-xl">{{ total }}</span>
            </div>

            <div class="mt-6">
                <button class="btn btn-primary text-white py-2 px-4 rounded" :class="{ 'btn-disabled': cartList?.length === 0 }" :disabled="cartList?.length === 0" @click="checkout">Proceed to
                    Checkout</button>
            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
    import { useStore } from '@nanostores/vue';
    import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
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

    const deleteItem = async (id: string, product: string) => {
        if (confirm('Remove this item?')) {
            await actions.cart.removeCart({ id: id })
            const i = cartList.value.findIndex((value: ProductType) => value.id_product === product);
            cartList.value.splice(i, 1);
        } else {
            return null;
        }
    }

    const checkout = async() => {
        const outStock : string[] = [];
        const {data} = await actions.product.checkProductsStock([cart.value[0]?.id_product, cart.value[1]?.id_product]);
        cart.value.forEach((item, index) => {
            if (data![index].stock <= item.quantity) {
                outStock.push(item.id_product);
                cartList.value = cartList.value.filter((item : ProductType)=>!outStock.includes(item.id_product));
                actions.cart.removeCart({id: item.id});
            }
        });
        if(outStock.length > 0) {
            alert('Out of stock item in the cart removed.');
            return;
        } else {
            const res = await actions.product.checkOutProducts(cartList.value);
            if(res) navigate('/checkout', {history: 'replace'});
        }
    };
</script>