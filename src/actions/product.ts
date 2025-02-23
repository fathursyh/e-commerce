import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db } from "src/lib/database";

export const product = {
  getAllProduct: defineAction({
    handler: async (input) => {
      const limit = 15;
      const offset = (input.page - 1) * limit;
      const { data, error, count } = await db.supabase
        .from("products")
        .select("*", { count: "exact", head: false })
        .ilike("title", `%${input.query ?? ""}%`)
        .gt("stock", 0)
        .range(offset, offset + 14);
      if (error) {
        return [];
      }
      return [data, count];
    },
  }),
  featuredProduct: defineAction({
    handler: async (): Promise<object[]> => {
      const { data, error } = await db.supabase
        .from("products")
        .select()
        .eq("featured", true)
        .gt("stock", 0)
        .limit(3);
      if (error) {
        return [];
      }
      return data;
    },
  }),
  getProductDetail: defineAction({
    input: z.object({
      id_product: z.string(),
    }),
    handler: async (input) => {
      const { data, error } = await db.supabase
        .from("products")
        .select()
        .eq("id_product", input.id_product)
        .single();
      if (error) return null;
      return data;
    },
  }),
  checkProductsStock: defineAction({
    input: z.array(z.string()),
    handler: async (input) => {
      const { data } = await db.supabase
        .from("products")
        .select("id_product, stock")
        .in("id_product", input);
      if (data) return data;
    },
  }),
  checkOutProducts: defineAction({
    input: z.object({
      items: z.array(z.any()),
      total: z.number(),
    }),
    handler: (input, context) => {
      context.cookies.set("checkout", JSON.stringify(input.items), {
        path: "/checkout",
        secure: true,
        sameSite: "strict",
        maxAge: 300,
      });
      context.cookies.set("total", JSON.stringify(input.total), {
        path: "/checkout",
        secure: true,
        sameSite: "strict",
        maxAge: 300,
      });
      return true;
    },
  }),
  soldProducts: defineAction({
    handler: async () => {
      // todo: optimitistic locking
      // const {data} = db.supabase
      const lastUpdate = await db.supabase.from("characters").select('updated_at').single();
      console.log(lastUpdate);
    },
  }),
};
