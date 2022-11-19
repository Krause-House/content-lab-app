"use client";
import React, { useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import SuggestionForm from "~/components/Hosts/SuggestionForm";
import { PrimaryButton } from "~/components/Buttons";

export default function HostButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton>
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </PrimaryButton>
      <SuggestionForm isOpen={open} setOpen={setOpen} />
    </>
  );
}
