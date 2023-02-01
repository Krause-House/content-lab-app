import supabase from "~/util/supabase-browser";

export default async function endContest(contestId: number): Promise<void> {
  const { data, error } = await supabase
    .from("contests")
    .update({ is_active: false })
    .eq("id", contestId);
  if (error) {
    throw error ?? "Something went wrong";
  }
}
