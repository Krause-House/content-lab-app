"use client";
import Card from "~/components/Card";
import supabase from "~/util/supabase-browser";
import User from "~/types/User";
import { useEffect, useState } from "react";
import setVote, { VOTE } from "~/lib/setVote";
import Contest, { CONTEST_TYPE } from "~/types/Contest";
import Candidate from "~/types/Candidate";
import LeaderboardListItem from "./LeaderboardListItem";
import {
  ArchiveContestButton,
  EndContestButton,
  PrimaryButton,
} from "~/components/Buttons";
import Modal from "~/components/Modal";
import { AuthForm } from "~/components/Forms";
import NewCandidateButton from "~/components/Buttons/NewCandidateButton";
import addCandidates from "~/lib/addCandidates";

const update = async (
  candidate: Candidate,
  userEmail: string,
  vote: VOTE,
  votingPower?: number
) => {
  return await setVote(candidate, userEmail, vote, votingPower);
};
export default function LeaderboardList({
  user,
  contest,
  candidates,
  isCreator = false,
  votingPower = 1,
}: {
  user: User | null;
  contest: Contest;
  candidates: Candidate[];
  isCreator?: boolean;
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
        await update(candidate, user?.email, vote, votingPower);
      } else throw new Error("User is not logged in");
    } catch (e) {
      console.error(e);
      setCandidates(originalCandidates);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel(`candidate-changes-${contest.id}`)
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
  }, [_candidates, contest.id]);

  return (
    <>
      <Card className="w-full my-4 bg-tan">
        <div className="px-4 py-5 border-b border-gray-300 md:flex md:items-center md:gap-2 md:justify-between sm:px-6">
          <div className="w-full">
            <h2 className="text-gray-800">{contest.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{contest.description}</p>
          </div>
          <div className="flex items-end justify-end w-full gap-2 mt-3 md:mt-0">
            {contest.is_active &&
              !user?.id &&
              contest.type === CONTEST_TYPE.POLL && (
                <PrimaryButton onClick={() => setShowAuthModal(true)}>
                  Vote
                </PrimaryButton>
              )}
            {contest.is_active &&
              user?.id &&
              (contest.allow_submissions ?? false) && (
                <NewCandidateButton
                  onComplete={(candidate) =>
                    addCandidates(contest.id, [candidate])
                  }
                />
              )}
            {isCreator &&
              (contest.is_active ? (
                <EndContestButton contestId={contest.id} />
              ) : (
                <ArchiveContestButton contestId={contest.id} />
              ))}
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-300">
          {_candidates
            .sort(
              (candidate1, candidate2) =>
                candidate2.for.length -
                candidate2.against.length -
                (candidate1.for.length - candidate1.against.length)
            )
            .map((candidate: Candidate, index: number) => (
              <li key={candidate.id}>
                <LeaderboardListItem
                  userEmail={user?.email ?? null}
                  canVote={!!user?.email && contest.is_active}
                  candidate={candidate}
                  vote={(_vote) => vote(candidate, _vote)}
                  badges={candidate.is_winner ? ["Winner"] : []}
                  hasVoting={contest.type !== CONTEST_TYPE.SUBMISSIONS}
                  className={
                    !candidate.is_winner &&
                    !contest.is_active &&
                    _candidates.some((c) => c.is_winner) // only set losers if there is a winner
                      ? "opacity-50"
                      : ""
                  }
                />
              </li>
            ))}
        </ul>
      </Card>
      {!user?.id && (
        <Modal isOpen={showAuthModal} setIsOpen={setShowAuthModal}>
          <AuthForm />
        </Modal>
      )}
    </>
  );
}
