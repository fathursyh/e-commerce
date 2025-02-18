import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const options = {};
class DB {
  public supabase!: SupabaseClient;
  constructor() {
    fetch(import.meta.env.PUBLIC_URL + "/api/getDB.json")
      .then((d) => d.json())
      .then((d) => {
        this.supabase = createClient(d.string, d.api, options);
      });
  }
}

export const db = new DB();
