import "server-only";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

// TODO: Add TS support (https://supabase.com/docs/reference/javascript/typescript-support)
export default () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });
