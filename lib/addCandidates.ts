import Candidate, { NewCandidate } from "~/types/Candidate";
import supabase from "~/util/supabase-browser";

export default async function addCandidates(
  contestId: number,
  candidates: NewCandidate[]
): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from("candidates")
    .insert(
      candidates.map((candidate) => ({ ...candidate, contest_id: contestId }))
    )
    .select();
  if (error || !data) {
    throw error ?? "Something went wrong";
  }
  return data;
}
