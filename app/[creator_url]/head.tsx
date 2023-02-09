import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

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

export default async function Head({
  params,
}: {
  params: { creator_url: string };
}) {
  const creator = await getCreator(params.creator_url);
  const title = creator ? `${creator.name} on Gameday` : "Gameday";

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
        content={`https://gameday.watch/creator/${creator.id}/signup`}
      />
      <meta
        property="og:image"
        content={
          creator?.metadata_image_url ?? "https://i.ibb.co/fSFHKFf/preview.png"
        }
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.png" />
    </>
  );
}
