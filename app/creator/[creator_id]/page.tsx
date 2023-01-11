import Link from "next/link";
import React from "react";
import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
import { PrimaryButton } from "~/components/Buttons";
import Leaderboard from "~/components/Leaderboard";
import PageHeader from "~/components/PageHeader";
import ReferralCard from "~/components/ReferralCard";
import fetchCreator from "~/lib/fetchCreator";
import Contest from "~/types/Contest";
import createClient from "~/util/supabase-server";

export default async function CreatorProfile({
  params,
}: {
  params: { creator_id: string };
}) {
  const supabase = createClient();

  // fetch user + data that does not require authentication
  const [
    {
      data: { user },
    },
    creator,
    { data: contests },
    { data: candidates },
  ] = await Promise.all([
    supabase.auth.getUser(),
    fetchCreator(params.creator_id),
    supabase
      .from("contests")
      .select()
      .eq("created_by", params.creator_id)
      .eq("is_visible", true),
    supabase.from("candidates").select(),
  ]);

  return (
    <>
      {!user?.email && (
        <ActionBanner
          text={`Sign in to vote on ${creator.name}'${
            creator.name.slice(-1) !== "s" ? "s" : ""
          } page.`}
        />
      )}
      {creator.banner_image_url && (
        <BannerImage imageUrl={creator.banner_image_url} />
      )}
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader
          title={creator.name}
          description={creator.bio}
          editLink={
            user?.email === creator.creator_email
              ? `/creator/${creator.id}/edit`
              : undefined
          }
        />
        {user?.email &&
          contests
            ?.filter((c) => c.type === "referrals" && c.is_active)
            .map((contest: Contest, idx) => (
              <ReferralCard
                key={idx}
                title={contest.name}
                creatorIdToSubscribeTo={creator.id}
                referredByEmail={user?.email}
                redirectTo={`/creator/${creator.id}`}
                description={contest.description}
              />
            ))}
        {/* POLLS */}
        <div className="flex flex-col">
          {contests
            ?.filter((c) => c.type === "poll")
            .sort((a, b) => a.id - b.id)
            .map((contest: Contest, idx) => (
              <Leaderboard
                key={idx}
                user={user}
                candidates={
                  candidates?.filter(
                    (candidate) => candidate.contest_id === contest.id
                  ) ?? []
                }
                contest={contest}
              />
            ))}
          {!contests ||
            (contests.length === 0 && (
              <h3 className="flex flex-col items-center justify-center w-full h-full min-h-[300px] opacity-20">
                No contests yet
              </h3>
            ))}
          {user?.email === creator.creator_email && (
            <Link
              href={`/creator/${creator.id}/contest/create`}
              className="w-32 ml-auto"
            >
              <PrimaryButton>New contest</PrimaryButton>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
