export const prerender = false;
import { type APIRoute } from "astro";
import { supabase } from "src/lib/database";

export const POST: APIRoute = async ({ request }) => {
  const {email, password} = await request.json();
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.code, { status: error.status });
  }

  return new Response(JSON.stringify({
    session: data.session
  }), { status: 200 })
};