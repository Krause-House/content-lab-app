"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import supabase from "~/util/supabase-browser";
import { PrimaryButton } from "~/components/Buttons";
import Card from "~/components/Card";
import Input from "~/components/Input";
import axios from "axios";

async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

async function subscribe(
  email: string,
  creatorId: string,
  referredByEmail?: string
) {
  const { data, error } = await supabase.from("subscriptions").insert({
    user_email: email,
    creator_id: creatorId,
    referred_by_email: referredByEmail,
  });
  return { data, error };
}

async function signUp(
  email: string,
  password: string,
  creatorId?: string, // creator to subscribe to
  referredByEmail?: string // email that referred this user
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  try {
    if (process.env.NODE_ENV === "production") {
      // add to email list only in production
      await axios.post(`/api/welcome`, { email });
    }
    if (creatorId) {
      await subscribe(email, creatorId, referredByEmail);
    }
  } catch (e) {
    console.error(e);
  }
  if (!error) {
    await signInWithPassword(email, password);
  }
  return { data, error };
}

export default function AuthForm({
  onlyMode,
  creatorIdToSubscribeTo,
  referredByEmail,
}: {
  onlyMode?: "Sign In" | "Sign Up";
  creatorIdToSubscribeTo?: string;
  referredByEmail?: string;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"Sign In" | "Sign Up">(
    onlyMode ?? "Sign In"
  );
  const [loading, setLoading] = useState(false);

  const attemptSignInOrSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const { data, error } =
        mode === "Sign Up"
          ? await signUp(
              email,
              password,
              creatorIdToSubscribeTo,
              referredByEmail
            )
          : await signInWithPassword(email, password);
      // only turn off loading if there was an error, otherwise we wait till the page refreshes on recognized auth change
      if (error) {
        toast.error(error.message, { id: "auth-error" });
        setLoading(false);
      }
    }
  };
  return (
    <Card className="max-w-md p-6 overflow-hidden text-left align-middle transition-all transform w-72 sm:w-96 bg-tan">
      <h2>{mode}</h2>
      <form onSubmit={attemptSignInOrSignUp}>
        <div className="flex flex-col w-full gap-2 mt-4">
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <PrimaryButton
            isLoading={loading}
            className="w-full"
            type="submit"
            loadingText={mode === "Sign In" ? "Signing in..." : "Signing up..."}
          >
            <div className="w-full text-center">{mode}</div>
          </PrimaryButton>
        </div>
      </form>
      {!onlyMode && (
        <>
          {mode !== "Sign Up" ? (
            <div className="mt-6">
              New here?{" "}
              <u className="cursor-pointer" onClick={() => setMode("Sign Up")}>
                Sign up
              </u>
            </div>
          ) : (
            <div className="mt-6">
              Have an account?{" "}
              <u className="cursor-pointer" onClick={() => setMode("Sign In")}>
                Sign in
              </u>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
