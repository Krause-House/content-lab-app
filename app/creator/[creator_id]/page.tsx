import React from "react";
import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
import Leaderboard from "~/components/Leaderboard";
import PageHeader from "~/components/PageHeader";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

async function getCreator(creatorId: string) {
  const supabase = createClient();
  const { data: creators } = await supabase
    .from("creators")
    .select()
    .eq("id", creatorId);
  console.log(creatorId, creators);
  if (!creators || creators.length === 0) {
    throw new Error("Creator not found");
  }
  return creators[0] as Creator;
}

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
    getCreator(params.creator_id),
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
        <ActionBanner text="Sign in to build this week's YNG Dreamerz x NBA watch party!" />
      )}
      {creator.banner_image_url && (
        <div className="hidden sm:block">
          <BannerImage imageUrl={creator.banner_image_url} />
        </div>
      )}
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader title={creator.name} description={creator.bio} />
        <div className="flex flex-col">
          {contests
            ?.sort((a, b) => a.id - b.id)
            .map((contest, idx) => (
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
        </div>
      </main>
    </>
  );
}
