<template>
    <section
        class="w-full mx-auto flex justify-center items-center flex-col pb-20 pt-10 min-h-[78vh] 2xl:min-h-[81.5vh] container">
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
                <tr v-for="(item) in (cartList as CartList[])" :key="item.id_product">
                    <td class="py-4 px-4 flex flex-col justify-center items-center gap-1">
                        <a :href="`/products/detail/${item.id_product}`">
                            <img :src=item.products.image alt="Product Image" class="rounded h-40 w-40 object-cover">
                        </a>
                        <span class="text-sm">{{ item.products.title }}</span>
                    </td>
                    <td class="py-4 px-4">
                        <input type="text" :value="item.quantity" class="border rounded w-12 text-center" disabled>
                    </td>
                    <td class="py-4 px-4">{{ localCurency(item.products.price * item.quantity) }}</td>
                    <td class="py-4 px-4">
                        <button class="text-error hover:text-red-600 btn-ghost rounded mx-auto" @click="deleteItem(item.id)">
                            <svg class="w-6 h-6 text-error dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
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
                <span class="text-xl">{{ localCurency(total) }}</span>
            </div>

            <div class="mt-6">
                <button class="btn btn-primary text-white py-2 px-4 rounded" :class="{ 'btn-disabled': cartList?.length === 0 }" :disabled="cartList?.length === 0" @click="checkout">
                    Proceed to Checkout
                </button>
            </div>
            <!-- <slot v-if="isRemoved" name="remove" />
                <slot v-if="isRemoved" name="stock" /> -->
        </div>
    </section>

</template>


<script setup lang="ts">
    import { useStore } from '@nanostores/vue';
    import { actions } from 'astro:actions';
    import type { CartList } from 'src/models/productType';
    import { $cart } from 'src/stores/app-store';
    import { localCurency } from 'src/stores/utility';
    import { onMounted, ref, computed } from 'vue';
    const props = defineProps<{
        email: string,
        id: string,
    }>()

    const isLoaded = ref(false);
    const isRemoved = ref(false);
    const cart = useStore($cart);
    const cartList = ref();
    const total = computed(() => {
        let sum = 0;
        if (cartList.value) {
            cartList.value.forEach((item: CartList) =>
                sum += item.products.price
            );
        }
        return sum;
    });
    onMounted(() => {
        setTimeout(async () => {
            cartList.value = (await actions.cart.getCartList({ id_product: cart.value.map(item => item.id_product), user: props.id! })).data;
            isLoaded.value = true;
        }, 500);

    });

    const deleteItem = async (id: string) => {
        if (confirm('Remove this item?')) {
            await actions.cart.removeCart({ id: id })
            cartList.value = cartList.value.filter((item: CartList) => item.id !== id)
            isRemoved.value = true;
            setTimeout(() => {
                isRemoved.value = false;
            }, 800);
        } else {
            return null;
        }
    }

    const checkout = async () => {
        let checked = false;
        const productList = await actions.product.checkProductsStock(cartList.value.map((item: CartList) => item.id_product)).then(res=>res.data);
        if (productList) {
            productList.forEach((item) => {
                if (item.stock === 0) {
                    alert(`${item.title} is out of stock! \nRemoved from cart.`);
                    const index = cartList.value.findIndex((prop: CartList) => prop.id_product === item.id_product);
                    cartList.value.splice(index, 1);
                }
            });
            cartList.value.forEach((item: CartList) => {
                if (productList![productList?.findIndex((product) => product.id_product === item.id_product)].stock - item.quantity < 0) {
                    alert('Changes in quantity on one or more items in the cart.');
                    item.quantity -= productList![productList?.findIndex((product) => product.id_product === item.id_product)].stock;
                    return;
                }
            });
            checked = true;
        }
        if (checked) {
            const res = await actions.product.checkOutProducts({ items: cartList.value, total: total.value });
            if (res) {
                // const { data } = await actions.payment.getToken({
                //     email: props.email,
                //     total: total.value,
                // })
                const {error} = await actions.product.soldProducts({updateItems: []});
                if(error) {
                    alert('Error in transaction, try again later.')
                } else {
                    // window.snap.pay(data, {
                    //     autoCloseDelay: 5,
                    //     onSuccess: async function () {
                    //         await actions.cart.removeBulkCart(cart.value.map((item) => item.id))
                    //         cartList.value = [];
                    //         alert("payment success!");
                    //     },
    
                    // });
                    alert('berhasil');
                }
            }
        }

    };
</script>