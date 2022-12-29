"use client";
import Card from "~/components/Card";
import supabase from "~/util/supabase-browser";
import User from "~/types/User";
import { useEffect, useState } from "react";
import setVote, { VOTE } from "~/lib/setVote";
import Contest from "~/types/Contest";
import Candidate from "~/types/Candidate";
import LeaderboardCandidate from "./LeaderboardCandidate";
import { PrimaryButton } from "~/components/Buttons";
import AuthModal from "~/components/AuthModal";
import Tooltip from "~/components/Tooltip";

const update = async (candidate: Candidate, userEmail: string, vote: VOTE) => {
  return await setVote(candidate, userEmail, vote);
};

export default function Leaderboard({
  user,
  contest,
  candidates,
  votingPower = 1,
}: {
  user: User | null;
  contest: Contest;
  candidates: Candidate[];
  votingPower?: number;
}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [_candidates, setCandidates] = useState(candidates);

  const vote = async (candidate: Candidate, vote: VOTE) => {
    if (!contest.is_active) return;
    let originalCandidates = _candidates;
    try {
      if (user?.email) {
        setCandidates([
          ..._candidates.filter((c) => c.id !== candidate.id),
          {
            ...candidate,
            for:
              vote === VOTE.FOR
                ? [
                    ...candidate.for.filter((email) => email !== user.email),
                    ...Array(votingPower).fill(user.email), // add votes as many times as voting power
                  ]
                : candidate.for.filter((email) => email !== user.email),
            against:
              vote === VOTE.AGAINST
                ? [
                    ...candidate.against.filter(
                      (email) => email !== user.email
                    ),
                    ...Array(votingPower).fill(user.email), // add votes as many times as voting power
                  ]
                : candidate.against.filter((email) => email !== user.email),
          },
        ]);
        await update(candidate, user?.email, vote);
      } else throw new Error("User is not logged in");
    } catch (e) {
      console.error(e);
      setCandidates(originalCandidates);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("candidate-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "candidates" },
        (payload) => {
          if ((payload.new as Candidate).contest_id === contest.id) {
            setCandidates([
              ..._candidates.filter(
                (candidate) => candidate.id !== (payload.new as Candidate).id
              ),
              payload.new as Candidate,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [_candidates]);

  return (
    <>
      <Card className="w-full my-4 bg-tan">
        <div className="px-4 py-5 border-b border-gray-300 md:flex md:items-center md:gap-2 md:justify-between sm:px-6">
          <div className="w-full">
            <h2 className="text-gray-800">{contest.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{contest.description}</p>
          </div>
          {contest.is_active && (
            <div className="flex items-end justify-end w-full mt-3 md:mt-0">
              {!user?.id ? (
                <PrimaryButton onClick={() => setShowAuthModal(true)}>
                  Vote
                </PrimaryButton>
              ) : (
                <></>
                // <Tooltip text="This is your voting power for this category. Use the share button each week to increase your voting power.">
                //   <PrimaryButton className="flex items-center justify-center w-48 gap-2">
                //     <div className="flex items-end text-xs font-normal accent">
                //       Voting Power:
                //     </div>
                //     {votingPower}
                //   </PrimaryButton>
                // </Tooltip>
              )}
            </div>
          )}
        </div>
        <ul role="list" className="divide-y divide-gray-300">
          {_candidates
            .sort(
              (candidate1, candidate2) =>
                candidate2.for.length -
                candidate2.against.length -
                (candidate1.for.length - candidate1.against.length)
            )
            .map((candidate: Candidate) => (
              <li key={candidate.id}>
                <LeaderboardCandidate
                  userEmail={user?.email ?? null}
                  canVote={!!user?.email && contest.is_active}
                  candidate={candidate}
                  vote={(_vote) => vote(candidate, _vote)}
                />
              </li>
            ))}
        </ul>
      </Card>
      {!user?.id && (
        <AuthModal isOpen={showAuthModal} setIsOpen={setShowAuthModal} />
      )}
    </>
  );
}
