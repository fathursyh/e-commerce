import { atom } from 'nanostores'

export const $counter = atom<number>(0)
export const $cart = atom<number>(0);

export function localCurency(value : number) : string {
    const rupiah = new Intl.NumberFormat('id', {
      style: 'currency',
      currency: 'IDR',
      trailingZeroDisplay: 'stripIfInteger'
    });
    return rupiah.format(value);
  }