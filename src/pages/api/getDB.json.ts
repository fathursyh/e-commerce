import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      string: import.meta.env.DB_STRING,
      api: import.meta.env.DB_API,
    })
  );
};