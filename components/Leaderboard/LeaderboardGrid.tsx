"use client";
import React, { useEffect, useState } from "react";
import supabase from "~/util/supabase-browser";
import Candidate from "~/types/Candidate";
import Contest, { CONTEST_TYPE } from "~/types/Contest";
import User from "~/types/User";
import {
  ArchiveContestButton,
  EndContestButton,
  PrimaryButton,
} from "~/components/Buttons";
import { AuthForm } from "~/components/Forms";
import Modal from "~/components/Modal";
import setVote, { VOTE } from "~/lib/setVote";
import LeaderboardGridItem from "./LeaderboardGridItem";
import NewCandidateButton from "../Buttons/NewCandidateButton";
import addCandidates from "~/lib/addCandidates";

const update = async (
  candidate: Candidate,
  userEmail: string,
  vote: VOTE,
  votingPower?: number
) => {
  return await setVote(candidate, userEmail, vote, votingPower);
};

export default function LeaderboardGrid({
  contest,
  candidates,
  user,
  isCreator = false,
  votingPower = 1,
}: {
  contest: Contest;
  candidates: Candidate[];
  user: User | null;
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
    console.log("SUBSCRIBE TO CANDIDATE CHANGES", channel);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [_candidates, contest.id]);

  return (
    <>
      <div className="w-full my-4">
        <div className="py-5 md:flex md:items-center md:gap-2 md:justify-between">
          <div className="w-full">
            <h2 className="text-gray-800">{contest.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{contest.description}</p>
          </div>
          {contest.is_active && (
            <div className="flex items-end justify-end w-full gap-2 mt-3 md:mt-0">
              {!user?.id && (
                <PrimaryButton onClick={() => setShowAuthModal(true)}>
                  Vote
                </PrimaryButton>
              )}
              {user?.id && (contest.allow_submissions ?? false) && (
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
          )}
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {_candidates
            .sort(
              (candidate1, candidate2) =>
                candidate2.for.length -
                candidate2.against.length -
                (candidate1.for.length - candidate1.against.length)
            )
            .map((candidate: Candidate, index: number) => (
              <li key={candidate.id} className="">
                <LeaderboardGridItem
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
      </div>
      {!user?.id && (
        <Modal isOpen={showAuthModal} setIsOpen={setShowAuthModal}>
          <AuthForm />
        </Modal>
      )}
    </>
  );
}
