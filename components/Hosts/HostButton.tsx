"use client";
import React, { useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import SuggestionForm from "~/components/Hosts/SuggestionForm";

export default function HostButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-200 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
      >
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </button>
      <SuggestionForm isOpen={open} setOpen={setOpen} />
    </>
  );
}
