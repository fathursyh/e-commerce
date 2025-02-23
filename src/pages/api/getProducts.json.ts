import type { APIRoute } from "astro";
import { db } from "src/lib/database";
export const GET: APIRoute = async() => {
  const { error } = await db.supabase
  .from('products')
  .update({ stock: 19 })
  .eq('id_product', "d98cacb8-a1e3-404f-8d98-4fb8bf404714");
  console.log(error);

  if(error) return new Response(JSON.stringify(error), {status: 500});

  return new Response('success', {status: 200});
};