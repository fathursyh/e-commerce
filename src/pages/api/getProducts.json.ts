import type { APIRoute } from "astro";
import { db } from "src/lib/database";
export const GET: APIRoute = async() => {
  const { data, error } = await db.supabase
  .from('carts')
  .select('id_product, quantity, products(title, price)');
  if(error) return new Response(JSON.stringify(error), {status: 500});

  return new Response(JSON.stringify(data), {status: 200});
};