export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "src/lib/database";

export const POST: APIRoute = async ({ request, cookies }) => {
  const {email, password} = await request.json();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  return new Response('Logged in successfully.', { status: 200 })
};