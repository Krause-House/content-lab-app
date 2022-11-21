"use client";
import React from "react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "~/components/Buttons";

const addHost = async () => {};

export default function HostButton() {
  return (
    <>
      <PrimaryButton>
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </PrimaryButton>
    </>
  );
}
