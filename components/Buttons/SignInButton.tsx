"use client";
import { PrimaryButton } from "~/components/Buttons";
import { supabase } from "~/util/supabaseClient";

async function signInWithTwitter() {
  console.log("Signing in...");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
  });
}

export default function SignInButton() {
  return <PrimaryButton onClick={signInWithTwitter}>Sign In</PrimaryButton>;
}
