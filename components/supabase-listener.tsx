"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "~/util/supabase-browser";

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  useEffect(() => {
    const router = useRouter();
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken]);

  return null;
}
