export function localCurency(value : number) : string {
  const rupiah = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    trailingZeroDisplay: 'stripIfInteger'
  });
  return rupiah.format(value);
}


