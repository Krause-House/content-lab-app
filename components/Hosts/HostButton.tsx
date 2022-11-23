"use client";
import React from "react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "~/components/Buttons";
import addHost from "~/lib/addHost";
import { useRouter } from "next/navigation";

const act = async (refresh: () => void) => {
  await addHost();
  refresh();
};

export default function HostButton() {
  const router = useRouter();

  return (
    <>
      <PrimaryButton onClick={() => act(router.refresh)}>
        <MicrophoneIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Host
      </PrimaryButton>
    </>
  );
}
