"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabaseClient";

async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {},
  });
}

export default function SignInButton() {
  const router = useRouter();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      const maxAge = 1 * 60 * 60; // 1 hour
      document.cookie = `gameday-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `gameday-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      router.push("/");
    }
  });

  return <PrimaryButton onClick={signInWithDiscord}>Sign In</PrimaryButton>;
}
