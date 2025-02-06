export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "src/lib/database";

export const POST: APIRoute = async ({ request }) => {
  const {email, password} = await request.json();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response('Registered successfully.', { status: 200 });
};