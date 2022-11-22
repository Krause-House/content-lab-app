"use client";
import React from "react";
import axios from "axios";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "~/components/Buttons";
import addHost from "~/lib/addHost";
import getCurrentUserClientSide from "~/lib/getCurrentUserClientSide";

export default function HostButton() {
  return (
    <>
      <PrimaryButton onClick={addHost}>
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </PrimaryButton>
    </>
  );
}
