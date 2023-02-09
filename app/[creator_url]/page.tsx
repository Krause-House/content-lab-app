import React from "react";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";
import { redirect } from "next/navigation";

async function getCreator(creatorUrl: string) {
  const supabase = createClient();
  const { data: creators } = await supabase
    .from("creators")
    .select()
    .eq("page_url", creatorUrl);
  if (!creators || creators.length === 0) {
    throw new Error("Creator not found");
  }
  return creators[0] as Creator;
}

export default async function CreatorLinkRedirect({
  params,
}: {
  params: { creator_url: string };
}) {
  const creator = await getCreator(params.creator_url);
  redirect(`/creator/${creator.id}`);

  return <></>;
}
