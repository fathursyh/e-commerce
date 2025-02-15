import { actions } from 'astro:actions';
import { atom, computed } from 'nanostores'
import type { CartType } from 'src/models/productType';

export const $cart = atom<CartType[]>([]);
export const $totalCart = computed($cart, (arr)=>{
  return arr.length;
})

export const insertProduct = async(item : CartType) => {
  const {error} = await actions.cart.insertCart(item);
  if(error) console.log(error);
};