import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { supabase } from "src/lib/database";

export const product = {
    getAllProduct: defineAction({
        handler: async() => {
            const { data, error } = await supabase
            .from('products').select();
            if(error) {return []}
            return data;
        } 
    }),
    featuredProduct: defineAction({
        handler: async () : Promise<object[]> => {
            const { data, error } = await supabase
            .from('products').select().eq('featured', true);
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
            .from('products').select().eq('id_product', input.id_product);
            if (error) return null;
            return data[0];
        }
    })
}