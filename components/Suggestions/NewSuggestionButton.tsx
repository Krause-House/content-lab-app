"use client";
import React, { useState } from "react";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import SuggestionForm from "~/components/Suggestions/SuggestionForm";

export default function NewSuggestionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center p-1 text-sm font-medium text-white border border-transparent rounded-full shadow-sm bg-primary-200 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
      >
        <PlusSmallIcon className="w-auto h-8" />
      </button>
      <SuggestionForm isOpen={open} setOpen={setOpen} />
    </>
  );
}
