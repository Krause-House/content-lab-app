"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";
import archiveContest from "~/lib/archiveContest";

export default function ArchiveContestButton({
  contestId,
}: {
  contestId: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const archive = async () => {
    setLoading(true);
    await archiveContest(contestId);
    router.refresh();
  };

  return (
    <PrimaryButton
      onClick={archive}
      loadingText="Archiving..."
      isLoading={loading}
    >
      Archive Contest
    </PrimaryButton>
  );
}
