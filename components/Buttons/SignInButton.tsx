"use client";
import { useState } from "react";
import { PrimaryButton } from "~/components/Buttons";
import AuthModal from "~/components/AuthModal";

export default function SignInButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Sign In</PrimaryButton>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
