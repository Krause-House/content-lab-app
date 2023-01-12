import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

export default async function fetchCreator(
  creatorId: string
): Promise<Creator> {
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
