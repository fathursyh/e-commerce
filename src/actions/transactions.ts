
import { ActionError, defineAction } from "astro/actions/runtime/virtual/server.js";
import { db } from "src/lib/database"
import type { CartList } from "src/models/productType";

interface Transactions {
  id_user: string,
  id_product: string,
  quantity: number
}
// const tes : trans
export const transactions = {
  // todo: create transactions (not finished)
  createTransaction: defineAction({
    handler: async (input : CartList[], context) => {
      let products : Transactions[] = [];
      input.forEach((product) => {
        let form : Transactions = {
          id_user : context.locals.user_id!,
          id_product: product.id_product,
          quantity: product.quantity
        }
        products.push(form);
      });
      const { error } = await db.supabase
      .from('transactions')
      .insert(products);    
      if(error) throw new ActionError({
        message: error.message,
        code: "BAD_REQUEST",
      })
    }
  })
}