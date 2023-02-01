"use client";
import React, { useState } from "react";
import { NewCandidate } from "~/types/Candidate";
import Modal from "~/components/Modal";
import { CreateCandidateForm } from "~/components/Forms";
import PrimaryButton from "./PrimaryButton";

export default function NewCandidateButton({
  onComplete,
  style,
}: {
  onComplete: (candidate: NewCandidate) => void;
  style?: "user" | "creator";
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {style === "creator" ? (
        <div
          onClick={() => setModalOpen(true)}
          className="w-full px-4 py-4 font-bold text-center transition duration-200 border-4 border-dashed cursor-pointer rounded-xl text-primary/30 border-primary/10 hover:text-primary/50 hover:border-primary/50 ease sm:px-6"
        >
          New Option
        </div>
      ) : (
        <PrimaryButton onClick={() => setModalOpen(true)}>
          New Option
        </PrimaryButton>
      )}
      <Modal isOpen={modalOpen} setIsOpen={(isOpen) => setModalOpen(isOpen)}>
        <CreateCandidateForm
          onComplete={(candidate) => {
            setModalOpen(false);
            onComplete(candidate);
          }}
        />
      </Modal>
    </>
  );
}
