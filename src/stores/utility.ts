export function localCurency(value : number) : string {
  const rupiah = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    trailingZeroDisplay: 'stripIfInteger'
  });
  return rupiah.format(value || 0);
}

export function debounce(func : () => void , wait = 700) {
  let timeout : NodeJS.Timeout;
  return function executedFunction(...args : []) {
      const later = () => {
          clearTimeout(timeout);
          func.apply(func,...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

