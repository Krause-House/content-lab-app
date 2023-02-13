import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "~/components/Card";
import LeaderboardPreview from "~/components/Leaderboard/LeaderboardPreview";
import Candidate from "~/types/Candidate";
import Contest from "~/types/Contest";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

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
  const supabase = createClient();
  const [
    {
      data: { user },
    },
    creators,
    { data: contests },
    { data: candidates },
  ] = await Promise.all([
    supabase.auth.getUser(),
    getCreators(),
    supabase.from("contests").select().eq("is_active", true),
    supabase.from("candidates").select(),
  ]);

  const trendingContests =
    contests && candidates
      ? await getTrendingContests(contests, candidates)
      : [];

  return (
    <main className="relative px-4 mx-auto max-w-7xl">
      <div className="py-12">
        <div className="w-full pb-4">
          <h1 className="text-gray-800">Featured Creators</h1>
          <p className="mt-1 text-sm text-gray-500">
            The best basketball creators on Gameday
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
          {creators
            .filter((c) => c.is_visible)
            .map((creator) => (
              <Link
                href={
                  (creator.page_url?.length ?? 0) > 0
                    ? creator.page_url!
                    : `/creator/${creator.id}`
                }
                key={creator.id}
              >
                <Card className="w-[345px] h-[445px] bg-primary relative card-shadow-hover overflow-hidden cursor-pointer transition-shadow">
                  {creator.homepage_image_url && (
                    <Image
                      className="object-cover w-full h-full"
                      src={creator.homepage_image_url}
                      alt=""
                      fill
                    />
                  )}
                  <div
                    className={`absolute w-full h-full bg-primary-500 ${
                      creator.homepage_image_url && "opacity-40"
                    }`}
                  />
                  <div className="absolute flex flex-col justify-between w-full h-full p-6">
                    <h1 className="text-white mega">{creator.name}</h1>
                    <p className="text-center text-white accent">Vote Now</p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
      <div className="py-12">
        <div className="w-full pb-4">
          <h1 className="text-gray-800">Trending Now</h1>
          <p className="mt-1 text-sm text-gray-500">
            The latest polls and contests across the Gameday ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 my-4 lg:grid-cols-2">
          {candidates &&
            trendingContests.map(
              (contest) =>
                creators.find((c) => c.id === contest.created_by) &&
                candidates.filter((c) => c.contest_id === contest.id).length >
                  0 && (
                  <LeaderboardPreview
                    user={user}
                    creator={creators.find((c) => c.id === contest.created_by)!}
                    contest={contest}
                    candidates={candidates.filter(
                      (c) => c.contest_id === contest.id
                    )}
                  />
                )
            )}
        </div>
      </div>
    </main>
  );
}
