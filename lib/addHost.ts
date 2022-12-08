import supabase from "~/util/supabase-browser";

const addHost = async () => {
  const user = await (await supabase.auth.getUser()).data.user;
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data, error } = await supabase.from("hosts").insert({
    user: user.id,
    displayName: user.user_metadata.full_name,
    discordName: user.user_metadata.name,
    avatarUrl: user.user_metadata.avatar_url,
  });

  return { data, error };
};

export default addHost;
