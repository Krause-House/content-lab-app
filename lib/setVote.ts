import Candidate from "~/types/Candidate";
import supabase from "~/util/supabase-browser";

export enum VOTE {
  FOR = "for",
  AGAINST = "against",
}

const voteFor = async (
  candidate: Candidate,
  voterEmail: string,
  votingPower = 1
) => {
  if (candidate.for.includes(voterEmail)) {
    throw new Error("User has already voted for this host");
  } else {
    const data = {
      ...candidate,
      for: [
        ...candidate.for.filter((email) => email !== voterEmail),
        ...Array(votingPower).fill(voterEmail), // add votes as many times as voting power,
      ],
      against: candidate.against.filter((email) => email !== voterEmail),
    };
    const { error } = await supabase
      .from("candidates")
      .update(data)
      .eq("id", candidate.id);
    return { data, error };
  }
};

const voteAgainst = async (
  candidate: Candidate,
  voterEmail: string,
  votingPower = 1
) => {
  if (candidate.against.includes(voterEmail)) {
    throw new Error("User has already voted against this host");
  } else {
    const data = {
      ...candidate,
      for: candidate.for.filter((email) => email !== voterEmail),
      against: [
        ...candidate.against.filter((email) => email !== voterEmail),
        ...Array(votingPower).fill(voterEmail), // add votes as many times as voting power,
      ],
    };
    const { error } = await supabase
      .from("candidates")
      .update(data)
      .eq("id", candidate.id);
    return { data, error };
  }
};

const setVote = async (
  candidate: Candidate,
  voterEmail: string,
  vote: VOTE,
  votingPower = 1
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }

  switch (vote) {
    case VOTE.FOR:
      return voteFor(candidate, voterEmail, votingPower);
    case VOTE.AGAINST:
      return voteAgainst(candidate, voterEmail, votingPower);
  }
};

export default setVote;
