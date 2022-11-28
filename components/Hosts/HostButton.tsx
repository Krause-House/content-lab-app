"use client";
import React, { useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "~/components/Buttons";
import addHost from "~/lib/addHost";
import { useRouter } from "next/navigation";

const act = async (refresh: () => void) => {
  await addHost();
  refresh();
};

export default function HostButton() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const host = async () => {
    setIsLoading(true);
    await act(router.refresh);
    setIsLoading(false);
  };

  return (
    <>
      <PrimaryButton onClick={() => !isLoading && host()} disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="-ml-0.5 mr-2 w-4 h-4 ease-linear border-[3px] border-t- border-transparent rounded-full loader"></div>
            Loading
          </>
        ) : (
          <>
            <MicrophoneIcon
              className="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Host
          </>
        )}
      </PrimaryButton>
    </>
  );
}
