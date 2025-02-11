import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { supabase } from "src/lib/database";

export const onRequest = defineMiddleware(
  async (context: APIContext, next: MiddlewareNext) => {
    if (!context.url.pathname.startsWith("/api/")) {
      
      if (context.url.pathname !== "/login") {
        const accessToken = context.cookies.get("sb-access-token");
        const refreshToken = context.cookies.get("sb-refresh-token");

        if (!accessToken || !refreshToken) {
          context.locals.auth = false;
          if(context.url.pathname === '/profile') {
            return context.redirect('/login');
          }
          return next();
        }

        try {
          const session = await supabase.auth.setSession({
            refresh_token: refreshToken?.value,
            access_token: accessToken?.value,
          });

          if (session.data) {
            context.locals.auth = true;
          }
          if (session.error) {
            context.cookies.delete("sb-access-token", {
              path: "/",
            });
            context.cookies.delete("sb-refresh-token", {
              path: "/",
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          context.cookies.delete("sb-access-token", {
            path: "/",
          });
          context.cookies.delete("sb-refresh-token", {
            path: "/",
          });
        }
      }
    }

    return next();
  }
);
