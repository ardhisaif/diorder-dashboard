import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = "https://sewwxvvscpmvinihyrcq.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  (() => {
    throw new Error(
      "SUPABASE_ANON_KEY is not defined in the environment variables"
    );
  })();
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
