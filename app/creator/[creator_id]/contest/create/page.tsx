import React from "react";
import BannerImage from "~/components/BannerImage";
import PageHeader from "~/components/PageHeader";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";
import { redirect } from "next/navigation";
import CreateContestForm from "~/components/Forms/CreateContestForm";

async function getCreator(creatorId: string) {
  const supabase = createClient();
  const { data: creators } = await supabase
    .from("creators")
    .select()
    .eq("id", creatorId);
  if (!creators || creators.length === 0) {
    throw new Error("Creator not found");
  }
  return creators[0] as Creator;
}

export default async function CreatorEditProfile({
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
  ] = await Promise.all([
    supabase.auth.getUser(),
    getCreator(params.creator_id),
  ]);

  if (user?.email !== creator.creator_email) {
    redirect(`/creator/${creator.id}`);
  }

  return (
    <>
      {creator.banner_image_url && (
        <BannerImage imageUrl={creator.banner_image_url} />
      )}
      <main className="relative px-4 mx-auto lg:px-8 max-w-7xl">
        <h1 className="flex items-center justify-center gap-2 my-8 text-primary sm:truncate">
          New Contest in {creator.name}
        </h1>
        <CreateContestForm creator={creator} />
      </main>
    </>
  );
}
