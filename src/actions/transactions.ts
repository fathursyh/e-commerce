
import { ActionError, defineAction } from "astro/actions/runtime/virtual/server.js";
import { db } from "src/lib/database"

export interface Transactions {
  id: string
  id_user: string,
  id_product: string,
  quantity: number
}
// const tes : trans
export const transactions = {
  // todo: create transactions (not finished)
  createTransaction: defineAction({
    handler: async (input : Transactions) => {
      const { error } = await db.supabase
        .from('transactions')
        .insert(input);
      if(error) throw new ActionError({
        message: error.message,
        code: "BAD_REQUEST",
      })
    }
  })
}