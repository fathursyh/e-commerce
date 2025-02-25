import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { db } from "src/lib/database";

export const cart = {
  getCartList: defineAction({
    input: z.object({
      user: z.string(),
      id_product: z.array(z.string()),
    }),
    handler: async (input) => {
      const { data, error } = await db.supabase
  .from('carts')
  .select('id, id_product, quantity, products(title, price, image)').in('id_product', input.id_product).eq('id_user', input.user);
  if(data) return data;
  if(error) return error;
    },
  }),
  getCartData: defineAction({
    handler: async (input, context) => {
      console.log(input);
      const { data } = await db.supabase
        .from("carts")
        .select()
        .eq("id_user", context.locals.user_id).order('created_at');
      if (data) return data;
    },
  }),
  insertCart: defineAction({
    input: z
      .object({
        id_user: z.string().min(1),
        id_product: z.string().min(1),
        quantity: z.number().positive().min(1),
      })
      .required(),
    handler: async (input) => {
      const { data } = await db.supabase
        .from("carts")
        .select()
        .match({ id_user: input.id_user, id_product: input.id_product })
        .single();
      if (data) {
        const { error } = await db.supabase
          .from("carts")
          .update({ quantity: input.quantity })
          .eq("id_product", input.id_product);
        if (error) console.log(error);
      } else {
        const { error } = await db.supabase.from("carts").insert({
          id_user: input.id_user,
          id_product: input.id_product,
          quantity: input.quantity,
        });
        if (error) throw new ActionError({
          message: error.message, 
          code: "BAD_REQUEST"
        })
      }
    },
  }),
  removeCart: defineAction({
    input: z
      .object({
        id: z.string(),
      })
      .required(),
    handler: async (input) => {
      const response = await db.supabase
        .from("carts")
        .delete()
        .eq('id', input.id);
      return response;
    },
  }),
  removeBulkCart: defineAction({
    handler: async(input) => {
      const response = await db.supabase
        .from("carts")
        .delete()
        .in('id', input);
      return response;
    }
  }),
};
