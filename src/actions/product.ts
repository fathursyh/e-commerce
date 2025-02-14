import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { supabase } from "src/lib/database";

export const product = {
    getAllProduct: defineAction({
        handler: async(input) => {
            const limit = 15;
            const offset = (input.page - 1) * limit;
            const { data, error, count } = await supabase
            .from('products').select('*', {count: "exact", head: false}).ilike('title', `%${(input.query) ?? ''}%`).gt('stock', 0).range(offset, offset + 14);
            if(error) {return []}
            return [data, count];
        } 
    }),
    featuredProduct: defineAction({
        handler: async () : Promise<object[]> => {
            const { data, error } = await supabase
            .from('products').select().eq('featured', true).gt('stock', 0).limit(3);
            if(error) {return []}
            return data;
        }
    }),
    getProductDetail: defineAction({
        input: z.object({
            id_product: z.string()
        }),
        handler: async(input) => {
            const { data, error } = await supabase
            .from('products').select().eq('id_product', input.id_product).single();
            if (error) return null;
            return data;
        }
    })
}