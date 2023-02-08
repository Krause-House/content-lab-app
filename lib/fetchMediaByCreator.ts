import Media from "~/types/Media";
import createClient from "~/util/supabase-server";

export default async function fetchMediaByCreator(
  creatorId: string
): Promise<Media[]> {
  const supabase = createClient();
  const { data: media } = await supabase
    .from("media")
    .select()
    .eq("creator", creatorId);
  if (!media) {
    throw new Error("Failed to fetch media");
  }
  return media as Media[];
}
