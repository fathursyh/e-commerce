import { defineAction } from "astro:actions";
import { supabase } from "src/lib/database";

export const product = {
    featuredProduct: defineAction({
        handler: async () : Promise<object[]> => {
            const { data, error } = await supabase
            .from('products').select().eq('featured', true);
            if(error) {return []}
            return data;
        }
    }),
}