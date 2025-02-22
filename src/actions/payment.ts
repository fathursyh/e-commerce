import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { snap } from "src/lib/midtrans";

export const payment = {
  getToken: defineAction({
    input: z.object({
        total: z.number().min(10000),
        // items: z.array(z.any()),
        email: z.string().email(),
    }),
    handler: async (input) => {
      const parameter = {
        transaction_details: {
          order_id: `F-shop-orderId-${Math.floor(Math.random() * 400) + 1}`,
          gross_amount: input.total,
        },
        customer_details: {
          first_name: input.email,
          email: input.email,
        },
      };
      const token = snap.createTransaction(parameter).then((transaction: { token: string; }) => {
        // transaction token
        return transaction.token;
    });
      return token;
    },
  }),
};
