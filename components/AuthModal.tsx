"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useState, Fragment, useCallback } from "react";
import Card from "~/components/Card";
import supabase from "~/util/supabase-browser";
import { PrimaryButton } from "~/components/Buttons";
import Input from "~/components/Input";
import toast from "react-hot-toast";

async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {},
  });
}

async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (!error) {
    await signInWithPassword(email, password);
  }
  return { data, error };
}

export default function AuthModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"Sign In" | "Sign Up">("Sign In");
  const [loading, setLoading] = useState(false);

  const attemptSignInOrSignUp = async (e: React.FormEvent) => {
    console.log("called");
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const { data, error } =
        mode === "Sign Up"
          ? await signUp(email, password)
          : await signInWithPassword(email, password);
      // only turn off loading if there was an error, otherwise we wait till the page refreshes on recognized auth change
      if (error) {
        toast.error(error.message, { id: "auth-error" });
        setLoading(false);
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>
                <Card className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-tan">
                  <Dialog.Title as="h2">{mode}</Dialog.Title>
                  <form onSubmit={attemptSignInOrSignUp}>
                    <div className="flex flex-col gap-2 mt-4 w-96">
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
                        loadingText={
                          mode === "Sign In" ? "Signing in..." : "Signing up..."
                        }
                      >
                        <div className="w-full text-center">{mode}</div>
                      </PrimaryButton>
                    </div>
                  </form>
                  {mode !== "Sign Up" ? (
                    <div className="mt-6">
                      New here?{" "}
                      <u
                        className="cursor-pointer"
                        onClick={() => setMode("Sign Up")}
                      >
                        Sign up
                      </u>
                    </div>
                  ) : (
                    <div className="mt-6">
                      Have an account?{" "}
                      <u
                        className="cursor-pointer"
                        onClick={() => setMode("Sign In")}
                      >
                        Sign in
                      </u>
                    </div>
                  )}
                </Card>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
