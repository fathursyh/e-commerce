import type { APIContext, MiddlewareNext } from "astro";
import { sequence } from "astro:middleware";
import { supabase } from "src/lib/database";

  async function validation(context: APIContext, next: MiddlewareNext) {
    if (!context.url.pathname.startsWith("/api/")) {
      if (context.url.pathname !== "/login") {
        const accessToken = context.cookies.get("sb-access-token");
        const refreshToken = context.cookies.get("sb-refresh-token");

        if (!accessToken || !refreshToken) {
          context.locals.auth = false;
          context.locals.user_id = undefined;
          
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
            context.locals.user_id = session.data.user?.id;
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


  export const onRequest = sequence(validation);