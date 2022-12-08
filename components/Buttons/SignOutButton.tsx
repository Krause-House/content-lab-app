"use client";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabase-browser";

const signout = async () => {
  await supabase.auth.signOut();
};

export default function SignOutButton() {
  return <PrimaryButton onClick={signout}>Sign Out</PrimaryButton>;
}
