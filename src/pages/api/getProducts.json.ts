import type { APIRoute } from "astro";
import { db } from "src/lib/database";
export const GET: APIRoute = async() => {
  const { error } = await db.supabase
  .from('products')
  .update({ stock: 1 })
  .eq('title', "Spaghetti");
  console.log(error);

  if(error) return new Response(JSON.stringify(error), {status: 500});

  return new Response('success', {status: 200});
};