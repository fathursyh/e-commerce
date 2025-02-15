import { z } from "astro/zod";
import { defineAction, type ActionAPIContext } from "astro:actions";
import { supabase } from "src/lib/database";

export const cart = {
  getCartData: defineAction({
    handler: async (context : ActionAPIContext) => {
      const { data } = await supabase.from("carts").select().eq('id_user', context.locals.user_id);
      console.log(data);
      if(data) return data;
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
      const { data } = await supabase
        .from("carts")
        .select()
        .match({ id_user: input.id_user, id_product: input.id_product })
        .single();
      if (data) {
        const { error } = await supabase
          .from("carts")
          .update({ quantity: input.quantity })
          .eq("id_product", input.id_product);
        if (error) console.log(error);
      } else {
        const { error } = await supabase.from("carts").insert({
          id_user: input.id_user,
          id_product: input.id_product,
          quantity: input.quantity,
        });
        if (error) console.log(error);
      }
    },
  }),
  removeCart: defineAction({
    input: z
      .object({
        id: z.array(z.string().min(1)),
      })
      .required(),
    handler: async (input) => {
      const response = await supabase
        .from("countries")
        .delete()
        .in("id", input.id);
      return response;
    },
  }),
};
