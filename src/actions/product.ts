import { ActionError, defineAction } from "astro:actions";
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
        .select("id_product, stock, title")
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
    input: z.object({
      updateItems: z.array(z.object({
        id_product: z.string(),
        stock: z.number(),
      }))
    }),
    handler: async (input) => {
      // console.log(input);
      // todo: optimitistic locking
      const lastUpdated = await db.supabase
        .from("products")
        .select("id_product, updated_at").in('id_product', input.updateItems.map(item=>item.id_product)).then(data => data.data);
      // console.log(lastUpdated);

      const { error } = await db.supabase
        .from("products")
        .upsert(input.updateItems)
        .in('created_at', lastUpdated!)
        if(error) return new ActionError({message: error.message, code: "CONFLICT", stack: error.stack});
    },
  }),
};
