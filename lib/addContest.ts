import Contest from "~/types/Contest";
import supabase from "~/util/supabase-browser";

export default async function addContest(
  contest: Omit<Contest, "id">
): Promise<Contest> {
  const { data, error } = await supabase
    .from("contests")
    .insert(contest)
    .select();
  if (error || !data) {
    throw error ?? "Something went wrong";
  }
  return data[0];
}
