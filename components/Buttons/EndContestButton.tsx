"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import endContest from "~/lib/endContest";
import { useRouter } from "next/navigation";

export default function NewCandidateButton({
  contestId,
}: {
  contestId: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const end = async () => {
    setLoading(true);
    await endContest(contestId);
    router.refresh();
  };

  return (
    <PrimaryButton onClick={end} loadingText="Ending..." isLoading={loading}>
      End Contest
    </PrimaryButton>
  );
}
