"use client";
import React, { useState } from "react";
import Modal from "~/components/Modal";
import PrimaryButton from "./PrimaryButton";
import AppleIdForm from "../Forms/AppleIdForm";

export default function SubmitAppleIdButton({
  userEmail,
}: {
  userEmail: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setModalOpen(true)}>
        Submit Review
      </PrimaryButton>
      <Modal isOpen={modalOpen} setIsOpen={(isOpen) => setModalOpen(isOpen)}>
        <AppleIdForm
          userEmail={userEmail}
          onComplete={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
