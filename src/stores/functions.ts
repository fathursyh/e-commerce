export async function fetchCart() {
  const data = await fetch('http://localhost:4321/api/getCartData.json').then(data => data.json());
  return data.data;
}