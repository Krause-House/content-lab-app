import HostData from "~/types/HostData";
import supabase from "~/util/supabaseClient";
import getCurrentUserClientSide from "./getCurrentUserClientSide";

export enum VOTE {
  FOR = "for",
  AGAINST = "against",
}

const voteFor = async (currentHost: HostData, voterId: string) => {
  if (currentHost.for.includes(voterId)) {
    throw new Error("User has already voted for this host");
  } else {
    const data = {
      ...currentHost,
      for: [...currentHost.for.filter((id) => id !== voterId), voterId],
      against: currentHost.against.filter((id) => id !== voterId),
    };
    const { error } = await supabase
      .from("hosts")
      .update(data)
      .eq("id", currentHost.id);
    return { data, error };
  }
};

const voteAgainst = async (currentHost: HostData, voterId: string) => {
  if (currentHost.against.includes(voterId)) {
    throw new Error("User has already voted against this host");
  } else {
    const data = {
      ...currentHost,
      for: currentHost.for.filter((id) => id !== voterId),
      against: [...currentHost.against.filter((id) => id !== voterId), voterId],
    };
    const { error } = await supabase
      .from("hosts")
      .update(data)
      .eq("id", currentHost.id);
    return { data, error };
  }
};

const setVote = async (currentHost: HostData, voterId: string, vote: VOTE) => {
  const user = await getCurrentUserClientSide();
  if (!user) {
    throw new Error("User is not logged in");
  }

  switch (vote) {
    case VOTE.FOR:
      return voteFor(currentHost, voterId);
    case VOTE.AGAINST:
      return voteAgainst(currentHost, voterId);
  }
};

export default setVote;
