"use client";
import Card from "~/components/Card";
import User from "~/types/User";
import React from "react";
import Contest, { CONTEST_TYPE } from "~/types/Contest";
import Candidate from "~/types/Candidate";
import LeaderboardListItem from "./LeaderboardListItem";
import { PrimaryButton } from "~/components/Buttons";
import Creator from "~/types/Creator";
import Link from "next/link";

export default function LeaderboardPreview({
  user,
  contest,
  candidates,
  creator,
}: {
  user: User | null;
  contest: Contest;
  candidates: Candidate[];
  creator: Creator;
}) {
  const leadingCandidates = candidates
    .sort(
      (candidate1, candidate2) =>
        candidate2.for.length -
        candidate2.against.length -
        (candidate1.for.length - candidate1.against.length)
    )
    .slice(0, 2);
  return (
    <>
      <Card className="w-full bg-tan">
        <div className="gap-2 px-4 py-5 border-b border-gray-300 md:flex md:items-center md:gap-4 md:justify-between sm:px-6">
          <div className="w-full">
            <h2 className="text-gray-100">
              {creator.name} - {contest.name}
            </h2>
            <p className="mt-1 text-sm text-gray-300">{contest.description}</p>
          </div>
          <div className="flex items-end justify-end gap-2 mt-3 md:mt-0">
            {contest.is_active &&
              !user?.id &&
              contest.type === CONTEST_TYPE.POLL && (
                <Link href={`/creator/${creator.id}`}>
                  <PrimaryButton>Vote</PrimaryButton>
                </Link>
              )}
            {contest.is_active &&
              user?.id &&
              (contest.allow_submissions ?? false) && (
                <Link href={`/creator/${creator.id}`}>
                  <PrimaryButton>Submit</PrimaryButton>
                </Link>
              )}
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-300">
          {leadingCandidates.map((candidate) => (
            <li key={candidate.id}>
              <LeaderboardListItem
                userEmail={user?.email ?? null}
                canVote={!!user?.email && contest.is_active}
                candidate={candidate}
                vote={(_vote) => {}}
                badges={candidate.is_winner ? ["Winner"] : []}
                hasVoting={contest.type !== CONTEST_TYPE.SUBMISSIONS}
              />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
