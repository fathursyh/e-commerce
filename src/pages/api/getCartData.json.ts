export const prerender = false;
import type { APIRoute } from "astro";
import type { CardType } from "src/stores/app-store";
const cart : CardType[] = [];
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      data: cart,
    })
  );
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const index = cart.findIndex(obj => obj.id === data.cart.id)
    if (index !== -1) {
      console.log(data.cart)
      cart[index].quantity = data.cart.quantity;
    } else {
      cart.push(data.cart)
    }
    console.log(cart);
    return new Response(
      JSON.stringify({
        data: "Cart updated.",
      }),
      { status: 200 }
    );
  }
  return new Response(null, { status: 400 });
};
