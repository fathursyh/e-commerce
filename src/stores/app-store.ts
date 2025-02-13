import { atom, computed } from 'nanostores'
import type { CartType } from 'src/models/productType';

export const $search = atom<string>('');
export const $cart = atom<CartType[]>([]);
export const $totalCart = computed($cart, (arr)=>{
  return arr.length;
})

export const insertProduct = async(item : CartType) => {
  const index = $cart.get().findIndex(cart => cart.id == item.id);
  if(index === -1) {
    $cart.set([...$cart.get(), item]);
  } else {
    const newArray = $cart.get();
    newArray[index].quantity = item.quantity
    $cart.set(newArray)
  }
  await fetch('http://localhost:4321/api/getCartData.json', {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({cart: item})
  })
};