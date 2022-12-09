"use client";
import { useState } from "react";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabase-browser";

const signout = async () => {
  await supabase.auth.signOut();
};

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <PrimaryButton
      isLoading={loading}
      loadingText="Sign Out"
      onClick={async () => {
        setLoading(true);
        await signout();
      }}
    >
      Sign Out
    </PrimaryButton>
  );
}
