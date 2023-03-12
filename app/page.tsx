import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "~/components/Card";
import LeaderboardPreview from "~/components/Leaderboard/LeaderboardPreview";
import Candidate from "~/types/Candidate";
import Contest from "~/types/Contest";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";
import { redirect } from "next/navigation";

async function getCreators(): Promise<Creator[]> {
  const supabase = createClient();
  const { data: creators } = await supabase.from("creators").select();
  if (!creators) {
    throw new Error("Failed to fetch creators");
  }
  return creators;
}

const getCandidatesInContest = (contest: Contest, candidates: Candidate[]) => {
  // filter candidates by contest id
  return candidates.filter((c) => c.contest_id === contest.id);
};

const countVotes = (contest: Contest, candidates: Candidate[]) => {
  // get the candidates in the contest
  const candidatesInContest = getCandidatesInContest(contest, candidates);
  // get the total number of votes for the contest
  const totalVotes = candidatesInContest.reduce(
    (partialSum, c) => c.for.length + c.against.length + partialSum,
    0
  );
  return totalVotes;
};

const getTrendingContests = async (
  contests: Contest[],
  candidates: Candidate[]
) => {
  // get the top contests based on number of votes
  const topContests = contests
    .sort((a, b) => countVotes(b, candidates) - countVotes(a, candidates))
    .slice(0, 4);
  return topContests;
};

export default async function Home() {
  redirect("/dreamerz");
  return <></>;
}
