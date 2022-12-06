"use client";
import Card from "~/components/Card";
import supabase from "~/util/supabase-browser";
import User from "~/types/User";
import { useEffect, useState } from "react";
import setVote, { VOTE } from "~/lib/setVote";
import Contest from "~/types/Contest";
import Candidate from "~/types/Candidate";
import LeaderboardCandidate from "./LeaderboardCandidate";

const update = async (candidate: Candidate, userEmail: string, vote: VOTE) => {
  return await setVote(candidate, userEmail, vote);
};

export default function Leaderboard({
  user,
  contest,
  candidates,
}: {
  user: User | null;
  contest: Contest;
  candidates: Candidate[];
}) {
  const [_candidates, setCandidates] = useState(candidates);

  const vote = async (candidate: Candidate, vote: VOTE) => {
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
                    user.email,
                  ]
                : candidate.for.filter((email) => email !== user.email),
            against:
              vote === VOTE.AGAINST
                ? [
                    ...candidate.against.filter(
                      (email) => email !== user.email
                    ),
                    user.email,
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
          console.log(payload.new);
          if ((payload.new as Candidate).contest_id === contest.id) {
            setCandidates([
              ...candidates.filter(
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
  }, []);

  return (
    <Card className="my-8 bg-tan">
      <div className="px-4 py-5 border-b border-gray-300 sm:px-6">
        <div className="">
          <h2 className="text-primary-500">{contest.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{contest.description}</p>
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
          .map((candidate: Candidate) => (
            <li key={candidate.id}>
              <LeaderboardCandidate
                userEmail={user?.email ?? null}
                candidate={candidate}
                vote={(_vote) => vote(candidate, _vote)}
              />
            </li>
          ))}
      </ul>
    </Card>
  );
}
