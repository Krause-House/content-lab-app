"use client";
import { useState } from "react";
import { PrimaryButton } from "~/components/Buttons";
import Modal from "~/components/Modal";
import { AuthForm } from "~/components/Forms";

export default function SignInButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Sign In</PrimaryButton>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AuthForm />
      </Modal>
    </>
  );
}
