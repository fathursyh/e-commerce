/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "src/lib/database";

/**
 * @type {import("astro").MiddlewareHandler}
 */

export async function onRequest (context : any, next : any) {
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
    
    if (!accessToken || !refreshToken) {
      return context.redirect("/signin");
    }
    
    let session;
    try {
      session = await supabase.auth.setSession({
        refresh_token: refreshToken?.value,
        access_token: accessToken?.value,
      });
      if (session.error) {
        context.cookies.delete("sb-access-token", {
          path: "/",
        });
        context.cookies.delete("sb-refresh-token", {
          path: "/",
        });
        return context.redirect("/signin");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      context.cookies.delete("sb-access-token", {
        path: "/",
      });
      context.cookies.delete("sb-refresh-token", {
        path: "/",
      });
      return context.redirect("/signin");
    }
 
    return next();
};