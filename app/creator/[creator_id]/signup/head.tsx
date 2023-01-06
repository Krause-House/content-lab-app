import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

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

export default async function Head({
  params,
}: {
  params: { creator_id: string };
}) {
  const creator = await getCreator(params.creator_id);
  const title = creator
    ? `Sign Up for ${creator.name} on Gameday`
    : "Sign Up for Gameday";

  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          creator.bio ??
          "Join the world's greatest basketball community on Gameday."
        }
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          creator.bio ??
          "Join the world's greatest basketball community on Gameday."
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@WatchGameday" />
      <meta name="twitter:creator" content="@gregfromstl" />
      <meta
        property="og:url"
        content={`https://gameday.watch/creator/${params.creator_id}/signup`}
      />
      <meta
        property="og:image"
        content={
          creator?.sign_up_image_url ?? "https://i.ibb.co/fSFHKFf/preview.png"
        }
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.png" />
    </>
  );
}
