"use client";
import React from "react";
import axios from "axios";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "~/components/Buttons";

const call = async () => {
  await axios.get("/api/host");
};

export default function HostButton() {
  return (
    <>
      <PrimaryButton onClick={call}>
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </PrimaryButton>
    </>
  );
}
